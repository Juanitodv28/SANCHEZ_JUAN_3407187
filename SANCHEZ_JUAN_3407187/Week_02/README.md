# 🧳 Gestor de Paquetes de Viajes - Semana 02

## ¿Qué es esto?

Básicamente es una app para gestionar los paquetes turísticos que ofrece una agencia de viajes. Puedes crear, editar, eliminar y filtrar paquetes de viajes de diferentes tipos (playa, montaña, ciudad, etc.). Es como un tablero de control donde ves todos tus paquetes disponibles y los que están descatalogados.

## ¿Qué hay implementado?

### 📝 Funcionalidad CRUD completa
- **Crear**: Formulario para agregar nuevos paquetes con todos los datos (nombre, destino, precio, duración, plazas, etc.)
- **Leer**: Mostrar todos los paquetes en forma de tarjetas interactivas
- **Actualizar**: Editar cualquier paquete existente con un clic
- **Eliminar**: Borrar paquetes que no necesites

### 🎯 Sistema de Filtros y Búsqueda
Puedo filtrar por:
- **Estado** (disponible o no disponible)
- **Categoría** (playa, montaña, ciudad, aventura, cultural, familiar)
- **Prioridad** (baja, media, alta) - lo que llamé "popularidad" del paquete
- **Búsqueda por nombre** - para encontrar rápido lo que necesites

### 💾 Persistencia automática
Toda la información se guarda en `localStorage`, así que cuando cierres la página todo sigue ahí. No necesita base de datos.

### 🎨 Tema oscuro/claro
Botón para cambiar entre tema claro y oscuro. Muy útil si trabajas de noche sin quemar los ojos.

### 📊 Estadísticas en tiempo real
En la cabecera se ven números de:
- Total de paquetes
- Paquetes disponibles
- Paquetes no disponibles

Se actualiza automáticamente cada vez que haces algo.

## 🛠️ Cómo está hecho por dentro

### Enfoque funcional e inmutable
Todo el código usa:
- **Spread operator (`...`)** para copiar arrays sin mutarlos
- **Map/filter/reduce** para transformar datos
- **Default parameters** en las funciones
- Cada cambio crea un nuevo array, nunca se modifica el original

Esto es importante porque así no me meto en líos raros de referencias y referencias.

### Estructura del código
El `script.js` está dividido en secciones claras:
- **Estado global** (`items` y `editingItemId`)
- **Constantes** (categorías, prioridades)
- **Funciones de persistencia** (guardar/cargar del localStorage)
- **Operaciones CRUD** (crear, actualizar, eliminar)
- **Filtros y búsqueda**
- **Renderizado** (mostrar todo en pantalla)
- **Event listeners** (qué pasa cuando haces clic en botones, escribes, etc.)

### Datos de un paquete
Cada paquete tiene:
```javascript
{
  id: (número único),
  name: "Nombre del paquete",
  description: "Descripción",
  category: "playa|montana|ciudad|aventura|cultural|familiar",
  priority: "low|medium|high",
  active: true/false,
  destino: "México",
  precio: 1200,
  duracion: 7,  // en días
  fecha: "2026-03-15",
  plazas: 20,   // plazas disponibles
  createdAt: (fecha de creación),
  updatedAt: (fecha de última edición)
}
```

## 🎯 Lo que más me gustó de hacerlo

1. **La inmutabilidad** - Usar spread operator para no mutar el estado directo es limpio y evita bugs raros
2. **El filtrado** - Poder combinar filtros (por estado + categoría + búsqueda) es bastante útil y no es complicado
3. **El tema oscuro** - Cambiar entre temas sin que parpadee la página está bien
4. **Las estadísticas en vivo** - Ver los números actualizarse mientras trabajas es satisfactorio

## 🚀 Cómo usarla

1. Abre `index.html` en el navegador
2. Llena el formulario con los datos del paquete (los campos con * son obligatorios)
3. Haz clic en "Crear"
4. Usa los filtros de arriba para buscar paquetes específicos
5. Haz clic en una tarjeta para editarla, o usa los botones para cambiar el estado o eliminar

## 💡 Notas sobre las decisiones técnicas

- **localStorage**: Es simple y suficiente para una app de este tamaño. Si fuera más grande, usaría una base de datos real.
- **IDs con Date.now()**: Funciona para este proyecto. En producción usaría UUIDs.
- **Functiones puras**: Todas las funciones CRUD devuelven el nuevo array. Esto hace que sea fácil de testear y predecible.
- **CSS modular**: Uso CSS variables para los temas, así cambiar colores es trivial.

---

**Versión**: Week 02  
**Última actualización**: Febrero 2026
