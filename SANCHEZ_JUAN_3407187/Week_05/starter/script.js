// ============================================
// PROYECTO SEMANA 05: Clasificador
// Sistema de Gestión de Agencias de Viajes
// ============================================

// ============================================
// SECCIÓN 1: Datos del elemento del dominio
// ============================================

// nombre del servicio
const elementName = "Flight Booking";

// estado actual del servicio
const elementStatus = "active";

// porcentaje de ocupacion actual para clasificar
const elementValue = 78;

// tipo de servicio
const elementType = "transport";

// informacion adicional opcional del servicio (puede ser null en algunos casos)
const elementInfo = {
  detail: "Reservas disponibles para rutas nacionales e internacionales",
  location: "Calle 72 #10-45, Bogotá"
};


// ============================================
// SECCIÓN 2: Clasificación con if / else if / else
// ============================================

// clasificar el servicio segun su porcentaje de ocupacion
let classification;

if (elementValue >= 90) {
  classification = "Demanda crítica";
} else if (elementValue >= 60) {
  classification = "Demanda alta";
} else if (elementValue >= 30) {
  classification = "Demanda media";
} else {
  classification = "Demanda baja";
}


// ============================================
// SECCIÓN 3: Estado binario con operador ternario
// ============================================

// determinar si el servicio esta activo o inactivo
const statusLabel = elementStatus === "active" ? "Activo" : "Inactivo";


// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================

// asignar etiqueta segun el tipo de servicio
let typeLabel;

switch (elementType) {
  case "transport":
    typeLabel = "Transporte aéreo";
    break;
  case "accommodation":
    typeLabel = "Alojamiento";
    break;
  case "package":
    typeLabel = "Paquete turístico";
    break;
  case "insurance":
    typeLabel = "Seguro de viaje";
    break;
  default:
    typeLabel = "Tipo desconocido";
}


// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================

// si el nombre es null usar un valor por defecto
const displayName = elementName ?? "Sin nombre";

// si no hay detalle en elementInfo usar mensaje por defecto
const infoDetail = elementInfo?.detail ?? "Sin información adicional";


// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================

// acceder a la ubicacion de forma segura por si elementInfo es null
const safeLocation = elementInfo?.location ?? "Ubicación no especificada";


// ============================================
// SECCIÓN 7: Ficha de salida
// ============================================

console.log("=".repeat(45));
console.log("  FICHA DE CLASIFICACIÓN — AGENCY TRAVEL HUB");
console.log("=".repeat(45));
console.log(`Nombre:          ${displayName}`);
console.log(`Estado:          ${statusLabel}`);
console.log(`Ocupación:       ${elementValue}%`);
console.log(`Clasificación:   ${classification}`);
console.log(`Tipo:            ${typeLabel}`);
console.log(`Ubicación:       ${safeLocation}`);
console.log(`Detalle:         ${infoDetail}`);
console.log("=".repeat(45));