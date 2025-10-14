# Historias de Usuario – Gestor de Tareas

## Prioridad 1 – Funcionalidades básicas (MVP)

### HU-01: Crear tareas
**Como** usuario
**Quiero** poder crear nuevas tareas con un título y descripción
**Para** organizar y registrar las actividades pendientes

**Criterios de aceptación:**
1. El sistema debe permitir crear una tarea introduciendo al menos un título.
2. La nueva tarea debe guardarse automáticamente en la base de datos local.
3. Tras crearla, la tarea debe visualizarse inmediatamente en la lista principal.

---

### HU-02: Editar tareas
**Como** usuario
**Quiero** modificar el título o la descripción de una tarea existente
**Para** mantener actualizada la información sin tener que crear una nueva

**Criterios de aceptación:**
1. El sistema debe permitir editar el contenido de una tarea seleccionada.
2. Los cambios deben persistir en la base de datos local sin duplicar la tarea.
3. La interfaz debe reflejar los cambios actualizados sin recargar la página.

---

### HU-03: Eliminar tareas
**Como** usuario
**Quiero** poder eliminar tareas que ya no son necesarias
**Para** mantener mi lista limpia y actualizada

**Criterios de aceptación:**
1. El sistema debe permitir eliminar una tarea mediante un botón o acción específica.
2. Al eliminarla, la tarea debe desaparecer de la lista inmediatamente.
3. El sistema debe actualizar la base de datos local eliminando también el registro asociado.

---

### HU-04: Marcar o desmarcar tareas como finalizadas
**Como** usuario
**Quiero** poder marcar y desmarcar tareas como completadas
**Para** visualizar rápidamente el progreso de mis actividades

**Criterios de aceptación:**
1. Cada tarea debe tener un indicador visual (checkbox o similar) para marcar su estado.
2. El cambio de estado debe guardarse de forma persistente en la base de datos local.
3. Las tareas completadas deben distinguirse visualmente de las pendientes.

---

## Prioridad 2 – Funcionalidades futuras (Iteraciones siguientes)

### HU-05: Registro e inicio de sesión de usuarios
**Como** nuevo usuario
**Quiero** poder crear una cuenta e iniciar sesión
**Para** acceder a mis tareas personales y mantener mis datos separados de otros usuarios

**Criterios de aceptación:**
1. El sistema debe permitir el registro mediante correo electrónico y contraseña.
2. El inicio de sesión debe autenticar y cargar únicamente las tareas asociadas al usuario.
3. Las credenciales deben almacenarse y transmitirse de forma cifrada y segura.

---

### HU-06: Gestión de perfil de usuario
**Como** usuario autenticado
**Quiero** poder acceder y modificar la información de mi perfil
**Para** mantener mis datos personales actualizados

**Criterios de aceptación:**
1. El sistema debe mostrar una vista de perfil con los datos del usuario actual.
2. Los cambios realizados deben guardarse y reflejarse en la base de datos.
3. El usuario no debe poder modificar información crítica de otros usuarios.

---

### HU-07: Cronometrar el tiempo de trabajo en tareas
**Como** usuario
**Quiero** iniciar y detener un cronómetro en cada tarea
**Para** registrar el tiempo total dedicado a cada una

**Criterios de aceptación:**
1. Cada tarea debe permitir iniciar y detener un temporizador individual.
2. El sistema debe guardar el tiempo acumulado por sesión hasta finalizar la tarea.
3. El usuario debe poder consultar el total de tiempo invertido por tarea.

---

### HU-08: Asignación de tareas por roles
**Como** administrador
**Quiero** poder asignar tareas a distintos usuarios
**Para** distribuir el trabajo de manera organizada dentro del sistema

**Criterios de aceptación:**
1. Solo los usuarios con rol de administrador deben poder asignar tareas.
2. Las tareas asignadas deben aparecer en la lista del usuario correspondiente.
3. El sistema debe registrar quién asignó la tarea y cuándo lo hizo.

---

### HU-09: Visualización de tiempos e historial
**Como** usuario
**Quiero** visualizar un resumen de los tiempos dedicados a mis tareas
**Para** analizar mi productividad y gestión del tiempo

**Criterios de aceptación:**
1. El sistema debe mostrar el tiempo total invertido en cada tarea completada.
2. El usuario debe poder ver un historial de sesiones de trabajo anteriores.
3. Los datos deben cargarse rápidamente (<2 s) desde el almacenamiento local o remoto.

---

## Prioridad 3 – Escalabilidad y mejoras

### HU-10: Migración a base de datos remota
**Como** administrador del sistema
**Quiero** poder configurar el almacenamiento en una base de datos remota
**Para** escalar el sistema sin pérdida de datos locales

**Criterios de aceptación:**
1. El sistema debe poder exportar las tareas locales a una base de datos externa.
2. La estructura de datos debe mantenerse compatible entre entornos local y remoto.
3. La aplicación debe seguir funcionando correctamente durante la transición.

---
