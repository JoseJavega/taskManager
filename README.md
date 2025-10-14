# README.md

## Descripción del Proyecto

Gestor de tareas minimalista desarrollado con **Node.js + Express** y **db-local** como base de datos local. Permite crear, editar, eliminar y marcar tareas como completadas. Este MVP sienta las bases para futuras ampliaciones, incluyendo usuarios, cronometraje y roles.

## Requisitos Previos

* Node.js >= 18
* npm >= 9

## Instalación y Configuración

```bash
# Clonar repositorio
git clone <URL_REPO>
cd task-manager

# Instalar dependencias
npm install

# Crear archivo .env
echo "PORT=3000" > .env

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura del Proyecto

```
project-root/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── db/
│   └── index.js
│
├── public/ (frontend)
│   ├── index.html
│   ├── styles.css
│   └── main.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```