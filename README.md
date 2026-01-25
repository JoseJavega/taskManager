# Task Manager

## Descripción del Proyecto

Sistema de gestión de tareas y categorías basado en una **API RESTful** construida con **Node.js** y **Express**. El proyecto utiliza la librería **db-local** para la persistencia de datos en formato JSON, eliminando la necesidad de configurar motores de base de datos externos para su despliegue inicial.

Diseñado bajo principios de arquitectura modular, el sistema separa la lógica de negocio de la persistencia y la presentación.
Este MVP implementa el ciclo de vida completo de tareas y su organización jerárquica mediante categorías, sentando las bases para una futura escalabilidad hacia sistemas multiusuario y gestión de tiempos.

## 🛠 Requisitos y dependencias

**Entorno de ejecución**
* Node.js >= 18
* npm >= 9

**Dependencias**
* express: 5.1.0
* db-local: 3.1.0 -> motor de persistencia basado en archivos JSON
* zod: 4.1.12 -> validación de esquemas y tipado en tiempo de ejecución

**Utilidades y seguridad**
* cors: 2.8.5
* dotenv: 17.2.3

## 🚀 Instalación y Configuración

```bash
# Clonar repositorio
git clone <URL_REPO>
cd taskManager

# Instalar dependencias
npm install

# Crear archivo .env en la raiz del proyecto
PORT=3000

# Para Iniciar en entorno de desarrollo
npm run dev
# Para iniciar el servidor de producción
npm start
```

## 📂 Estructura del Proyecto

```
project-root/
│
├── src/                    # API Backend
│   ├── controllers/        # Gestión de peticiones y respuestas HTTP
│   ├── DB/                 # Persistencia de datos (esquemas de db-local y archivos JSON)
│   ├── middlewares/        # Funciones intermedia (CORS, Auth, Logger)
│   ├── models/             # Acceso a datos y lógica DB
│   ├── routes/             # Rutas de entrada a la API (Endpoints)
│   ├── schemas/            # Validacion de integridad de datos usanso ZOD
│   ├── API.md              # API Reference
│   └── index.js            # Punto de entrada de la API
│
├── public/                 # Frontend
│   ├── assets/             # Recursos estáticos (fuentes, iconos, imágenes)
│   ├── js/
│   │   ├── controllers/    # Gestión de eventos de la UI
│   │   ├── services/       # Clientes API
│   │   ├── test/           # Script de testeo
│   │   ├── utils/          # Funciones auxliares
│   │   ├── views/          # Renders de las diferenets partes de la UI
│   │   ├── config.js       # Archivo de configuración con la ruta de la API y la cabecera para los fetch
│   │   └── main.js         # Inicializador de la aplicación
│   ├── styles/             # CSS modular y normalización
│   └── index.html          # Punto de entrada de la interfaz
│
├── .env                    # Configuración de variables de entorno
├── package.json            # Dependencias y scripts
└── README.md               # Guía general (este documento)
```

## 📖 Documentación Detallada

Para conocer los endpoints disponibles, los formatos de envío (JSON) y los códigos de respuesta, consulta la referencia técnica:

👉 **[Documentación de la API](./src/API.md)**