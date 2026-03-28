// ============================================
// PROYECTO SEMANA 04: Generador de Mensajes
// Sistema de Gestión de Agencias de Viajes
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// nombre del dominio asignado
const DOMAIN_NAME = "Sistema de Gestión de Agencias de Viajes";

// nombre del servicio principal con espacios para poder transformarlo
const rawEntityName = "  Flight Booking  ";

// tipo de servicio
const entityCategory = "Transport";

// codigo identificador del servicio
const entityCode = "AGT-3407187";

// descripcion del servicio
const entityDescription = "Reserva de tiquetes aéreos nacionales e internacionales para viajeros frecuentes.";

// precio base del tiquete
const mainValue = 850_000;

// si el servicio esta disponible
const isActive = true;


// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================

// limpiar espacios del nombre con trim()
const entityName = rawEntityName.trim();

// nombre en mayusculas para el encabezado
const entityNameUpper = entityName.toUpperCase();

// nombre en minusculas para referencias internas
const entityNameLower = entityName.toLowerCase();

// extraer prefijo del codigo con slice()
const codePrefix = entityCode.slice(0, 3);

// reemplazar guion del codigo por espacio para mostrarlo diferente
const formattedCode = entityCode.replace("-", " — ");


// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================

// verificar si el codigo empieza con el prefijo de la agencia
const hasValidPrefix = entityCode.startsWith(codePrefix);

// verificar si la descripcion menciona tiquetes
const descriptionIsRelevant = entityDescription.includes("tiquetes");

// verificar si el codigo termina con los digitos de la ficha
const hasValidSuffix = entityCode.endsWith("187");


// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================

const separator = "=".repeat(45);
const subSeparator = "-".repeat(45);

// ficha multilínea con todos los datos del servicio
const mainCard = `
${separator}
  ${DOMAIN_NAME.toUpperCase()}
${separator}
Nombre:      ${entityNameUpper}
Categoría:   ${entityCategory}
Código:      ${formattedCode}
Prefijo:     ${codePrefix}
Precio:      $${mainValue}
Estado:      ${isActive ? "Activo" : "Inactivo"}

${subSeparator}
Descripción:
${entityDescription}
${separator}
`;

console.log(mainCard);


// ============================================
// SECCIÓN 5: Validaciones
// ============================================

console.log("--- Validaciones ---");
console.log(`¿Código empieza con '${codePrefix}'?: ${hasValidPrefix}`);
console.log(`¿Descripción contiene 'tiquetes'?: ${descriptionIsRelevant}`);
console.log(`¿Código termina con '187'?: ${hasValidSuffix}`);
console.log("");


// ============================================
// SECCIÓN 6: Mensaje de notificación corto
// ============================================

console.log("--- Notificación ---");

// mensaje corto tipo alerta para el sistema
const notification = `📢 Nuevo servicio disponible: ${entityName} (${entityCode})`;
console.log(notification);
console.log("");