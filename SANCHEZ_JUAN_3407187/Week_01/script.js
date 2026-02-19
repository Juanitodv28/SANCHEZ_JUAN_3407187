/* ============================================
   SISTEMA DE GESTIÓN DE AGENCIAS DE VIAJES
   Implementación adaptada para la semana 01
   ============================================ */

// Datos principales de la entidad: Travel Agency
const entityData = {
  name: 'AGENCY TRAVEL HUB',
  description: 'Gestión integral de viajes, reservas y paquetes turísticos personalizados.',
  code: 'AGT-3407187',
  contact: {
    email: 'contact@agencytravelhub.co',
    phone: '+57 312 345 6789',
    address: 'Calle 72 #10-45, Bogotá, Colombia'
  },
  // Services ofrecidos por la agencia (name + level como popularidad/competencia)
  items: [
    { name: 'Flight Booking', level: 92, category: 'Transport' },
    { name: 'Hotel Reservations', level: 89, category: 'Accommodation' },
    { name: 'Package Tours', level: 85, category: 'Packages' },
    { name: 'Travel Insurance', level: 78, category: 'Insurance' },
    { name: 'Car Rental', level: 72, category: 'Transport' },
    { name: 'Visa Assistance', level: 65, category: 'Support' }
  ],
  // Enlaces útiles
  links: [
    { platform: 'Website', url: 'https://viajessanchez.example', icon: '🌐' },
    { platform: 'Facebook', url: 'https://facebook.com/viajessanchez', icon: '📘' },
    { platform: 'Instagram', url: 'https://instagram.com/viajessanchez', icon: '📸' }
  ],
  // Estadísticas de la agencia
  stats: {
    totalBookings: 12540,
    activeOffers: 12,
    rating: 4.6,
    agents: 8
  }
};

// =====================
// Referencias al DOM
// =====================
const entityName = document.getElementById('entity-name');
const entityDescription = document.getElementById('entity-description');
const entityCode = document.getElementById('entity-code');
const itemsList = document.getElementById('items-list');
const statsContainer = document.getElementById('stats');
const linksContainer = document.getElementById('links');
const themeToggle = document.getElementById('theme-toggle');
const copyBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// =====================
// Render básico
// =====================
const renderBasicInfo = () => {
  // Destructuring de entityData
  const { name, description, code, contact } = entityData;

  if (entityName) entityName.textContent = name;
  if (entityDescription) entityDescription.innerHTML = `<p>${description}</p>`;
  if (entityCode) entityCode.textContent = code;

  // Si se desea mostrar contacto en la interfaz, se puede crear aquí
  // Ejemplo simple: añadir contacto debajo de la descripción si existe el elemento
  const contactEl = document.getElementById('entity-contact');
  if (contactEl) {
    const { email, phone, address } = contact;
    contactEl.innerHTML = `
      <div class="contact-item">${email}</div>
      <div class="contact-item">${phone}</div>
      <div class="contact-item">${address}</div>
    `;
  }
};

// =====================
// Render items (services)
// =====================
const renderItems = (showAll = false) => {
  const { items } = entityData;
  if (!itemsList) return;

  const itemsToShow = showAll ? items : items.slice(0, 4);

  const itemsHtml = itemsToShow
    .map(({ name, level, category }) => `
      <div class="item">
        <div class="item-name">${name}</div>
        <div class="item-meta">${category}</div>
        <div class="item-level">
          <span>${level}%</span>
          <div class="level-bar">
            <div class="level-fill" style="width: ${level}%"></div>
          </div>
        </div>
      </div>
    `)
    .join('');

  itemsList.innerHTML = itemsHtml;
};

// =====================
// Render links
// =====================
const renderLinks = () => {
  const { links } = entityData;
  if (!linksContainer) return;

  const linksHtml = links
    .map(({ platform, url, icon }) => `
      <a class="link-item" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${platform}">
        <span class="link-icon">${icon}</span>
        <span class="link-label">${platform}</span>
      </a>
    `)
    .join('');

  linksContainer.innerHTML = linksHtml;
};

// =====================
// Render stats
// =====================
const renderStats = () => {
  const { stats } = entityData;
  if (!statsContainer) return;

  const statsArray = [
    { label: 'Reservas totales', value: stats.totalBookings },
    { label: 'Ofertas activas', value: stats.activeOffers },
    { label: 'Valoración', value: stats.rating },
    { label: 'Agentes', value: stats.agents }
  ];

  const statsHtml = statsArray
    .map(stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `)
    .join('');

  statsContainer.innerHTML = statsHtml;
};

// =====================
// Avatar image loader with fallback
// =====================
const setAvatarImage = () => {
  const avatar = document.getElementById('avatarImg');
  if (!avatar) return;

  // Unsplash random travel image (may be blocked offline)
  const unsplashUrl = 'https://source.unsplash.com/collection/190727/600x600';

  // Fallback SVG data URI (simple travel icon)
  const fallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 24 24" fill="none">
      <rect width="100%" height="100%" fill="#cfe9ff" />
      <g transform="translate(4,4) scale(0.75)">
        <path d="M12 2l2.5 6H7.5L10 2h2z" fill="#60a5fa" />
        <circle cx="12" cy="16" r="4" fill="#2563eb" />
        <path d="M2 20h20v2H2z" fill="#1e293b" opacity="0.08" />
      </g>
    </svg>
  `);

  avatar.src = unsplashUrl;
  avatar.alt = 'Travel image';

  // If loading fails (offline or blocked), use fallback
  avatar.onerror = () => {
    avatar.onerror = null;
    avatar.src = fallback;
  };
};

// =====================
// Tema claro/oscuro
// =====================
const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme ?? 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = newTheme;
  if (themeToggle) themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// =====================
// Copiar información
// =====================
const copyInfo = async () => {
  const { name, description, contact, code } = entityData;
  const infoText = `
${name}
Código: ${code}
${description}
Contacto: ${contact.email} | ${contact.phone}
Dirección: ${contact.address}
`.trim();

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(infoText);
    } else {
      // Fallback por compatibilidad
      const textarea = document.createElement('textarea');
      textarea.value = infoText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showToast('¡Información copiada al portapapeles!');
  } catch (err) {
    showToast('Error al copiar la información');
  }
};

// =====================
// Toast de notificación
// =====================
const showToast = message => {
  if (!toast || !toastMessage) {
    // Fallback si no existe el elemento toast
    console.info(message);
    return;
  }

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// =====================
// Mostrar / ocultar items
// =====================
let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  if (toggleItemsBtn) toggleItemsBtn.textContent = showingAllItems ? 'Mostrar menos' : 'Mostrar más';
};

// =====================
// Event listeners
// =====================
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (copyBtn) copyBtn.addEventListener('click', copyInfo);
if (toggleItemsBtn) toggleItemsBtn.addEventListener('click', handleToggleItems);

// =====================
// Inicialización
// =====================
const init = () => {
  loadTheme();
  setAvatarImage();
  renderBasicInfo();
  renderItems(false);
  renderLinks();
  renderStats();
  console.log('✅ Aplicación inicializada correctamente');
};

document.addEventListener('DOMContentLoaded', init);

/*
  Checklist: usa sólo const/let, template literals, arrow functions y destructuring.
  Comentarios en español y nombres técnicos en inglés.
*/
