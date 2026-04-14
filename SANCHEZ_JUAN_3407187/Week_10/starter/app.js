// ============================================
// PROYECTO INTEGRADOR — ETAPA 0
// Semana 10 — JavaScript ES2023 Bootcamp
// Dominio: Sistema de Gestión de Agencias de Viajes
// ============================================

// ============================================
// SECCIÓN 1: Configuración y Constantes
// ============================================

const DOMAIN_NAME  = "Agency Travel Hub";
const VALUE_LABEL  = "servicios";
const CURRENCY     = "COP";
const TAX_RATE     = 0.19;

// limite maximo de servicios que puede tener el catalogo
const MAX_ITEMS    = 1_000;

// ============================================
// SECCIÓN 2: Datos — Array Principal
// ============================================

// catalogo de servicios de la agencia con todas sus propiedades
const items = [
  { id: 1, name: "Flight Booking",     category: "transport",     price: 850_000, rating: 4.8, active: true,  promoCode: "FLY15"    },
  { id: 2, name: "Hotel Reservations", category: "accommodation", price: 620_000, rating: 4.6, active: true,  promoCode: "HOTEL10"  },
  { id: 3, name: "Package Tours",      category: "package",       price: 2_500_000, rating: 4.9, active: true  },
  { id: 4, name: "Travel Insurance",   category: "insurance",     price: 180_000, rating: 4.3, active: true,  promoCode: "SAFE5"   },
  { id: 5, name: "Car Rental",         category: "transport",     price: 320_000, rating: 4.1, active: false },
  { id: 6, name: "Visa Assistance",    category: "support",       price: 150_000, rating: 4.0, active: true  },
  { id: 7, name: "Cruise Booking",     category: "package",       price: 4_200_000, rating: 4.7, active: true,  promoCode: "CRUISE20" },
];

// ============================================
// SECCIÓN 3: Funciones CRUD
// ============================================

// agrega un nuevo servicio al catalogo
const addItem = (item) => {
  if (items.length >= MAX_ITEMS) {
    console.log(`  ⚠️  Limite alcanzado: no se pueden agregar más de ${MAX_ITEMS} servicios.`);
    return;
  }
  items.push(item);
  console.log(`  ✅ Servicio agregado: ${item.name}`);
};

// busca un servicio por su id usando find
const findById = (id) =>
  items.find((item) => item.id === id);

// retorna solo los servicios activos
const getActive = () =>
  items.filter((item) => item.active === true);

// filtra servicios por el valor de cualquier campo
const filterByField = (field, value) =>
  items.filter((item) => item[field] === value);

// ============================================
// SECCIÓN 4: Funciones de Análisis
// ============================================

// actualiza un servicio de forma inmutable usando spread
const updateItem = (id, changes) =>
  items.map((item) =>
    item.id === id ? { ...item, ...changes } : item
  );

// calcula estadisticas de un campo numerico del catalogo
const calculateStats = (field) => {
  const values = items.map((item) => item[field]);
  const total  = values.reduce((acc, v) => acc + v, 0);
  const avg    = total / values.length;
  const min    = Math.min(...values);
  const max    = Math.max(...values);
  return { min, max, avg, total };
};

// ============================================
// SECCIÓN 5: Funciones de Display
// ============================================

// formatea un servicio en una linea alineada para el reporte
const formatItem = (item) => {
  const status    = item.active ? "✅" : "❌";
  const promo     = item?.promoCode ?? "—";
  const nameCol   = item.name.padEnd(24);
  const catCol    = item.category.padEnd(14);
  const priceCol  = `$${item.price.toLocaleString()}`.padStart(14);
  return `${status} [${item.id}] ${nameCol} ${catCol} ${priceCol}  ⭐${item.rating}  promo: ${promo}`;
};

// genera el reporte completo del dominio
const buildReport = () => {
  console.log("\n" + "=".repeat(65));
  console.log(`  📦 CATÁLOGO COMPLETO — ${DOMAIN_NAME.toUpperCase()}`);
  console.log("=".repeat(65));

  // listado completo ordenado por precio
  console.log("\n📋 Listado de servicios:");
  [...items]
    .sort((a, b) => a.price - b.price)
    .forEach((item) => console.log(`  ${formatItem(item)}`));

  // activos vs inactivos
  const active   = getActive();
  const inactive = items.length - active.length;
  console.log(`\n✅ Activos: ${active.length}  |  ❌ Inactivos: ${inactive}  |  Total: ${items.length}`);

  // estadisticas de precios
  const stats = calculateStats("price");
  console.log("\n📊 Estadísticas de precios:");
  console.log(`  Total:    ${CURRENCY} ${stats.total.toLocaleString()}`);
  console.log(`  Promedio: ${CURRENCY} ${Math.round(stats.avg).toLocaleString()}`);
  console.log(`  Mínimo:   ${CURRENCY} ${stats.min.toLocaleString()}`);
  console.log(`  Máximo:   ${CURRENCY} ${stats.max.toLocaleString()}`);

  // estadisticas de ratings
  const ratingStats = calculateStats("rating");
  console.log("\n⭐ Estadísticas de rating:");
  console.log(`  Promedio: ${ratingStats.avg.toFixed(2)}`);
  console.log(`  Mínimo:   ${ratingStats.min}`);
  console.log(`  Máximo:   ${ratingStats.max}`);

  // propiedades del primer elemento con Object.entries
  console.log(`\n🔍 Propiedades de "${items[0].name}":`);
  Object.entries(items[0]).forEach(([key, value]) => {
    console.log(`  ${key.padEnd(12)}: ${value}`);
  });

  // servicios con codigo promocional usando Object.hasOwn
  const withPromo = items.filter((item) => Object.hasOwn(item, "promoCode"));
  console.log(`\n🏷️  Servicios con código promocional (${withPromo.length}):`);
  withPromo.forEach((item) => {
    console.log(`  — ${item.name.padEnd(24)} código: ${item.promoCode}`);
  });

  console.log("\n" + "=".repeat(65));
  console.log(`  Total de ${VALUE_LABEL} en catálogo: ${items.length} / ${MAX_ITEMS}`);
  console.log("=".repeat(65) + "\n");
};

// ============================================
// SECCIÓN 6: Ejecución Principal
// ============================================

console.log("\n" + "=".repeat(65));
console.log(`  🚀 ${DOMAIN_NAME.toUpperCase()} — INICIANDO SISTEMA`);
console.log("=".repeat(65));
console.log(`  Total de ${VALUE_LABEL}: ${items.length} / ${MAX_ITEMS}\n`);

// paso 1: buscar por id
const found = findById(3);
console.log(`🔍 Búsqueda id=3:  ${found?.name ?? "no encontrado"}`);
const notFound = findById(99);
console.log(`🔍 Búsqueda id=99: ${notFound?.name ?? "no encontrado"}`);
console.log("");

// paso 2: listar activos
const activeServices = getActive();
console.log(`✅ Servicios activos (${activeServices.length}):`);
activeServices.forEach((item) => console.log(`  ${formatItem(item)}`));
console.log("");

// paso 3: filtrar por categoria
const transportServices = filterByField("category", "transport");
console.log(`🚗 Servicios de transporte (${transportServices.length}):`);
transportServices.forEach((item) => console.log(`  ${formatItem(item)}`));
console.log("");

// paso 4: actualizar con spread — activar Car Rental
const updatedCatalog = updateItem(5, { active: true, price: 350_000 });
const updatedCarRental = updatedCatalog.find((i) => i.id === 5);
console.log("✏️  Actualización inmutable — Car Rental:");
console.log(`  Original:    active=${items[4].active}, price=${items[4].price.toLocaleString()}`);
console.log(`  Actualizado: active=${updatedCarRental.active}, price=${updatedCarRental.price.toLocaleString()}`);
console.log("");

// paso 5: estadisticas de precios
const stats = calculateStats("price");
console.log("📊 Estadísticas de precios:");
console.log(`  min=${CURRENCY} ${stats.min.toLocaleString()}  max=${CURRENCY} ${stats.max.toLocaleString()}  avg=${CURRENCY} ${Math.round(stats.avg).toLocaleString()}`);
console.log("");

// paso 6: agregar nuevo servicio
addItem({ id: 8, name: "Airport Transfer", category: "transport", price: 95_000, rating: 3.9, active: true });
console.log("");

// paso 7: precios con IVA usando map
console.log(`💸 Precios con IVA (${TAX_RATE * 100}%):`);
items
  .map((item) => ({ name: item.name, priceWithTax: Math.round(item.price * (1 + TAX_RATE)) }))
  .forEach((item) => {
    console.log(`  ${item.name.padEnd(24)} ${CURRENCY} ${item.priceWithTax.toLocaleString()}`);
  });
console.log("");

// paso 8: clasificar servicios por precio usando switch
console.log("🏷️  Clasificación por precio:");
items.forEach((item) => {
  let tier;
  if (item.price >= 2_000_000) {
    tier = "Premium";
  } else if (item.price >= 500_000) {
    tier = "Estándar";
  } else {
    tier = "Económico";
  }
  console.log(`  ${item.name.padEnd(24)} → ${tier}`);
});
console.log("");

// paso 9: reporte completo
buildReport();
