/**
 * ============================================
 * PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN CON POO
 * Archivo inicial para el aprendiz
 * ============================================
 *
 * INSTRUCCIONES:
 * 1. Lee el README.md del proyecto para entender los requisitos
 * 2. Adapta TODAS las clases a tu dominio asignado por el instructor
 * 3. Usa características ES2023 de POO:
 *    - Clases con constructor
 *    - Campos privados (#)
 *    - Getters y setters
 *    - Herencia (extends, super)
 *    - Métodos estáticos
 *    - Static blocks
 * 4. Los comentarios deben estar en español
 * 5. La nomenclatura técnica (variables, funciones, clases) en inglés
 *
 * NOTA IMPORTANTE:
 * Este archivo es una PLANTILLA GENÉRICA.
 * Debes adaptarlo completamente a tu dominio asignado.
 * NO copies la implementación de otro compañero.
 *
 * EJEMPLO DE REFERENCIA (NO es un dominio asignable):
 * Planetario - Gestión de cuerpos celestes y observaciones
 *
 * ============================================
 */

// ============================================
// CLASE BASE - TravelPackage (antes BaseItem)
// ============================================
/**
 * Clase base abstracta para todos los paquetes de viaje.
 * Se usa encapsulación mediante campos privados.
 */
class TravelPackage {
  // campos privados obligatorios
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  /**
   * @param {string} name - Nombre del paquete
   * @param {string} location - Destino del paquete
   */
  constructor(name, location) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  // GETTERS
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get isActive() {
    return this.#active;
  }

  get location() {
    return this.#location;
  }

  get dateCreated() {
    return this.#dateCreated;
  }

  // SETTERS
  set location(value) {
    if (!value || value.trim() === '') {
      throw new Error('La ubicación no puede estar vacía');
    }
    this.#location = value.trim();
  }

  // MÉTODOS
  activate() {
    if (this.#active) {
      return { success: false, message: 'El paquete ya está activo' };
    }
    this.#active = true;
    return { success: true, message: 'Paquete activado correctamente' };
  }

  deactivate() {
    if (!this.#active) {
      return { success: false, message: 'El paquete ya está inactivo' };
    }
    this.#active = false;
    return { success: true, message: 'Paquete desactivado correctamente' };
  }

  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  getType() {
    return this.constructor.name;
  }
}

// ============================================
// TODO 2: CLASES DERIVADAS - Tipos de Elementos
// ============================================
/**
 * Crea al menos 3 clases que extiendan tu clase base.
 * Cada clase debe tener:
 * - Campos privados adicionales específicos
 * - Constructor que llame a super()
 * - Getters para las nuevas propiedades
 * - Implementación de getInfo()
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Planet extends CelestialBody {
 *   #type;      // Rocoso, gaseoso, etc.
 *   #moons;     // Número de lunas
 *   #hasRings;  // Tiene anillos
 *
 *   constructor(name, location, type, moons, hasRings) {
 *     super(name, location);
 *     this.#type = type;
 *     this.#moons = moons;
 *     this.#hasRings = hasRings;
 *   }
 *
 *   get type() { return this.#type; }
 *   get moons() { return this.#moons; }
 *   get hasRings() { return this.#hasRings; }
 *
 *   getInfo() {
 *     return {
 *       id: this.id,
 *       name: this.name,
 *       location: this.location,
 *       type: this.#type,
 *       moons: this.#moons,
 *       hasRings: this.#hasRings,
 *       active: this.isActive
 *     };
 *   }
 * }
 */

// Clases específicas de paquetes

class BeachPackage extends TravelPackage {
  #price;
  #duration; // en días
  #seats;

  constructor(name, location, price, duration, seats) {
    super(name, location);
    this.#price = price;
    this.#duration = duration;
    this.#seats = seats;
  }

  get price() { return this.#price; }
  get duration() { return this.#duration; }
  get seats() { return this.#seats; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      type: this.getType(),
      price: this.#price,
      duration: this.#duration,
      seats: this.#seats,
      active: this.isActive
    };
  }
}

class MountainPackage extends TravelPackage {
  #price;
  #duration;
  #seats;

  constructor(name, location, price, duration, seats) {
    super(name, location);
    this.#price = price;
    this.#duration = duration;
    this.#seats = seats;
  }

  get price() { return this.#price; }
  get duration() { return this.#duration; }
  get seats() { return this.#seats; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      type: this.getType(),
      price: this.#price,
      duration: this.#duration,
      seats: this.#seats,
      active: this.isActive
    };
  }
}

class CityPackage extends TravelPackage {
  #price;
  #duration;
  #seats;

  constructor(name, location, price, duration, seats) {
    super(name, location);
    this.#price = price;
    this.#duration = duration;
    this.#seats = seats;
  }

  get price() { return this.#price; }
  get duration() { return this.#duration; }
  get seats() { return this.#seats; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      type: this.getType(),
      price: this.#price,
      duration: this.#duration,
      seats: this.#seats,
      active: this.isActive
    };
  }
}


// ============================================
// CLASE PERSON - Base para usuarios
// ============================================
class Person {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.email = email; // invoca setter para validar
    this.#registrationDate = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }
    this.#email = value;
  }

  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      registrationDate: this.#registrationDate
    };
  }
}

// ============================================
// CLASES DE ROLES - Usuarios especializados
// ============================================

class Agent extends Person {
  #role = 'Agent';
  #assignedPackages = [];

  assignPackage(pkg) {
    this.#assignedPackages.push(pkg);
  }

  get assignedPackages() { return [...this.#assignedPackages]; }
}

class Client extends Person {
  #role = 'Client';
  #bookings = [];

  bookPackage(pkg) {
    this.#bookings.push(pkg);
  }

  get bookings() { return [...this.#bookings]; }
}


// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================
/**
 * Clase principal que gestiona todos los elementos y usuarios.
 * Utiliza static blocks para configuración inicial.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class Observatory { ... }
 */
class MainSystem {
  // Campos privados para almacenar datos
  #items = [];
  #users = [];
  #transactions = [];

  // configuración estática del sistema
  static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = 'Agencia de Viajes';
    console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  static isValidId(id) {
    return typeof id === 'string' && id.length > 0;
  }

  static generateId() {
    return crypto.randomUUID();
  }

  // CRUD ITEMS
  addItem(item) {
    if (!(item instanceof TravelPackage)) {
      return { success: false, message: 'El paquete debe ser instancia de TravelPackage' };
    }
    if (this.#items.length >= MainSystem.MAX_ITEMS) {
      return { success: false, message: 'Límite de paquetes alcanzado' };
    }
    this.#items.push(item);
    return { success: true, message: 'Paquete agregado correctamente', item };
  }

  removeItem(id) {
    const index = this.#items.findIndex(item => item.id === id);
    if (index === -1) {
      return { success: false, message: 'Paquete no encontrado' };
    }
    const removed = this.#items.splice(index, 1)[0];
    return { success: true, message: 'Paquete eliminado', item: removed };
  }

  findItem(id) {
    return this.#items.find(item => item.id === id) ?? null;
  }

  getAllItems() {
    return [...this.#items];
  }

  // BÚSQUEDA Y FILTRADO
  searchByName(query) {
    const searchTerm = query.toLowerCase();
    return this.#items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  filterByType(type) {
    if (type === 'all') return this.getAllItems();
    return this.#items.filter(item => item.getType() === type);
  }

  filterByStatus(active) {
    if (active === 'all') return this.getAllItems();
    return this.#items.filter(item => item.isActive === active);
  }

  // ESTADÍSTICAS
  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(item => item.isActive).length;
    const inactive = total - active;

    const byType = this.#items.reduce((acc, item) => {
      const type = item.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total,
      active,
      inactive,
      byType,
      users: this.#users.length
    };
  }

  // USUARIOS
  addUser(user) {
    if (!(user instanceof Person)) {
      return { success: false, message: 'Debe ser instancia de Person' };
    }
    this.#users.push(user);
    return { success: true, message: 'Usuario registrado' };
  }

  findUserByEmail(email) {
    return this.#users.find(user => user.email === email) ?? null;
  }

  getAllUsers() {
    return [...this.#users];
  }
}

// ============================================
// INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================

// instancia principal
const system = new MainSystem();

// paquetes de prueba
const beach1 = new BeachPackage('Verano Playa', 'Cancún', 1200, 7, 20);
const mountain1 = new MountainPackage('Aventura Montaña', 'Andes', 1500, 10, 15);
const city1 = new CityPackage('Tour Urbano', 'París', 2000, 5, 30);

system.addItem(beach1);
system.addItem(mountain1);
system.addItem(city1);

// ============================================
// REFERENCIAS AL DOM
// ============================================

const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const statsContainer = document.getElementById('stats-container');
const filterType = document.getElementById('filter-type');
const filterStatus = document.getElementById('filter-status');
const searchInput = document.getElementById('search-input');

// referencias de modal paquetes
const addItemBtn = document.getElementById('add-item-btn');
const itemModal = document.getElementById('item-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const modalTitle = document.getElementById('modal-title');

// referencias de usuarios
const addUserBtn = document.getElementById('add-user-btn');
const userModal = document.getElementById('user-modal');
const closeUserModalBtn = document.getElementById('close-user-modal');
const cancelUserBtn = document.getElementById('cancel-user-btn');
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const searchUsersInput = document.getElementById('search-users');
const filterRoleSelect = document.getElementById('filter-role');


// ============================================
// TODO 8: FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Renderiza un elemento individual
 * @param {BaseItem} item - Elemento a renderizar
 * @returns {string} HTML del elemento
 */
const renderItem = item => {
  const info = item.getInfo();
  return `
    <div class="item-card" data-id="${item.id}">
      <div class="item-card-header">
        <h3 class="item-title">${item.name}</h3>
        <span class="item-type ${item.getType().toLowerCase()}">${item.getType()}</span>
      </div>
      <div class="item-details">
        <p>Destino: ${info.location}</p>
        <p>Precio: $${info.price}</p>
        <p>Duración: ${info.duration} días</p>
        <p>Plazas: ${info.seats}</p>
        <p>Estado: ${item.isActive ? 'Activo' : 'Inactivo'}</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-small btn-warning btn-toggle" data-id="${item.id}">
          ${item.isActive ? 'Desactivar' : 'Activar'}
        </button>
        <button class="btn btn-small btn-danger btn-delete" data-id="${item.id}">Eliminar</button>
      </div>
    </div>
  `;
};

/**
 * Renderiza la lista completa de elementos
 * @param {Array} items - Array de elementos
 */
const renderItems = (items = []) => {
  if (items.length === 0) {
    itemList.innerHTML = '<p class="empty">No hay elementos</p>';
    return;
  }
  itemList.innerHTML = items.map(renderItem).join('');
};

/**
 * Renderiza las estadísticas
 * @param {Object} stats - Objeto de estadísticas
 */
const renderStats = stats => {
  statsContainer.innerHTML = `
    <div class="stat-card">
      <span class="stat-value">${stats.total}</span>
      <span class="stat-label">Total Paquetes</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.active}</span>
      <span class="stat-label">Activos</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.inactive}</span>
      <span class="stat-label">Inactivos</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.users}</span>
      <span class="stat-label">Usuarios</span>
    </div>
  `;
};

// usuarios render
const renderUser = user => {
  const info = user.getInfo();
  return `
    <div class="member-card" data-id="${user.id}">
      <div class="member-name">${info.name}</div>
      <div class="member-email">${info.email}</div>
      <div class="member-role">${user.constructor.name}</div>
    </div>
  `;
};

const renderUsers = (users = []) => {
  if (users.length === 0) {
    userList.innerHTML = '<p class="empty">No hay usuarios</p>';
    return;
  }
  userList.innerHTML = users.map(renderUser).join('');
};

// ============================================
// TODO 9: EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();
  const name = document.getElementById('item-name').value.trim();
  const location = document.getElementById('item-location').value.trim();
  const type = document.getElementById('item-type').value;
  const price = Number(document.getElementById('item-price').value);
  const duration = Number(document.getElementById('item-duration').value);
  const seats = Number(document.getElementById('item-seats').value);

  if (!name || !location || !type) return;

  let pkg;
  switch (type) {
    case 'BeachPackage':
      pkg = new BeachPackage(name, location, price, duration, seats);
      break;
    case 'MountainPackage':
      pkg = new MountainPackage(name, location, price, duration, seats);
      break;
    case 'CityPackage':
      pkg = new CityPackage(name, location, price, duration, seats);
      break;
    default:
      return;
  }

  system.addItem(pkg);
  handleFilterChange();
  renderStats(system.getStats());
  itemForm.reset();
  itemModal.style.display = 'none';
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  let filtered = system.getAllItems();
  const type = filterType.value;
  const status = filterStatus.value;
  const search = searchInput.value.trim().toLowerCase();

  if (type && type !== 'all') {
    filtered = filtered.filter(item => item.getType() === type);
  }
  if (status && status !== 'all') {
    const active = status === 'active';
    filtered = filtered.filter(item => item.isActive === active);
  }
  if (search) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(search));
  }

  renderItems(filtered);
};

/**
 * Maneja acciones en los elementos (toggle, delete)
 */
const handleItemAction = e => {
  const target = e.target;
  const itemId = target.dataset.id;
  if (!itemId) return;

  if (target.classList.contains('btn-toggle')) {
    const item = system.findItem(itemId);
    if (item.isActive) item.deactivate();
    else item.activate();
  }

  if (target.classList.contains('btn-delete')) {
    if (confirm('¿Eliminar este paquete?')) {
      system.removeItem(itemId);
    }
  }

  handleFilterChange();
  renderStats(system.getStats());
};

const handleUserFormSubmit = e => {
  e.preventDefault();
  const role = document.getElementById('user-role').value;
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  if (!name || !email || !role) return;
  let user;
  if (role === 'Agent') user = new Agent(name, email);
  else if (role === 'Client') user = new Client(name, email);
  else return;

  system.addUser(user);
  renderUsers(system.getAllUsers());
  renderStats(system.getStats());
  userForm.reset();
  userModal.style.display = 'none';
};

const handleUserFilterChange = () => {
  let usersArr = system.getAllUsers();
  const role = filterRoleSelect.value;
  const query = searchUsersInput.value.trim().toLowerCase();
  if (role && role !== 'all') {
    usersArr = usersArr.filter(u => u.constructor.name === role);
  }
  if (query) {
    usersArr = usersArr.filter(u => u.name.toLowerCase().includes(query));
  }
  renderUsers(usersArr);
};

// ============================================
// EVENT LISTENERS
// ============================================

// el formulario
itemForm.addEventListener('submit', handleFormSubmit);
// filtros y búsqueda
filterType.addEventListener('change', handleFilterChange);
filterStatus.addEventListener('change', handleFilterChange);
searchInput.addEventListener('input', handleFilterChange);
// acciones sobre paquetes
itemList.addEventListener('click', handleItemAction);

// modal abrir / cerrar
addItemBtn.addEventListener('click', () => {
  itemModal.style.display = 'block';
  modalTitle.textContent = 'Agregar Paquete';
});
closeModalBtn.addEventListener('click', () => {
  itemModal.style.display = 'none';
});
cancelBtn.addEventListener('click', () => {
  itemModal.style.display = 'none';
});

// usuarios: abrir/cerrar modal y formularios
addUserBtn.addEventListener('click', () => {
  userModal.style.display = 'block';
  // opcional: cambiar título si se desea
});
closeUserModalBtn.addEventListener('click', () => {
  userModal.style.display = 'none';
});
cancelUserBtn.addEventListener('click', () => {
  userModal.style.display = 'none';
});

// listeners para usuarios (form, filtros, búsqueda)
userForm.addEventListener('submit', handleUserFormSubmit);
searchUsersInput.addEventListener('input', handleUserFilterChange);
filterRoleSelect.addEventListener('change', handleUserFilterChange);

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  renderItems(system.getAllItems());
  renderStats(system.getStats());
  renderUsers(system.getAllUsers());
  console.log('✅ Sistema inicializado correctamente');
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// CLASES Y HERENCIA:
// ✓ Clase base con campos privados
// ✓ Mínimo 3 clases derivadas con extends
// ✓ Uso correcto de super() en constructores
// ✓ Método getInfo() implementado en cada clase derivada
//
// ENCAPSULACIÓN:
// ✓ Todos los campos son privados (#)
// ✓ Getters para acceso a propiedades
// ✓ Setters con validación donde corresponda
//
// CARACTERÍSTICAS MODERNAS:
// ✓ Static block en clase principal
// ✓ Métodos estáticos de utilidad
// ✓ Uso de crypto.randomUUID() para IDs
//
// CÓDIGO:
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
// ✓ Nombres de clases adaptados a mi dominio
// ✓ Sin copiar implementación de otros compañeros
