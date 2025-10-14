# API_SPEC.md

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### **GET /tasks**

Obtiene todas las tareas.

* **Query Params:** `completed` (boolean, opcional)
* **Respuesta 200:** Lista de tareas.

### **GET /tasks/:id**

Obtiene una tarea específica por ID.

* **Respuesta 200:** Objeto tarea.
* **Respuesta 404:** Tarea no encontrada.

### **POST /tasks**

Crea una nueva tarea.

* **Body JSON:** `{ "title": string, "description": string }`
* **Respuesta 201:** Objeto tarea creada.

### **PUT /tasks/:id**

Actualiza parcialmente una tarea.

* **Body JSON:** `{ "title?": string, "description?": string, "completed?": boolean }`
* **Respuesta 200:** Objeto tarea actualizada.

### **DELETE /tasks/:id**

Elimina una tarea existente.

* **Respuesta 204:** Sin contenido.

### **POST /tasks/:id/toggle-complete**

Cambia el estado de completado.

* **Respuesta 200:** Objeto tarea actualizada.

### **Futuros Endpoints (no MVP)**

* `POST /tasks/:id/start` → Inicia el cronometraje.
* `POST /tasks/:id/stop` → Detiene y registra la sesión.
* `POST /auth/register` → Crea usuario.
* `POST /auth/login` → Autenticación.