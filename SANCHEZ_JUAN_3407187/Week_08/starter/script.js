// ============================================
// SEMANA 08 — PROYECTO: Gestión de Inventario
// Dominio: Sistema de Gestión de Agencias de Viajes
// ============================================

const DOMAIN_NAME = "Agency Travel Hub";
const VALUE_LABEL = "servicios";

// ============================================
// 1. ARRAY INICIAL — inventario de servicios
// ============================================

// servicios principales que ofrece la agencia
const services = [
  { id: 1, name: "Flight Booking",     category: "transport",     price: 850_000, rating: 4.8, active: true  },
  { id: 2, name: "Hotel Reservations", category: "accommodation", price: 620_000, rating: 4.6, active: true  },
  { id: 3, name: "Package Tours",      category: "package",       price: 2_500_000, rating: 4.9, active: true  },
  { id: 4, name: "Travel Insurance",   category: "insurance",     price: 180_000, rating: 4.3, active: true  },
  { id: 5, name: "Car Rental",         category: "transport",     price: 320_000, rating: 4.1, active: false },
  { id: 6, name: "Visa Assistance",    category: "support",       price: 150_000, rating: 4.0, active: true  },
];

// ============================================
// 2. FUNCIONES DE GESTIÓN
// ============================================

// agrega un nuevo servicio al inventario
const addService = (newService) => {
  services.push(newService);
  console.log(`  ✅ Agregado: ${newService.name}`);
};

// elimina el último servicio del inventario
const removeLastService = () => {
  const removed = services.pop();
  console.log(`  🗑️  Eliminado (último): ${removed.name}`);
  return removed;
};

// agrega un servicio prioritario al inicio del inventario
const addPriorityService = (priorityService) => {
  services.unshift(priorityService);
  console.log(`  ⭐ Servicio prioritario agregado: ${priorityService.name}`);
};

// elimina un servicio por su posicion en el array
const removeByIndex = (index) => {
  const removed = services.splice(index, 1);
  console.log(`  🗑️  Eliminado (posición ${index}): ${removed[0].name}`);
};

// retorna solo los servicios activos
const getActiveServices = () =>
  services.filter((service) => service.active === true);

// busca un servicio por nombre
const findByName = (name) =>
  services.find((service) => service.name === name);

// formatea un servicio para mostrar en el reporte
const formatService = (service) =>
  `[${service.id}] ${service.name} — ${service.category} — $${service.price.toLocaleString()} — ⭐${service.rating} — ${service.active ? "Activo" : "Inactivo"}`;

// ============================================
// 3. REPORTE
// ============================================

console.log(`\n${"=".repeat(55)}`);
console.log(`📦 GESTIÓN DE ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"=".repeat(55)}\n`);

// estado inicial del inventario
console.log(`📋 Inventario inicial (${services.length} ${VALUE_LABEL}):`);
services.forEach((service) => {
  console.log(`  ${formatService(service)}`);
});

console.log("\n--- Operaciones de mutación ---\n");

// agregar un nuevo servicio al final
addService({ id: 7, name: "Cruise Booking", category: "package", price: 4_200_000, rating: 4.7, active: true });

// agregar un servicio prioritario al inicio
addPriorityService({ id: 0, name: "VIP Concierge", category: "support", price: 500_000, rating: 5.0, active: true });

// eliminar el servicio en la posicion 3
removeByIndex(3);

// eliminar el ultimo servicio
removeLastService();

console.log("\n--- Inventario después de mutaciones ---\n");
services.forEach((service) => {
  console.log(`  ${formatService(service)}`);
});

console.log("\n--- Búsqueda y filtrado ---\n");

// buscar un servicio especifico por nombre
const found = findByName("Package Tours");
console.log(`  🔍 Búsqueda "Package Tours": ${found ? found.name + " — $" + found.price.toLocaleString() : "No encontrado"}`);

// verificar si hay algun servicio de tipo insurance
const hasInsurance = services.map((s) => s.category).includes("insurance");
console.log(`  🔎 ¿Hay servicios de insurance?: ${hasInsurance}`);

// mostrar servicios activos
const activeServices = getActiveServices();
console.log(`\n  ✅ Servicios activos (${activeServices.length}):`);
activeServices.forEach((service) => {
  console.log(`    — ${service.name}`);
});

console.log("\n--- Transformación con map ---\n");

// lista de solo los nombres de los servicios
const serviceNames = services.map((service) => service.name);
console.log(`  📝 Nombres: ${serviceNames.join(", ")}`);

// precios con 10% de descuento usando map
const discountedPrices = services.map((service) => ({
  name: service.name,
  discountedPrice: +(service.price * 0.9).toFixed(0)
}));
console.log("  💸 Precios con 10% descuento:");
discountedPrices.forEach((item) => {
  console.log(`    — ${item.name}: $${item.discountedPrice.toLocaleString()}`);
});

console.log("\n--- Spread operator ---\n");

// copia del inventario sin modificar el original
const servicesCopy = [...services];
servicesCopy.push({ id: 99, name: "Test Service", category: "test", price: 0, rating: 0, active: false });
console.log(`  📋 Copia con elemento extra: ${servicesCopy.length} ${VALUE_LABEL} (original: ${services.length})`);

console.log("\n--- Resumen final ---\n");
console.log(`  Total en inventario:  ${services.length} ${VALUE_LABEL}`);
console.log(`  Activos:              ${activeServices.length}`);
console.log(`  Inactivos:            ${services.length - activeServices.length}`);

// precio promedio de los servicios
const totalPrice = services.reduce((acc, s) => acc + s.price, 0);
const avgPrice = Math.round(totalPrice / services.length);
console.log(`  Precio promedio:      $${avgPrice.toLocaleString()}`);

console.log(`\n${"=".repeat(55)}`);
console.log("✅ Reporte completado");
console.log(`${"=".repeat(55)}\n`);
