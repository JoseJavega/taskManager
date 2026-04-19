# 📖 API Reference - Task Management

Esta documentación detalla los contratos de comunicación, modelos de datos y estados de respuesta de la API.

- **Base URL:** http://localhost:3000/api
- **Content-Type:** application/json

## 📋 Reglas de Negocio y estándares técnicos

- **Identificadores únicos (UUID):** Uso estricto de UUID v4 generado mediante `node:crypto` para todas las entidades.
- **Formato de Fechas:** Todos los timestamps se manejan en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).
- **Validaciones de entrada:** Se utiliza la librería ZOD para validar los datos inyectados, ignorando aquellos camnpos que no consten en el esquema.
- **Sanitización:** Los String se limpian de espacios en blanco al inicio y al final ( trim ).

### Gestión de Tareas

- **Ciclo de Vida:**
  - `createdAt`: Se asigna automáticamente al crear la tarea.
  - `updatedAt`: Se actualiza en cada operación de edición.
  - `finishedAt`: Se gestiona automáticamente. Se genera cuando `completed` pasa a `true` y se elimina si la tarea se marca como pendiente nuevamente.
- **Categorización:** Si no se especifica una categoría, el sistema asigna la etiqueta por defecto `uncategorized`.

### Gestión de Categorías

- **Integridad Referencial:** La eliminación de categorías reasigna automáticamente las tareas vinculadas a la categoría "uncategorized" (se asigna como texto en categoryId).
- **Validación:** Se requiere un nombre único y válido para la creación.

---

## 🚀 API Reference

### Tareas (`/api/tasks`)

| Método | Endpoint | Descripción                                                  | Status Code         |
| :----- | :------- | :----------------------------------------------------------- | :------------------ |
| GET    | `/`      | Obtener todas las tareas (soporta filtrado por `categoryId`) | `200`               |
| GET    | `/:id`   | Obtener una tarea por ID                                     | `200`, `404`        |
| POST   | `/`      | Crear una nueva tarea                                        | `201`, `400`        |
| PATCH  | `/:id`   | Actualización parcial de una tarea                           | `200`, `400`, `404` |
| DELETE | `/:id`   | Eliminar una tarea                                           | `204`, `404`        |

#### Ejemplo de peticiones

- POST /tasks

Body

```
{
  "title":"Título obligatorio",
  "description":"Opcional",
  "completed": true // opcional (false by default),
  "categoryId":"550e8400-e29b-41d4-a716-446655440000"  // opcional
}
```

- PATCH /tasks/taskId
  Se envían solo los campos que cambian.

Body

```
{
  "completed": false,
  "categoryId": "" // en db-lolcal equivale a "uncategorized"
}
```

### Categorías (`/api/taskCategories`)

| Método | Endpoint  | Descripción                                             | Status Code  |
| :----- | :-------- | :------------------------------------------------------ | :----------- |
| GET    | `/`       | Listar todas las categorías                             | `200`        |
| GET    | `/:id`    | Obtener categoría por ID                                | `200`, `404` |
| POST   | `/`       | Crear nueva categoría                                   | `201`, `400` |
| POST   | `/delete` | Borra categorías, reasigna las tareas a "uncategorized" | `204`, `404` |
| PATCH  | `/:id`    | Editar nombre de categoría                              | `200`, `404` |

#### Ejemplo de peticiones

Especial atención al endponit de borrado, NO usa DELETE

- POST /api/taskCategories/delete

  Este endpoint requiere un objeto con un array de IDs aunque solo se requiera borrar 1 categoria.
  El servidor reasignará automáticamente las tareas vinculadas a "uncategorized".
  Si algún id no se encuentra en la BBDD se ignora.

Body

```json
{
  "categoriesIds": ["uuid-1", "uuid-2", "uuid-n"]
}
```

---

## 💾 Modelos de Datos (Esquemas JSON)

### Task

```json
{
  "_id": "uuid (generado en la API)",
  "title": "string (required)",
  "description": "string (opcional)",
  "completed": "boolean (default: false)",
  "categoryId": "string (uuid o 'uncategorized' by default)",
  "createdAt": "ISOString (read only)",
  "updatedAt": "ISOString (read only)",
  "finishedAt": "ISOString | null (read only)"
}
```

### TaskCategory

```json
{
  "_id": "uuid (generado en la API)",
  "name": "string (required)"
}
```
