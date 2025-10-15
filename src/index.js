import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { tasksRouter } from './routes/tasks.js';
import { corsMiddleware } from './middlewares/cors.js';

const app=express();
app.use(express.json()); // para acceder a los datos del req.body
app.use(corsMiddleware()); // accesos autorizador de CORS
app.disable('x-powered-by'); // desabilita la cabecera de express

// TASKS
app.use('/tasks',tasksRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=>{ console.log (`servidor corriendo en el puerto:${PORT}`)});