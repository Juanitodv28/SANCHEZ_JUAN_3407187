// ============================================
// PROYECTO SEMANA 02: Ficha de Datos del Dominio
// ============================================

// ============================================
// SECCIÓN 1: DATOS PRINCIPALES
// ============================================

const DOMAIN_NAME = "Sistema de Gestión de Agencias de Viajes";

// nombre del servicio principal
const serviceName = "Flight Booking";

// tipo de servicio
const serviceCategory = "Transport";

// precio base del tiquete
const basePrice = 850_000;

// si el servicio esta disponible para reservar
const isAvailable = true;

// patrocinador actual (no asignado todavia)
const currentSponsor = null;


// ============================================
// SECCIÓN 2: MOSTRAR FICHA DE DATOS
// ============================================

console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");
console.log("");

console.log(`Nombre:       ${serviceName}`);
console.log(`Categoría:    ${serviceCategory}`);
console.log(`Precio base:  $${basePrice}`);
console.log(`Disponible:   ${isAvailable}`);
console.log("");


// ============================================
// SECCIÓN 3: VERIFICACIÓN DE TIPOS CON typeof
// ============================================

console.log("--- Tipos de datos ---");
console.log("typeof serviceName:   ", typeof serviceName);
console.log("typeof basePrice:     ", typeof basePrice);
console.log("typeof isAvailable:   ", typeof isAvailable);
console.log("");


// ============================================
// SECCIÓN 4: CONVERSIONES EXPLÍCITAS
// ============================================

console.log("--- Conversiones ---");

// precio convertido a string para mostrarlo con formato
const priceAsText = String(basePrice);
console.log("Precio como texto:       ", priceAsText);
console.log("typeof precio convertido:", typeof priceAsText);
console.log("");


// ============================================
// SECCIÓN 5: VALOR NULL
// ============================================

console.log("--- Valor nulo ---");
console.log("Patrocinador actual:", currentSponsor);
console.log("typeof null:        ", typeof currentSponsor);   // "object" ← bug histórico de JS
console.log("¿Es null?:          ", currentSponsor === null);
console.log("");


// ============================================
// CIERRE
// ============================================

console.log("===========================");
console.log("FIN DE FICHA");
console.log("===========================");
