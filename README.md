# README.md

## Descripción del Proyecto

Gestor de tareas minimalista desarrollado con **Node.js + Express** y **db-local** como base de datos local. Permite crear, editar, eliminar y marcar tareas como completadas. Este MVP sienta las bases para futuras ampliaciones, incluyendo usuarios, cronometraje y roles.

## Requisitos Previos y dependencias usadas

* Node.js >= 18
* npm >= 9

* cors: 2.8.5
* db-local: 3.1.0
* dotenv: 17.2.3
* express: 5.1.0
* zod: 4.1.12

## Instalación y Configuración

```bash
# Clonar repositorio
git clone <URL_REPO>
cd taskManager

# Instalar dependencias
npm install

# Crear archivo .env
PORT = 3000

```

## Estructura del Proyecto

```
project-root/
│
├── src/
│   ├── controllers/
│   │   └── task.js
│   ├── DB/
│   │   ├── DB_schemas.js     # Definición de esquemas para db-local
│   │   └── tasks.json        # Datos persistidos de las tareas en formato json (tabla de la db-local)
│   ├── middlewares/
│   │   └── cors.js           # Uso de la libreria cors para la gestión de las mismas
│   ├── models/
│   │   └── task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── schemas/
│   │   └── task.js           # Esquema de las tareas para validacion de datos usanso zod
│   └── index.js
│
├── public/ (frontend)
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── styles/
│   │   ├── index.css
│   │   └── normalice.css
│   └── index.html
│
├── .env
├── .gitignore
├── package.json
└── README.md
```
