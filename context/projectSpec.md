# ProjectSpec — Gestor de Tareas (MVP y roadmap)

**Resumen**
Documento que especifica la arquitectura técnica, pila tecnológica, esquema inicial de la base de datos y la API necesaria para cubrir las Historias de Usuario priorizadas. Diferencia entre MVP (implementación inicial) y funcionalidades futuras.

---

## 1. Pila tecnológica (recomendación)

* **Frontend:** HTML5 + CSS3 (puro) + Vanilla JavaScript (ES2020+). Enfoque modular (ES Modules). No frameworks.
* **Backend:** Node.js (LTS) + Express.js.
* **Base de datos local:** `db-local` (librería indicada para persistencia local en archivos/almacenamiento embebido). Diseñada para uso en MVP local/offline y fácil migración a DB remota.
* **Gestión de dependencias:** npm.
* **Herramientas de desarrollo:** ESLint, Prettier, nodemon (desarrollo), dotenv (variables de entorno locales).
* **Control de procesos (despliegue/producción):** PM2 (opcional para producción local) o contenedor ligero si se requiere.

**Motivación:** mínimo coste y complejidad; stack sencillo que facilita pruebas y migración futura.

---

## 2. Visión de arquitectura

* **Cliente (SPA ligera):** Single-page app en Vanilla JS que consume una API REST desde el backend. Estado mínimo en memoria + persistencia mediante API.
* **Servidor (API REST):** Express expone endpoints JSON para operaciones CRUD y futuras funcionalidades (auth, roles, sesiones de cronometraje).
* **Persistencia:** `db-local` gestiona ficheros JSON o storage local. Estructura relacional lógica dentro de `db-local` (colecciones/tablas simuladas).

**Capas:**

1. Rutas/Controladores (Express)
2. Servicios/Dominio (lógica de negocio: tasks, timers, users)
3. Repositorio (adaptador db-local)
4. Frontend (UI, state, temporal caching)

---

## 3. Alcance MVP vs Futuro

**MVP (prioridad alta)**

* Crear, editar, eliminar tareas.
* Marcar/desmarcar tarea como completada.
* Persistencia con `db-local` (único dueño de datos, almacenamiento local del servidor).
* API REST para todas las operaciones anteriores.

**Futuro (iteraciones siguientes)**

* Registro/login y perfil de usuarios.
* Cronometrado (start/stop) por tarea y sesión de trabajo (persistir sesiones hasta cierre/finalización de tarea).
* Roles y asignación de tareas (administrador asigna a usuarios).
* Migración o opción de usar BD remota.

---

## 4. Esquema inicial de la Base de Datos (tablas/colecciones)

Diseño pensado para `db-local` (colecciones JSON). Las llaves primarias son UUID (`taskId`, `userId`, `sessionId`).

**Colecciones (MVP)**

* `tasks`

  * `taskId` (string, PK)
  * `title` (string, required)
  * `description` (string, optional)
  * `completed` (boolean, default false)
  * `createdAt` (ISO timestamp)
  * `updatedAt` (ISO timestamp)
  * `ownerId` (string, optional - para futuro soporte multiusuario)
  * `timeAccumulated` (number, segundos) — inicia en 0; usado en futuras iteraciones

**Colecciones (Futuro)**

* `users`

  * `userId` (string, PK)
  * `email` (string, unique)
  * `passwordHash` (string) — almacenar sólo hash
  * `displayName` (string)
  * `role` (string, enum: ['user','admin'])
  * `createdAt`, `updatedAt`

* `sessions` (cronometraje por tarea — múltiples por tarea)

  * `sessionId` (string, PK)
  * `taskId` (string, FK -> tasks.taskId)
  * `userId` (string, FK -> users.userId)
  * `startedAt` (ISO timestamp)
  * `stoppedAt` (ISO timestamp, nullable)
  * `duration` (number, segundos) — calculado al detener
  * `status` (string enum: ['running','stopped','cancelled'])

* `assignments` (si se requiere histórico de asignaciones)

  * `assignmentId` (string, PK)
  * `taskId` (string, FK)
  * `assignedBy` (userId)
  * `assignedTo` (userId)
  * `assignedAt` (timestamp)

### Diagrama Entidad-Relación (ASCII)

```
+--------+      +---------+      +---------+
| users  |1 --- *| tasks   |1 --- *| sessions|
+--------+      +---------+      +---------+
  userId          taskId           sessionId
```

Relaciones clave:

* Un `user` puede tener muchas `tasks` (ownerId).
* Una `task` puede tener muchas `sessions` (cronometraje por sesiones de trabajo).
* En asignaciones futuras, una `task` puede ser asignada por un `admin` a otro `user`.

---

## 5. Especificación de Endpoints API (REST)

Se propone REST por simplicidad y compatibilidad con Vanilla JS. A continuación endpoints MVP + extensiones futuras. Todos usan JSON.

### Prefijo base

`/api/v1` (versionado desde inicio)

### Endpoints MVP (prioridad inmediata)

#### 1) Obtener lista de tareas

* **GET** `/api/v1/tasks`
* **Query params opcionales:** `?completed=true|false` , `?ownerId=<id>` (futuro)
* **Respuesta 200**: `[{ taskId, title, description, completed, createdAt, updatedAt, timeAccumulated }]`

#### 2) Obtener tarea por id

* **GET** `/api/v1/tasks/:taskId`
* **Respuesta 200**: `{ taskId, title, description, completed, createdAt, updatedAt, timeAccumulated }`
* **404** si no existe

#### 3) Crear tarea

* **POST** `/api/v1/tasks`
* **Body (JSON)**: `{ title: string (required), description?: string }`
* **Respuesta 201**: `{ taskId, ... }`
* **Validaciones:** `title` obligatorio; título máximo configurable (ej. 255 chars)

#### 4) Actualizar tarea

* **PUT** `/api/v1/tasks/:taskId`
* **Body (JSON)**: `{ title?: string, description?: string, completed?: boolean }`
* **Respuesta 200**: tarea actualizada
* **404** si no existe

#### 5) Eliminar tarea

* **DELETE** `/api/v1/tasks/:taskId`
* **Respuesta 204**: sin contenido

#### 6) Toggle completar (shortcut)

* **POST** `/api/v1/tasks/:taskId/toggle-complete`
* **Respuesta 200**: tarea con estado actualizado

### Endpoints de Cronometraje (Futuro inmediato)

#### 7) Iniciar sesión de tarea (start)

* **POST** `/api/v1/tasks/:taskId/sessions/start`
* **Body**: `{ userId?: string }` (userId obligatorio cuando haya usuarios)
* **Respuesta 201**: `{ sessionId, startedAt, status: 'running' }`
* **Regla:** No permitir múltiples sesiones en `running` para la misma `taskId` y `userId` (o permitir según regla de negocio)

#### 8) Detener sesión (stop)

* **POST** `/api/v1/tasks/:taskId/sessions/:sessionId/stop`
* **Body**: `{}`
* **Acción:** calcula `duration = stoppedAt - startedAt`, guarda `stoppedAt`, actualiza `status = 'stopped'`, suma `duration` a `tasks.timeAccumulated`.
* **Respuesta 200**: sesión actualizada con `duration`.

#### 9) Obtener sesiones de una tarea

* **GET** `/api/v1/tasks/:taskId/sessions`
* **Respuesta 200**: lista de sesiones con `startedAt`, `stoppedAt`, `duration`, `userId`.

### Endpoints de Usuario y Roles (Futuro)

#### 10) Registro

* **POST** `/api/v1/auth/register` — `{ email, password, displayName? }` -> 201

#### 11) Login

* **POST** `/api/v1/auth/login` — `{ email, password }` -> 200 + token/session

#### 12) Obtener/Modificar perfil

* **GET** `/api/v1/users/:userId`
* **PUT** `/api/v1/users/:userId`

#### 13) Asignar tarea (admin)

* **POST** `/api/v1/tasks/:taskId/assign` — `{ assignedTo: userId }` (autorización admin requerida)
* **Respuesta 200**: task con `ownerId` actualizado y registro de `assignments`.

---

## 6. Consideraciones de diseño y decisiones clave

* **Autenticación:** MVP no requiere auth; cuando se añada, usar JWT con refresh tokens o sesiones en servidor según necesidades. Passwords siempre con hashing (bcrypt).
* **Consistencia y atomicidad:** Operaciones que afectan `task.timeAccumulated` y `sessions` deben ser atómicas a nivel de servicio para evitar inconsistencia.
* **Migración futura:** Repositorio debe estar desacoplado del `db-local` (adapter pattern) para poder cambiar a Mongo/Postgres sin tocar lógica de negocio.
* **Optimización de coste:** Mantener todo en un único servidor Node.js para MVP; evitar infra costosa hasta que la demanda lo justifique.
* **Respaldos:** Plan simple de copias periódicas de los ficheros de `db-local`.

---

## 7. Requisitos no funcionales (resumen aplicable a la arquitectura)

* **Rendimiento:** Lista inicial de tareas debe responder < 2s con dataset razonable (<= 1000 tasks) en hardware de desarrollo.
* **Confiabilidad:** Guardado de tareas debe tolerar cierres inesperados (write flush / atomic file write).
* **Seguridad:** En futuras iteraciones, cifrado de credenciales, protección de endpoints sensibles mediante autorización y validación del input.
* **Usabilidad:** UI mínima, acciones con máximo 2 clics para CRUD básicos.

---

## 8. Siguientes pasos recomendados (tareas técnicas)

1. Inicializar repo (package.json) y configurar `.gitignore` (node_modules, .env, data files).
2. Implementar adapter básico `db-local` con interfaces `getTasks()`, `getTask(id)`, `createTask()`, `updateTask()`, `deleteTask()`.
3. Crear rutas Express para endpoints MVP y pruebas con Postman/curl.
4. Implementar SPA básica en Vanilla JS consumiendo la API.
5. Añadir tests unitarios/integ. básicos para servicios de tasks.

