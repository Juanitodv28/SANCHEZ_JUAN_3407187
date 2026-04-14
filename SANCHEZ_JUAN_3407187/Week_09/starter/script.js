// ============================================
// PROYECTO SEMANA 09: Catálogo de Elementos
// Dominio: Sistema de Gestión de Agencias de Viajes
// ============================================

// ============================================
// CONFIGURACIÓN DEL DOMINIO
// ============================================

const DOMAIN_NAME = "Agency Travel Hub";
const VALUE_LABEL = "servicios";

// ============================================
// DATOS DEL CATÁLOGO
// ============================================

// catalogo de servicios de la agencia con propiedades detalladas
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
// INSPECCIÓN CON Object.*
// ============================================

// muestra claves y valores de un servicio usando Object.entries()
const inspectItem = (item) => {
  console.log(`\n📋 Detalle de: ${item.name}`);
  Object.entries(item).forEach(([key, value]) => {
    console.log(`  ${key.padEnd(12)}: ${value}`);
  });
};

// calcula estadisticas de una propiedad numerica del catalogo
const calculateStats = (numericKey) => {
  const values = items.map((item) => item[numericKey]);
  const total   = values.reduce((acc, v) => acc + v, 0);
  const average = Math.round(total / values.length);
  const max     = Math.max(...values);
  const min     = Math.min(...values);

  console.log(`\n📊 Estadísticas de "${numericKey}":`);
  console.log(`  Total:   ${total.toLocaleString()}`);
  console.log(`  Promedio: ${average.toLocaleString()}`);
  console.log(`  Máximo:  ${max.toLocaleString()}`);
  console.log(`  Mínimo:  ${min.toLocaleString()}`);
};

// ============================================
// VERIFICACIÓN CON Object.hasOwn()
// ============================================

// muestra el detalle del servicio incluyendo promoCode solo si existe
const showWithOptionals = (item) => {
  console.log(`\n→ ${item.name} — $${item.price.toLocaleString()} — ${item.active ? "Activo" : "Inactivo"}`);

  // promoCode es opcional, no todos los servicios lo tienen
  if (Object.hasOwn(item, "promoCode")) {
    console.log(`  🏷️  Código promocional: ${item.promoCode}`);
  } else {
    console.log(`  Sin código promocional`);
  }
};

// ============================================
// ITERACIÓN CON for...in
// ============================================

// imprime todas las propiedades de un objeto usando for...in
const printAllProperties = (item) => {
  console.log(`\n🔍 Propiedades de "${item.name}":`);
  for (const key in item) {
    if (Object.hasOwn(item, key)) {
      console.log(`  ${key}: ${item[key]}`);
    }
  }
};

// ============================================
// SPREAD OPERATOR
// ============================================

// crea un nuevo objeto con los cambios aplicados sin modificar el original
const updateItem = (item, changes) => {
  return { ...item, ...changes };
};

// ============================================
// OPERACIONES CON EL ARRAY
// ============================================

// retorna solo los servicios activos
const getAvailable = () =>
  items.filter((item) => item.active === true);

// busca un servicio por su id
const findById = (id) =>
  items.find((item) => item.id === id);

// agrega precio con IVA del 19% a cada servicio
const addCalculatedProp = () =>
  items.map((item) => ({
    ...item,
    priceWithTax: Math.round(item.price * 1.19)
  }));

// ordena los servicios por precio sin mutar el array original
const sortByNumericProp = (ascending = true) =>
  [...items].sort((a, b) =>
    ascending ? a.price - b.price : b.price - a.price
  );

// ============================================
// REPORTE FINAL
// ============================================

const buildReport = () => {
  console.log("\n" + "=".repeat(50));
  console.log(`📦 CATÁLOGO: ${DOMAIN_NAME.toUpperCase()}`);
  console.log("=".repeat(50));

  const available = getAvailable();
  console.log(`\nTotal de ${VALUE_LABEL}:   ${items.length}`);
  console.log(`Servicios activos:    ${available.length}`);
  console.log(`Servicios inactivos:  ${items.length - available.length}`);

  // estadisticas de precios
  const prices  = items.map((s) => s.price);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  console.log(`\nPrecio promedio:  $${avgPrice.toLocaleString()}`);
  console.log(`Precio más alto:  $${Math.max(...prices).toLocaleString()}`);
  console.log(`Precio más bajo:  $${Math.min(...prices).toLocaleString()}`);

  // listado ordenado por precio de mayor a menor
  console.log("\n📋 Servicios ordenados por precio (mayor a menor):");
  sortByNumericProp(false).forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.name.padEnd(22)} $${item.price.toLocaleString()}`);
  });

  console.log("\n" + "=".repeat(50));
};

// ============================================
// EJECUCIÓN PRINCIPAL
// ============================================

console.log(`\n🚀 Iniciando catálogo: ${DOMAIN_NAME}`);
console.log(`   Total de ${VALUE_LABEL}: ${items.length}`);

// 1. inspeccionar el primer servicio
inspectItem(items[0]);

// 2. estadisticas de precios
calculateStats("price");

// 3. mostrar todos con propiedad opcional
console.log("\n--- Servicios con código promocional ---");
items.forEach(showWithOptionals);

// 4. recorrer propiedades del primer servicio con for...in
printAllProperties(items[0]);

// 5. actualizar un servicio de forma inmutable
const updatedService = updateItem(items[4], { active: true, price: 350_000 });
console.log("\n--- Actualización inmutable (Car Rental) ---");
console.log(`  Original: active=${items[4].active}, price=${items[4].price.toLocaleString()}`);
console.log(`  Actualizado: active=${updatedService.active}, price=${updatedService.price.toLocaleString()}`);
console.log(`  Original sin cambios: active=${items[4].active}`);

// 6. servicios disponibles
const available = getAvailable();
console.log(`\n--- Servicios activos: ${available.length} ---`);
available.forEach((s) => console.log(`  ✅ ${s.name}`));

// 7. buscar por id
const found     = findById(3);
const notFound  = findById(99);
console.log(`\n--- Búsqueda por ID ---`);
console.log(`  ID 3: ${found?.name ?? "No encontrado"}`);
console.log(`  ID 99: ${notFound?.name ?? "No encontrado"}`);

// 8. precios con IVA
console.log("\n--- Precios con IVA (19%) ---");
addCalculatedProp().forEach((s) => {
  console.log(`  ${s.name.padEnd(22)} $${s.priceWithTax.toLocaleString()}`);
});

// 9. ordenados por precio ascendente
console.log("\n--- Ordenados por precio (menor a mayor) ---");
sortByNumericProp(true).forEach((s, i) => {
  console.log(`  ${i + 1}. ${s.name.padEnd(22)} $${s.price.toLocaleString()}`);
});

// 10. reporte final
buildReport();
