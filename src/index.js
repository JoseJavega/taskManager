import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { tasksRouter } from "./routes/tasks.js";
import { taskCategoriesRouter } from "./routes/taskCategories.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.use(express.json()); // para acceder a los datos del req.body
app.use(corsMiddleware()); // accesos autorizador de CORS
app.disable("x-powered-by"); // desabilita la cabecera de express

// Convierte la URL del módulo actual a ruta de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// permite a express servir directamente los archivos estáticos de public
app.use(express.static(path.join(__dirname, "..", "public")));

// ROUTES
app.use("/api/tasks", tasksRouter);
app.use("/api/taskCategories", taskCategoriesRouter);

// Ruta general para servir index.html a todas las rutas que no coincidan antes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto:${PORT}`);
});
