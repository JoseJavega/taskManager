# DB_SCHEMA.md

## Colección: `tasks`

| Campo       | Tipo          | Descripción                     |
| ----------- | ------------- | ------------------------------- |
| id          | string (UUID) | Identificador único de la tarea |
| title       | string        | Título de la tarea              |
| description | string        | Descripción detallada           |
| completed   | boolean       | Estado de finalización          |
| createdAt   | date          | Fecha de creación               |
| updatedAt   | date          | Fecha de última actualización   |

## Colección futura: `users`

| Campo     | Tipo          | Descripción                    |
| --------- | ------------- | ------------------------------ |
| id        | string (UUID) | Identificador único de usuario |
| username  | string        | Nombre de usuario único        |
| password  | string        | Hash de contraseña             |
| email     | string        | Correo electrónico del usuario |
| role      | string        | Rol del usuario (user/admin)   |
| createdAt | date          | Fecha de registro              |