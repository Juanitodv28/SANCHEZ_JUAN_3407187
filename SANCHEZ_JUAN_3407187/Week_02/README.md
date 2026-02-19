# ✈️ Gestor de Paquetes de Viajes - Mi Implementación Personal

**Autor**: Juan Sánchez (3407187)  
**Semana**: 02 - JavaScript ES2023 Moderno  
**Dominio Asignado**: Gestión de Agencia de Viajes 🏨

> Un sistema integral para la gestión del catálogo de paquetes turísticos de una agencia de viajes, implementado con JavaScript puro. Mi solución personal para consolidar conceptos de ES2023.

---

## 🎯 Mi Decisión de Diseño

Para el dominio **Gestión de Agencia de Viajes**, desarrollé un sistema administrativo que permite:

- **Administración del catálogo** - Crear, editar y eliminar paquetes turísticos
- **Propiedades comerciales** - Destino, precio, duración, fecha de salida, plazas disponibles
- **Gestión de inventario** - Marcar paquetes como disponibles o no disponibles para reserva
- **Análisis de catálogo** - Ver estadísticas por tipo de viaje y nivel de popularidad

---

## 📁 Estructura de Archivos

```
Week_02/
├── index.html              # Estructura y markup semántico
├── styles.css              # Estilos con CSS variables y tema oscuro
├── starter/
│   └── script.js           # Lógica completa de la aplicación
└── README.md               # Este archivo
```

---

## 🔧 Cómo Implementé Cada Componente

### 1. **HTML - Estructura Semántica** (`index.html`)

Mi markup está organizado en 5 secciones principales:

#### Encabezado con Estadísticas
```html
<header class="header">
  <h1>✈️ Gestor de Paquetes de Viajes</h1>
  <div class="stats-summary">
    <span class="stat">Total: <strong id="stat-total">0</strong></span>
    <span class="stat">Disponibles: <strong id="stat-active">0</strong></span>
    <span class="stat">No disponibles: <strong id="stat-inactive">0</strong></span>
  </div>
</header>
```

**Decisión**: El total aparece directamente en el header para visibilidad inmediata del usuario.

#### Formulario Multiuso (Crear y Editar)
Implementé un **formulario único** que los gestores de la agencia utilizan para crear y editar paquetes:

- **Campos generales**: Nombre del paquete, descripción detallada
- **Categorización**: Tipo de viaje (6 opciones) y nivel de popularidad (3 niveles)
- **Campos específicos de gestión**:
  - 📍 Destino (obligatorio)
  - 💰 Precio en USD con decimales
  - 📅 Duración en días
  - 🗓️ Fecha de salida (date picker)
  - 👥 Plazas disponibles para reserva

**Validación**: Solo nombre y destino son obligatorios (información crítica para administrar el paquete en el catálogo de la agencia).

#### Sistema de Filtros en Cascada
Para que los gestores encuentren paquetes rápidamente, implementé 4 filtros independientes que se aplican simultáneamente:

1. **Por estado**: Todos, Disponibles, No disponibles (estado del catálogo)
2. **Por categoría**: 6 tipos de viajes (oferta de la agencia)
3. **Por popularidad**: Alta, Media, Baja (demanda del mercado)
4. **Búsqueda textual**: En nombre, descripción y destino (búsqueda flexible)

#### Lista de Paquetes
Cada paquete muestra:
- Checkbox para marcar disponibilidad
- Nombre y descripción
- 5 detalles con emojis (destino, precio, días, fecha, plazas)
- Badges de categoría y popularidad
- Fecha de creación
- Botones de editar y eliminar

#### Panel de Estadísticas
Muestra desglose por categoría tipo: `🏖️ Playa: 3 | 🏔️ Montaña: 1 | ...`

### 2. **CSS - Diseño Responsivo y Temático** (`styles.css`)

Mi estrategia de estilos:

#### Variables CSS para Temas
```css
:root {
  --bg-primary: #f5f7fa;
  --bg-secondary: #ffffff;
  --text-primary: #2d3748;
  --accent: #4299e1;
  --border: #e2e8f0;
  --shadow: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
}
```

**Ventaja**: Cambio instantáneo de tema aplicando un atributo `data-theme`.

#### Sistema de Tarjetas Mínimas
Cada paquete es una tarjeta con:
- Borde izquierdo coloreado por prioridad (🔴 alta, 🟡 media, 🟢 baja)
- Checkbox a la izquierda
- Contenido flexible en el medio
- Botones de acción a la derecha
- Estado visual diferente cuando está inactivo (opacidad 0.6, tachado)

#### Responsive Design
- **Desktop**: Layout en grid con múltiples columnas
- **Tablet**: Adapta ancho de filtros
- **Móvil**: Pila vertical, botones de acción a full-width

```css
@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
  .item {
    flex-direction: column;
  }
}
```

#### Transiciones Suaves
Todas las interacciones tienen transiciones CSS de 0.2s para feedback visual.

### 3. **JavaScript - Lógica Funcional e Inmutable** (`starter/script.js`)

Mi arquitectura de código está dividida en **8 módulos claros**:

#### Módulo 1: Definición de Constantes
```javascript
const CATEGORIES = {
  playa: { name: 'Playa', emoji: '🏖️' },
  montana: { name: 'Montaña', emoji: '🏔️' },
  ciudad: { name: 'Ciudad', emoji: '🏙️' },
  aventura: { name: 'Aventura', emoji: '🧗' },
  cultural: { name: 'Cultural', emoji: '🏛️' },
  familiar: { name: 'Familiar', emoji: '👨‍👩‍👧‍👦' }
};

const PRIORITIES = {
  high: { name: 'Alta', color: '#ef4444' },
  medium: { name: 'Media', color: '#f59e0b' },
  low: { name: 'Baja', color: '#22c55e' }
};
```

Cada categoría tiene emoji y nombre para coherencia visual.

#### Módulo 2: Persistencia con LocalStorage
```javascript
const loadItems = () => {
  return JSON.parse(localStorage.getItem('travelPackages') ?? '[]');
};

const saveItems = itemsToSave => {
  localStorage.setItem('travelPackages', JSON.stringify(itemsToSave));
};
```

**Decisión**: Usar la clave `travelPackages` específica del dominio.

#### Módulo 3: CRUD Inmutable

**CREATE** - Crea sin mutar el array original:
```javascript
const createItem = (itemData = {}) => {
  const newItem = {
    id: Date.now(),
    name: itemData.name ?? '',
    category: itemData.category ?? 'playa',
    priority: itemData.priority ?? 'medium',
    active: true,
    createdAt: new Date().toISOString(),
    // Propiedades del dominio:
    destino: itemData.destino ?? '',
    precio: itemData.precio ?? 0,
    duracion: itemData.duracion ?? 1,
    fecha: itemData.fecha ?? '',
    plazas: itemData.plazas ?? 0,
    ...itemData
  };
  const newItems = [...items, newItem];  // Spread para copiar
  saveItems(newItems);
  return newItems;
};
```

**UPDATE** - Usa `map()` para crear nuevo array:
```javascript
const updateItem = (id, updates) => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );
  saveItems(updatedItems);
  return updatedItems;
};
```

**DELETE** - Usa `filter()` para excluir:
```javascript
const deleteItem = id => {
  const filteredItems = items.filter(item => item.id !== id);
  saveItems(filteredItems);
  return filteredItems;
};
```

**TOGGLE** - Alterna estado:
```javascript
const toggleItemActive = id => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active, updatedAt: new Date().toISOString() }
      : item
  );
  saveItems(updatedItems);
  return updatedItems;
};
```

#### Módulo 4: Sistema de Filtros

Cada filtro es una función independiente que se aplica en cadena:

```javascript
const filterByStatus = (itemsToFilter, status = 'all') => {
  if (status === 'all') return itemsToFilter;
  if (status === 'active') return itemsToFilter.filter(item => item.active);
  if (status === 'inactive') return itemsToFilter.filter(item => !item.active);
  return itemsToFilter;
};

const filterByCategory = (itemsToFilter, category = 'all') => {
  if (category === 'all') return itemsToFilter;
  return itemsToFilter.filter(item => item.category === category);
};
```

**Aplicar múltiples filtros**:
```javascript
const applyFilters = (itemsToFilter, filters = {}) => {
  const { status = 'all', category = 'all', priority = 'all', search = '' } = filters;
  
  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);
  return result;
};
```

**Búsqueda textual** en múltiples campos:
```javascript
const searchItems = (itemsToFilter, query) => {
  if (!query || query.trim() === '') return itemsToFilter;
  const searchTerm = query.toLowerCase();
  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description ?? '').toLowerCase().includes(searchTerm) ||
    (item.destino ?? '').toLowerCase().includes(searchTerm)
  );
};
```

#### Módulo 5: Estadísticas con Reduce

```javascript
const getStats = (itemsToAnalyze = []) => {
  const total = itemsToAnalyze.length;
  const active = itemsToAnalyze.filter(item => item.active).length;
  const inactive = total - active;

  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});

  return { total, active, inactive, byCategory, byPriority };
};
```

**Decisión**: Calcular estadísticas sobre demanda, no guardarlas.

#### Módulo 6: Renderizado HTML

Renderizar un **paquete individual** con template literal:
```javascript
const renderItem = item => {
  const { id, name, description, category, priority, active, destino, precio, duracion, fecha, plazas } = item;

  return `
    <div class="item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">
      <input type="checkbox" class="item-checkbox" ${active ? 'checked' : ''}>
      <div class="item-content">
        <h3>${name}</h3>
        <div class="item-details">
          <div class="detail-item">📍 ${destino || 'Destino no especificado'}</div>
          <div class="detail-item">💰 $${precio || 0} USD</div>
          <div class="detail-item">📅 ${duracion || 1} días</div>
          ${fecha ? `<div class="detail-item">🗓️ ${formatDate(fecha)}</div>` : ''}
          <div class="detail-item">👥 ${plazas || 0} plazas</div>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
      </div>
    </div>
  `;
};
```

Renderizar la **lista completa**:
```javascript
const renderItems = itemsToRender => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    itemList.innerHTML = itemsToRender.map(renderItem).join('');
  }
};
```

Renderizar **estadísticas**:
```javascript
const renderStats = stats => {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  const categoryStats = Object.entries(stats.byCategory)
    .map(([cat, count]) => `${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name ?? cat}: ${count}`)
    .join(' | ');
  document.getElementById('stats-details').innerHTML = categoryStats;
};
```

#### Módulo 7: Event Handlers

**Crear/Editar paquete**:
```javascript
const handleFormSubmit = e => {
  e.preventDefault();

  const name = document.getElementById('item-name').value.trim();
  const destino = document.getElementById('item-destino').value.trim();
  // ... más campos

  if (!name || !destino) {
    alert('Nombre y destino son obligatorios');
    return;
  }

  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};
```

**Editar paquete** - Carga datos en el formulario:
```javascript
const handleItemEdit = itemId => {
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;

  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-destino').value = itemToEdit.destino ?? '';
  // ... más campos

  document.getElementById('form-title').textContent = '✏️ Editar Paquete de Viajes';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-block';

  editingItemId = itemId;
};
```

**Aplicar filtros en tiempo real**:
```javascript
const handleFilterChange = () => {
  const filteredItems = applyCurrentFilters();
  renderItems(filteredItems);
};
```

#### Módulo 8: Inicialización y Tema

**Toggle de tema persistente**:
```javascript
const initThemeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light');
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
};
```

**Inicializar app**:
```javascript
const init = () => {
  items = loadItems();  // Cargar catálogo guardado
  renderItems(items);
  renderStats(getStats(items));
  attachEventListeners();
  initThemeToggle();
  console.log('✅ Sistema de Gestión de Agencia de Viajes inicializado correctamente');
};

document.addEventListener('DOMContentLoaded', init);
```

---

## 🎓 Características de ES2023 Que Usé

### 1. **Spread Operator (...)** - Copia Inmutable
```javascript
// Copiar arrays sin mutar el original
const newItems = [...items, newItem];

// Copiar objetos y hacer merge
const updated = { ...item, ...updates };
```

### 2. **Default Parameters** - Valores por Defecto
```javascript
const loadItems = () => {
  return JSON.parse(localStorage.getItem('travelPackages') ?? '[]');
};

const filterByStatus = (itemsToFilter, status = 'all') => { ... };

const getStats = (itemsToAnalyze = []) => { ... };
```

### 3. **Nullish Coalescing (??)** - Valores por Defecto Específicos
```javascript
const newItem = {
  name: itemData.name ?? '',
  priority: itemData.priority ?? 'medium',
  destino: itemData.destino ?? ''
};
```

### 4. **Array Methods** - Transformación de Datos

**map** - Transformar cada elemento:
```javascript
itemsToRender.map(renderItem).join('')
```

**filter** - Seleccionar elementos:
```javascript
items.filter(item => item.active)
items.filter(item => item.id !== id)
```

**reduce** - Agregar información:
```javascript
itemsToAnalyze.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] ?? 0) + 1;
  return acc;
}, {})
```

**find** - Buscar un elemento:
```javascript
items.find(item => item.id === itemId)
```

### 5. **Destructuring** - Extraer Propiedades
```javascript
const { id, name, description, category, priority, active, destino, precio } = item;

const { status = 'all', category = 'all', priority = 'all', search = '' } = filters;
```

### 6. **Template Literals** - Strings Dinámicos
```javascript
`<div class="item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">...`

`${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name ?? cat}: ${count}`
```

### 7. **Optional Chaining (?.)** - Acceso Seguro
```javascript
CATEGORIES[category]?.emoji ?? '📌'
CATEGORIES[cat]?.name ?? cat
itemData.description ?? ''
```

---

## 🔄 Flujo de Datos en Mi Implementación

```
1. Al cargar la página:
   ├─ localStorage.getItem('travelPackages') → items
   ├─ renderItems(items)
   ├─ renderStats(getStats(items))
   └─ attachEventListeners()

2. Usuario interactúa:
   ├─ Llenar formulario + Submit
   │  └─ createItem() o updateItem()
   │     └─ saveItems() [localStorage]
   │     └─ items = return value
   │
   ├─ Cambiar filtro
   │  └─ getCurrentFilters()
   │  └─ applyFilters(items, filters)
   │  └─ renderItems(filtered)
   │
   └─ Click en checkbox/botón
      └─ toggleItemActive() o deleteItem()
         └─ saveItems()
         └─ items = return value
         └─ renderItems() + renderStats()

3. Cambio de tema:
   └─ localStorage.setItem('theme', newTheme)
   └─ document.documentElement.setAttribute('data-theme', newTheme)
   └─ CSS variables cambian automáticamente
```

---

## 💡 Decisiones de Diseño Importantes

### Formulario Unificado
Usé un solo formulario para crear y editar:
- Más código limpio (menos duplicación)
- Usuario sabe dónde editar
- Botón dinámico: "Crear" o "Actualizar"

### Filtros Independientes
Cada filtro es una función pura:
- Reutilizable
- Combinable
- Fácil de testear mentalmente

### Renderizado Completo
Vuelvo a renderizar toda la lista cuando hay cambios:
- Más simple de entender
- Sin bugs de sincronización
- Barato para ~20-30 paquetes

### LocalStorage, No Servidor
Elegí persistencia local porque:
- Requisito de la semana
- Simplicidad (sin backend)
- Privacidad (datos locales del usuario)

### Validación Mínima
Solo valido campos obligatorios (nombre, destino):
- Les dejo libertad al usuario
- Puedo mejorar luego si necesito

### Estadísticas Calculadas
No guardo estadísticas, las calculo cuando las necesito:
- Siempre sincronizadas
- Menos redundancia

---

## 🧪 Casos de Uso Reales

### Crear un paquete (Gestor de agencia)
```
1. Gestor abre la página → Ve formulario vacío
2. Ingresa datos: "Viaje a Cancún", categoría "Playa", precio "1200"
3. Click en "Crear"
4. Sistema: Crea paquete, lo guarda en localStorage (catálogo persistente), lo renderiza
5. Paquete aparece en la lista, estadísticas de catálogo se actualizan
```

### Buscar y filtrar paquetes
```
1. Gestor escribe "cancun" en búsqueda
2. Sistema filtra en tiempo real (nombre, descripción, destino)
3. Selecciona categoría "Playa"
4. Sistema aplica ambos filtros simultáneamente
5. Ve solo paquetes de playa que contienen "cancun" en el catálogo
```

### Marcar paquete como no disponible
```
1. Gestor hace click en checkbox del paquete
2. Sistema ejecuta toggleItemActive() - cambia estado de disponibilidad
3. Paquete se vuelve gris, nombre tachado (visualmente inactivo)
4. Checkbox se desmarca
5. Estadísticas del catálogo se actualizan automáticamente
```

### Editar información de un paquete
```
1. Gestor click en ✏️ de un paquete existente
2. Formulario se llena con los datos guardados
3. Title cambia a "Editar Paquete"
4. Gestor modifica precio, fechas, descripción, etc.
5. Click en "Actualizar"
6. Sistema reemplaza el paquete en localStorage (catálogo actualizado)
```

---

## 📊 Estructura de un Paquete en Mi Sistema

```javascript
{
  id: 1708331400000,                    // Timestamp único
  name: "Viaje a Cancún Todo Incluido", // Nombre
  description: "Descripción...",        // Detalles
  category: "playa",                    // Tipo de viaje
  priority: "high",                     // Popularidad
  active: true,                         // Disponible
  createdAt: "2026-02-19T14:30:00.000Z",// Fecha creación
  updatedAt: null,                      // Última edición
  
  // Propiedades del dominio:
  destino: "Cancún, México",            // 📍
  precio: 1200.00,                      // 💰 USD
  duracion: 7,                          // 📅 días
  fecha: "2026-06-15",                  // 🗓️ Salida
  plazas: 20                            // 👥 Disponibles
}
```

---

## 🚀 Cómo Usar el Sistema de Gestión

1. **Abrir** `index.html` en navegador (acceder al gestor)
2. **Ver** resumen del catálogo con estadísticas en 0
3. **Crear paquete** - Ingresar datos en el formulario
4. **Click** en "Crear" para añadir al catálogo
5. **Filtrar catálogo** usando estados, categorías o búsqueda
6. **Editar paquete** haciendo click en ✏️ para actualizar datos
7. **Eliminar paquete** haciendo click en 🗑️ para remover del catálogo
8. **Cambiar tema** con botón 🌙/☀️ (noche/día)
9. **Cerrar navegador** → Catálogo se preserva automáticamente en localStorage

---

## ✅ Checklist Personal de Implementación

### Funcionalidad
- ✓ Crear paquetes con todos los campos del dominio
- ✓ Editar paquetes cargando datos en formulario
- ✓ Eliminar con confirmación
- ✓ Marcar disponible/no disponible con checkbox
- ✓ Filtrar por estado, categoría, popularidad
- ✓ Buscar por nombre, descripción, destino
- ✓ Estadísticas en tiempo real
- ✓ Datos persisten entre recargas

### Código
- ✓ Spread operator para copiar sin mutar
- ✓ Map, filter, reduce, find usados correctamente
- ✓ Zero mutación de estado global
- ✓ Default parameters en todas las funciones
- ✓ Destructuring para extraer datos
- ✓ Template literals para todo HTML
- ✓ Comentarios claros en español
- ✓ Funciones con nombres descriptivos en inglés

### Dominio: Gestión de Agencia de Viajes
- ✓ Sistema completo para administrar catálogo de paquetes
- ✓ 6 tipos de viajes (cobertura diversa para la agencia)
- ✓ 3 niveles de popularidad (indicador de demanda)
- ✓ Propiedades de gestión realistas (destino, precio, plazas)
- ✓ Emojis contextuales para claridad visual
- ✓ Mensajes de confirmación para operaciones críticas

### UX
- ✓ Interfaz intuitiva y clara
- ✓ Tema oscuro con persistencia
- ✓ Responsive en móvil/tablet/desktop
- ✓ Feedback visual en transiciones
- ✓ Estado vacío con mensaje
- ✓ Validación clara de campos
- ✓ Botones con etiquetas claras

---

## 🎓 Lo Que Aprendí Implementando

1. **Inmutabilidad es poderosa** - Spread operator + map/filter son suficientes
2. **Funciones puras son limpias** - Cada función hace una cosa bien
3. **LocalStorage es simple** - JSON.stringify/parse resuelve la persistencia
4. **CSS variables son geniales** - Cambiar tema es trivial
5. **Array methods son verbosos pero claros** - Reduce toma tiempo en entenderlo
6. **Event delegation ahorra listeners** - Un listener en el contenedor
7. **Render completo > actualizaciones parciales** - Para colecciones pequeñas

---

## 📝 Notas Finales sobre el Proyecto

Este proyecto fue mi primer contacto real con **programación funcional aplicada a un dominio del mundo real** (Gestión de Agencia de Viajes). La verdadera dificultad no fue escribir el código, sino **pensar sin mutación** - acostumbrarse a crear nuevos arrays en lugar de modificar los existentes.

La "mágica" del sistema es que `items = updateItem(...)` es correcto porque `updateItem` retorna un **nuevo array inmutable**, no modifica el original. Una vez lo entiendes, todo fluye naturalmente.

### Mejoras Futuras para el Sistema de Gestión:
- Agregar validaciones más robustas (ej: fecha futuro, precio positivo, plazas > 0)
- Agregar ordenamiento (más barato, más caro, próxima salida, mejor valorado)
- Agregar búsqueda por rango de precios (filtro avanzado)
- Sincronización entre gestores (backend con NodeJS + Express)
- Histórico de cambios (auditoría de quién editó qué y cuándo)
- Importación/Exportación de catálogo (CSV, JSON)
- Animaciones CSS para feedback visual en creación/eliminación

---

**Sistema de Gestión implementado con ❤️ usando ES2023 JavaScript puro**  
Juan Sánchez - Febrero 2026  
Dominio: Gestión de Agencia de Viajes
