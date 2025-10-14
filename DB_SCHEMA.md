# DB_SCHEMA.md

## Colección: `tasks`

| Campo             |              Tipo | Descripción                                          |
| ----------------- | ----------------: | ---------------------------------------------------- |
| `taskId`          |     string (UUID) | PK: identificador único de la tarea                  |
| `title`           |            string | Título de la tarea (requerido)                       |
| `description`     |     string | null | Descripción opcional                                 |
| `completed`       |           boolean | Estado de finalización (default: false)              |
| `timeAccumulated` | number (segundos) | Suma total de duración de sesiones asociadas         |
| `createdAt`       |      string (ISO) | Fecha de creación                                    |
| `updatedAt`       |      string (ISO) | Fecha de última modificación                         |
| `ownerId`         |     string | null | FK opcional a `users.userId` (propietario principal) |

Índices recomendados (db-local según soporte): taskId, ownerId, completed


## Colección futura: `users`

| Campo          |          Tipo | Descripción                        |
| -------------- | ------------: | ---------------------------------- |
| `userId`       | string (UUID) | PK: identificador único de usuario |
| `email`        |        string | Correo (único)                     |
| `passwordHash` |        string | Hash de contraseña                 |
| `displayName`  |        string | Nombre para mostrar                |
| `role`         |        string | Enum: `user` | `admin`             |
| `createdAt`    |  string (ISO) | Fecha de registro                  |
| `updatedAt`    |  string (ISO) | Fecha de última actualización      |

Índices: userId, email


## Colección/tabla intermedia: user_tasks (relaciones / asignaciones)
Representa la relación entre usuarios y tareas. Permite N:M y mantener histórico de asignaciones si se desea.

| Campo        |                 Tipo | Descripción                                         |
| ------------ | -------------------: | --------------------------------------------------- |
| `userTaskId` |        string (UUID) | PK                                                  |
| `taskId`     |        string (UUID) | FK -> `tasks.taskId`                                |
| `userId`     |        string (UUID) | FK -> `users.userId` (usuario asignado)             |
| `assignedBy` | string (UUID) | null | FK -> `users.userId` (quien asignó)                 |
| `assignedAt` |         string (ISO) | Timestamp de asignación                             |
| `role`       |        string | null | Rol dentro de la tarea (opcional)                   |
| `active`     |              boolean | Indica asignación activa (true) o histórica (false) |

Notas:
Para un modelo simple, ownerId en tasks puede usarse como asignación única; user_tasks permite múltiples asignaciones y histórico.
active=false conserva histórico sin borrar registros.


## Colección: sessions (cronometraje / task_sessions)
Registra cada sesión de trabajo iniciada sobre una tarea por un usuario.

| Campo       |                     Tipo | Descripción                                    |
| ----------- | -----------------------: | ---------------------------------------------- |
| `sessionId` |            string (UUID) | PK                                             |
| `taskId`    |            string (UUID) | FK -> `tasks.taskId`                           |
| `userId`    |            string (UUID) | FK -> `users.userId` (quien ejecuta la sesión) |
| `startedAt` |             string (ISO) | Inicio de la sesión                            |
| `stoppedAt` |      string (ISO) | null | Fin de la sesión (null si está en curso)       |
| `duration`  | number (segundos) | null | Duración calculada (filled al detener)         |
| `status`    |                   string | Enum: `running` | `stopped` | `cancelled`      |
| `notes`     |            string | null | Observaciones opcionales de la sesión          |
| `createdAt` |             string (ISO) | Fecha de creación del registro                 |


## Relaciones Clave

| Relación                 | Tipo       | Descripción                                                |
| ------------------------ | ---------- | ---------------------------------------------------------- |
| `users (1:N) user_tasks` | Asociación | Un usuario puede estar vinculado a muchas tareas.          |
| `tasks (1:N) user_tasks` | Asociación | Una tarea puede tener múltiples usuarios asignados.        |
| `users (1:N) sessions`   | Asociación | Un usuario puede registrar múltiples sesiones.             |
| `tasks (1:N) sessions`   | Asociación | Una tarea puede tener varias sesiones de tiempo asociadas. |



