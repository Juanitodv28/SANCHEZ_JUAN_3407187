// ============================================
// PROYECTO SEMANA 06: Reporte con Bucles
// Dominio: Sistema de Gestión de Agencias de Viajes
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// lista de servicios que ofrece la agencia
const services = [
  { name: "Flight Booking",      category: "transport",     value: 92 },
  { name: "Hotel Reservations",  category: "accommodation", value: 89 },
  { name: "Package Tours",       category: "package",       value: 85 },
  { name: "Travel Insurance",    category: "insurance",     value: 78 },
  { name: "Car Rental",          category: "transport",     value: 72 },
  { name: "Visa Assistance",     category: "support",       value: 65 },
  { name: "Cruise Booking",      category: "package",       value: 60 },
  { name: "Airport Transfer",    category: "transport",     value: 55 },
];

// categorias de servicios disponibles en la agencia
const categories = ["transport", "accommodation", "package", "insurance", "support"];

// etiqueta del valor numerico (popularidad del servicio)
const valueLabel = "popularidad";


// ============================================
// SECCIÓN 2: Listado completo con for...of
// ============================================
console.log("=== LISTADO COMPLETO ===");

let lineNumber = 0;

for (const service of services) {
  lineNumber++;
  console.log(`${lineNumber}. ${service.name} — ${service.category} — ${valueLabel}: ${service.value}%`);
}

console.log("");


// ============================================
// SECCIÓN 3: Contadores por categoría
// ============================================
console.log("=== CONTEO POR CATEGORÍA ===");

for (const category of categories) {
  let count = 0;

  for (const service of services) {
    if (service.category === category) count++;
  }

  // saltar categorias sin servicios
  if (count === 0) continue;

  console.log(`${category}: ${count} servicio(s)`);
}

console.log("");


// ============================================
// SECCIÓN 4: Totales y promedio (acumulador)
// ============================================
console.log("=== ESTADÍSTICAS ===");

let totalValue = 0;

for (const service of services) {
  totalValue += service.value;
}

const averageValue = services.length > 0 ? totalValue / services.length : 0;

console.log(`Total ${valueLabel}: ${totalValue}`);
console.log(`Promedio ${valueLabel}: ${averageValue.toFixed(1)}%`);

console.log("");


// ============================================
// SECCIÓN 5: Máximo y mínimo
// ============================================
console.log("=== MÁXIMO Y MÍNIMO ===");

let maxService = services[0] ?? null;
let minService = services[0] ?? null;

// buscar el servicio con mayor y menor popularidad
let index = 1;
while (index < services.length) {
  if (services[index].value > maxService.value) {
    maxService = services[index];
  }
  if (services[index].value < minService.value) {
    minService = services[index];
  }
  index++;
}

console.log(`Mayor ${valueLabel}: ${maxService?.name} (${maxService?.value}%)`);
console.log(`Menor ${valueLabel}: ${minService?.name} (${minService?.value}%)`);

console.log("");


// ============================================
// SECCIÓN 6: Reporte numerado con for clásico
// ============================================
console.log("=== REPORTE DETALLADO ===");

for (let i = 0; i < services.length; i++) {
  const service = services[i];

  // comparar contra el promedio
  const comparison = service.value >= averageValue ? "sobre el promedio" : "bajo el promedio";

  console.log(`${i + 1}. ${service.name} (${service.value}%) — ${comparison}`);
}

console.log("");
console.log("=== FIN DEL REPORTE ===");
