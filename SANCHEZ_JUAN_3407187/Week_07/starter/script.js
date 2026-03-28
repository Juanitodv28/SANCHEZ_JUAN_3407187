// ============================================
// PROYECTO SEMANA 07 — Librería de Funciones
// Dominio: Sistema de Gestión de Agencias de Viajes
// ============================================

"use strict";

// ============================================
// SECCIÓN 1: Constantes y datos del dominio
// ============================================

const DOMAIN_NAME = "Agency Travel Hub";
const VALUE_LABEL  = "popularidad";
const CURRENCY     = "COP";

// servicios que ofrece la agencia con su informacion principal
const services = [
  { id: 1, name: "Flight Booking",     category: "transport",     value: 92, active: true  },
  { id: 2, name: "Hotel Reservations", category: "accommodation", value: 89, active: true  },
  { id: 3, name: "Package Tours",      category: "package",       value: 85, active: true  },
  { id: 4, name: "Travel Insurance",   category: "insurance",     value: 78, active: true  },
  { id: 5, name: "Car Rental",         category: "transport",     value: 72, active: false },
  { id: 6, name: "Visa Assistance",    category: "support",       value: 65, active: true  },
  { id: 7, name: "Cruise Booking",     category: "package",       value: 60, active: false },
];


// ============================================
// SECCIÓN 2: Función de formato
// ============================================

// formatea un servicio como una linea lista para mostrar en consola
const formatService = (service) =>
  `✈️  ${service.name} [${service.category}] — ${VALUE_LABEL}: ${service.value}% — ${service.active ? "Activo" : "Inactivo"}`;


// ============================================
// SECCIÓN 3: Función de cálculo (pura)
// ============================================

// calcula el precio final de un servicio aplicando un porcentaje de descuento
const calculateFinalPrice = (basePrice, discountPct = 0) =>
  +(basePrice * (1 - discountPct / 100)).toFixed(0);


// ============================================
// SECCIÓN 4: Función de validación
// ============================================

// verifica si un servicio esta activo y tiene popularidad aceptable (mayor a 70)
const isServiceAvailable = (service) =>
  service.active === true && service.value > 70;


// ============================================
// SECCIÓN 5: Función con parámetro por defecto
// ============================================

// genera un resumen del servicio con moneda y etiqueta por defecto
function formatServiceSummary(service, label = VALUE_LABEL, currency = CURRENCY) {
  const price = calculateFinalPrice(850_000, 100 - service.value);
  return `${service.name} — ${label}: ${service.value}% — Precio estimado: ${currency} ${price}`;
}


// ============================================
// SECCIÓN 6: Reporte usando las funciones
// ============================================

console.log(`\n${"═".repeat(50)}`);
console.log(`   REPORTE — ${DOMAIN_NAME}`);
console.log(`${"═".repeat(50)}`);

// listado completo usando formatService como callback de formato
console.log("\n📋 Listado de servicios:");
let lineNumber = 1;
for (const service of services) {
  console.log(`  ${lineNumber}. ${formatService(service)}`);
  lineNumber++;
}

// contar servicios disponibles usando isServiceAvailable
let availableCount = 0;
for (const service of services) {
  if (isServiceAvailable(service)) availableCount++;
}
console.log(`\n✅ Servicios disponibles (activos y populares): ${availableCount} / ${services.length}`);

// acumular popularidad total y calcular promedio
let totalValue = 0;
for (const service of services) {
  totalValue += service.value;
}
const averageValue = calculateFinalPrice(totalValue / services.length, 0);
console.log(`📊 Promedio de ${VALUE_LABEL}: ${averageValue}%`);

// resumen de cada servicio usando formatServiceSummary con parametro por defecto
console.log("\n💼 Resumen de precios estimados:");
for (const service of services) {
  console.log(`  — ${formatServiceSummary(service)}`);
}

console.log(`\n${"═".repeat(50)}\n`);
