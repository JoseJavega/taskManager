# API_SPEC.md

## Base URL

```
http://localhost:3000/api
```

## Formato general

Requests y respuestas JSON.
Fechas en ISO 8601.
Códigos de respuesta principales:
200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 409 Conflict, 500 Internal Server Error.

## Endpoints de Tareas (tasks)
GET /tasks

Obtiene todas las tareas.

Query params (opcionales):

completed=true|false

ownerId=<userId>

assignedTo=<userId> (filtra tareas asignadas a un usuario — requiere backend que consulte user_tasks)

200

[
  {
    "taskId":"uuid",
    "title":"...",
    "description":"...",
    "completed":false,
    "timeAccumulated":1200,
    "ownerId":"uuid|null",
    "createdAt":"2025-10-14T10:00:00Z",
    "updatedAt":"2025-10-14T10:05:00Z"
  }
]

GET /tasks/:taskId

200: objeto tarea (ver ejemplo arriba)

404: { "error": "Task not found" }

POST /tasks

Crea una tarea nueva.

Body

{
  "title":"Título obligatorio",
  "description":"Opcional",
  "ownerId":"uuid|null"    // opcional
}


Responses

201 Created con objeto creado.

400 Bad Request si falta title o formato inválido.

PUT /tasks/:taskId

Actualización parcial (full-replace es aceptable también).

Body (ejemplo)

{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "completed": true
}


200: tarea actualizada

404 si no existe

DELETE /tasks/:taskId

204: eliminado correctamente

404 si no existe

POST /tasks/:taskId/toggle-complete

Conmutador rápido de completado.

200: tarea con completed actualizado.

Endpoints de Asignaciones / Relación Usuario–Tarea

Nota: Si se decide no tener user_tasks, algunos endpoints simplifican a ownerId en tasks. Aquí se contempla user_tasks para flexibilidad.

GET /tasks/:taskId/assignments

Devuelve lista de user_tasks para la tarea.

200

[
  {
    "userTaskId":"uuid",
    "taskId":"uuid",
    "userId":"uuid",
    "assignedBy":"uuid|null",
    "assignedAt":"2025-10-14T11:00:00Z",
    "active": true
  }
]

POST /tasks/:taskId/assign

Asignar tarea a un usuario (requiere autorización en futuro).

Body

{ "assignedTo": "userId", "assignedBy": "userIdOptional" }


200: devuelve registro user_tasks creado o 409 Conflict si ya existe una asignación activa duplicada (según reglas).

Actualización adicional: si se quiere que tasks.ownerId refleje la asignación principal, actualizar tasks.ownerId.

POST /tasks/:taskId/unassign

Desactivar asignación (marcar active=false) o eliminar user_tasks.

Body

{ "userId": "uuid" }


200: confirmación.

GET /users/:userId/tasks

Lista de tareas asignadas o propiedad del usuario.

Query params: active=true|false

200: array de tareas.

Endpoints de Sesiones (cronometraje)
POST /tasks/:taskId/sessions/start

Inicia una sesión de cronometraje sobre taskId.

Body

{ "userId": "uuid" } // obligatorio cuando hay usuarios


Validaciones/Reglas:

Evitar crear múltiples sesiones running para el mismo (taskId, userId) si la regla de negocio lo prohíbe.

201

{
  "sessionId":"uuid",
  "taskId":"uuid",
  "userId":"uuid",
  "startedAt":"2025-10-14T12:00:00Z",
  "status":"running"
}

POST /tasks/:taskId/sessions/:sessionId/stop

Detiene la sesión, calcula duración y actualiza tasks.timeAccumulated.

Action:

set stoppedAt = now

duration = stoppedAt - startedAt

status = 'stopped'

tasks.timeAccumulated += duration (operación atómica)

200

{
  "sessionId":"uuid",
  "taskId":"uuid",
  "userId":"uuid",
  "startedAt":"2025-10-14T12:00:00Z",
  "stoppedAt":"2025-10-14T12:25:00Z",
  "duration":1500,
  "status":"stopped"
}


400 si ya estaba detenida o sessionId inválido.

404 si taskId o sessionId no existen.

POST /tasks/:taskId/sessions/:sessionId/cancel

Anula sesión en curso (status=cancelled), no suma duración.

GET /tasks/:taskId/sessions

Lista de sesiones para una tarea.

Query params: userId (opcional), status (optional)

200: array de sesiones (ver ejemplo arriba)

GET /users/:userId/sessions

Obtiene historial de sesiones por usuario (útil para reportes).

Endpoints de Usuarios (resumen futuro)

POST /auth/register

POST /auth/login

GET /users/:userId

PUT /users/:userId

Autenticación / autorización: en fases futuras usar JWT o sesiones y añadir control de permisos sobre endpoints de asignación y manipulación de sesiones.

Ejemplo de flujo atómico (start → stop)

POST /tasks/:taskId/sessions/start → crea sesión running.

Usuario trabaja.

POST /tasks/:taskId/sessions/:sessionId/stop → backend calcula duration, actualiza sesión y suma tasks.timeAccumulated.

Se recomienda ejecutar ambas operaciones relacionadas a actualización de tasks.timeAccumulated en una transacción lógica dentro del servicio para evitar condiciones de carrera (si db-local no soporta transacciones, implementar locking a nivel de aplicación).

Consideraciones de validación y errores

Validar que taskId, userId y sessionId existan antes de operar.

Rechazar start si la tarea está marcada como completed (según regla de negocio) o permitirlo según decisión.

Manejar concurrencia en POST /stop para evitar sumar duración doble.