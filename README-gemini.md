# Task Management API - Backend Documentation

Sistema de gestión de tareas y categorías desarrollado con **Node.js**, **Express** y **db-local**. El proyecto sigue una arquitectura **MVC (Modelo-Vista-Controlador)** reforzada con una capa de **Servicios** para garantizar la escalabilidad y el desacoplamiento de la lógica de negocio.

## 🛠 Stack Tecnológico y Dependencias

El proyecto está construido sobre un entorno **Node.js** moderno utilizando las siguientes librerías:

- **Framework:** `express` (v5.1.0) - _Última versión con soporte nativo para promesas._
- **Base de Datos:** `db-local` (v3.1.0) - _Persistencia local basada en JSON._
- **Validación:** `zod` (v4.1.12) - _Validación de esquemas con tipado fuerte._
- **Seguridad & Configuración:**
  - `cors` (v2.8.5) - _Gestión de Cross-Origin Resource Sharing._
  - `dotenv` (v17.2.3) - _Carga de variables de entorno desde archivos .env._
- **Utilidades Nativas:**
  - `node:crypto` - _Generación de UUIDs v4 para identificadores únicos._

---

## ⚙️ Instalación y Despliegue

Para poner en marcha el entorno de desarrollo, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar variables de entorno: Crea un archivo .env en la raíz con la siguiente configuración:**
   PORT=3000
4. **Iniciar el servidor:**
   ```bash
   npm start
   ```

---

## 🛠 Arquitectura del Sistema

El backend está diseñado bajo el principio de separación de responsabilidades:

- **Routes:** Definición de endpoints y mapeo de verbos HTTP.
- **Controllers:** Gestión del protocolo (extracción de parámetros, validación de schemas y respuesta al cliente).
- **Services:** Orquestación de la lógica de negocio compleja y comunicación entre diferentes modelos.
- **Models:** Abstracción de la persistencia de datos (capa de acceso a `db-local`).
- **Schemas:** Validación de integridad de datos de entrada.

---

## 📋 Reglas de Negocio Implementadas

### Gestión de Tareas

- **Identificadores:** Cada tarea genera un `UUID v4` único al crearse.
- **Ciclo de Vida:** - `createdAt`: Se asigna automáticamente al crear la tarea.
  - `updatedAt`: Se actualiza en cada operación de edición.
  - `finishedAt`: Se gestiona automáticamente. Se genera cuando `completed` pasa a `true` y se elimina si la tarea se marca como pendiente nuevamente.
- **Categorización:** Si no se especifica una categoría, el sistema permite la etiqueta por defecto `uncategorized`.

### Gestión de Categorías

- **Integridad Referencial:** No se permite la eliminación de una categoría si tiene tareas vinculadas (Retorna `409 Conflict`).
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

### Categorías (`/api/taskCategories`)

| Método | Endpoint | Descripción                           | Status Code         |
| :----- | :------- | :------------------------------------ | :------------------ |
| GET    | `/`      | Listar todas las categorías           | `200`               |
| GET    | `/:id`   | Obtener categoría por ID              | `200`, `404`        |
| POST   | `/`      | Crear nueva categoría                 | `201`, `400`        |
| PATCH  | `/:id`   | Editar nombre de categoría            | `200`, `404`        |
| DELETE | `/:id`   | Borrar categoría (solo si está vacía) | `204`, `404`, `409` |

---

## 💾 Modelos de Datos (Esquemas JSON)

### Task

```json
{
  "_id": "uuid",
  "title": "string (required)",
  "description": "string",
  "completed": "boolean (default: false)",
  "categoryId": "string (link to Category)",
  "createdAt": "ISOString",
  "updatedAt": "ISOString",
  "finishedAt": "ISOString | null"
}
```

### TaskCategory

```json
{
  "_id": "uuid",
  "name": "string (required)"
}
```
