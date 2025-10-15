# ISSUES_TRACKER.md

## Seguimiento de Issues del Proyecto

Este documento permite marcar el progreso de las tareas técnicas del proyecto.
Marca con `[x]` las tareas completadas.

---

### [X] ISSUE-001 - Configurar entorno de desarrollo Node.js
**Rol:** Backend
**Descripción:** Crear repositorio git, enlazar con github. Inicializar el proyecto node con package.json, instalar dependencias (express, db-local, dotenv) y configurar scripts básicos.

---

### [X] ISSUE-002 - Configurar estructura del proyecto backend
**Rol:** Backend
**Descripción:** Crear las carpetas base: /src, /src/routes, /src/controllers, /src/services, /src/db. Añadir configuración inicial de Express. Inicializar servidor y crear rama develop

---

### [ ] ISSUE-003 - Implementar base de datos local con db-local
**Rol:** Backend
**Descripción:** Configurar db-local, definir colecciones 'tasks' con sus campos iniciales y funciones CRUD básicas (get, add, update, delete).

---

### [ ] ISSUE-004 - Endpoint GET /tasks
**Rol:** Backend
**Descripción:** Implementar ruta para obtener todas las tareas desde db-local con filtrado opcional por estado (completed).

---

### [ ] ISSUE-005 - Endpoint GET /tasks/:id
**Rol:** Backend
**Descripción:** Implementar ruta para obtener una tarea específica mediante su taskId.

---

### [ ] ISSUE-006 - Endpoint POST /tasks
**Rol:** Backend
**Descripción:** Implementar creación de tarea validando campos requeridos y generando taskId único (UUID).

---

### [ ] ISSUE-007 - Endpoint PUT /tasks/:id
**Rol:** Backend
**Descripción:** Implementar actualización parcial de tarea (título, descripción, completado) y persistir cambios en db-local.

---

### [ ] ISSUE-008 - Endpoint DELETE /tasks/:id
**Rol:** Backend
**Descripción:** Implementar eliminación de tarea por ID y actualizar almacenamiento local.

---

### [ ] ISSUE-009 - Endpoint POST /tasks/:id/toggle-complete
**Rol:** Backend
**Descripción:** Implementar acción de marcado/desmarcado de tareas como completadas, con persistencia del cambio.

---

### [ ] ISSUE-010 - Diseñar interfaz de usuario (UI) inicial
**Rol:** Diseño
**Descripción:** Diseñar la estructura base del frontend en HTML y CSS: lista de tareas, formulario de creación, botones de acción.

---

### [ ] ISSUE-011 - Implementar lógica de frontend en Vanilla JS
**Rol:** Frontend
**Descripción:** Conectar el frontend con la API REST. Implementar funciones para listar, crear, editar y eliminar tareas mediante fetch().

---

### [ ] ISSUE-012 - Implementar marcado/desmarcado de tareas en UI
**Rol:** Frontend
**Descripción:** Añadir control visual (checkbox o botón) para cambiar el estado de completado en el cliente y sincronizar con la API.

---

### [ ] ISSUE-013 - Validar formularios de creación y edición de tareas
**Rol:** Frontend
**Descripción:** Añadir validaciones en el frontend (campos obligatorios, longitud máxima) y mostrar mensajes de error o confirmación.

---

### [ ] ISSUE-014 - Pruebas unitarias de servicios de tareas
**Rol:** QA
**Descripción:** Crear tests unitarios para las funciones de servicio (createTask, updateTask, deleteTask, getTasks) usando Jest o similar.

---

### [ ] ISSUE-015 - Pruebas de integración de API REST
**Rol:** QA
**Descripción:** Probar endpoints del backend mediante herramientas como Postman o supertest, validando códigos de estado y datos devueltos.

---

### [ ] ISSUE-016 - Configurar servidor Express para despliegue local
**Rol:** DevOps
**Descripción:** Configurar variables de entorno (.env), puerto, middlewares de logging y manejo de errores global.

---

### [ ] ISSUE-017 - Configurar .gitignore y control de versiones
**Rol:** DevOps
**Descripción:** Añadir archivo .gitignore con node_modules, .env, logs, y data local. Crear rama principal para desarrollo.

---

### [ ] ISSUE-018 - Prototipo de cronometraje de tareas (futuro)
**Rol:** Backend
**Descripción:** Diseñar e implementar prototipo de endpoints start/stop de sesiones de tarea y persistencia de duración acumulada.

---

### [ ] ISSUE-019 - Diseño UI de cronómetro (futuro)
**Rol:** Diseño
**Descripción:** Diseñar el componente visual del cronómetro de tareas con botones de inicio y fin, actualizando el tiempo en pantalla.

---

### [ ] ISSUE-020 - Autenticación y perfiles de usuario (futuro)
**Rol:** Backend
**Descripción:** Implementar registro, login y protección de endpoints mediante JWT o sesiones. Añadir esquema users a db-local.

---
