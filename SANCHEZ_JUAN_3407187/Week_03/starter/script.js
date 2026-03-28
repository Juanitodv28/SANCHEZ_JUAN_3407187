// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// Sistema de Gestión de Agencias de Viajes
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// precio base de un tiquete aereo
const TICKET_PRICE = 850_000;

// precio de un paquete turistico completo
const PACKAGE_PRICE = 2_500_000;

// capacidad maxima de reservas por agente
const MAX_BOOKINGS_PER_AGENT = 50;

// numero de agentes activos
const TOTAL_AGENTS = 8;

// porcentaje de descuento por reserva anticipada
const EARLY_DISCOUNT = 0.15;

// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

// total de reservas que puede manejar la agencia
const maxCapacity = MAX_BOOKINGS_PER_AGENT * TOTAL_AGENTS;
console.log("Capacidad total de reservas:", maxCapacity);

// reservas actuales
const currentBookings = 312;

// reservas disponibles restantes
const availableBookings = maxCapacity - currentBookings;
console.log("Reservas disponibles:", availableBookings);

// ingreso total por tiquetes vendidos
const totalRevenue = TICKET_PRICE * currentBookings;
console.log("Ingresos por tiquetes:", totalRevenue);

// precio de tiquete con descuento anticipado
const discountedPrice = TICKET_PRICE - (TICKET_PRICE * EARLY_DISCOUNT);
console.log("Precio con descuento anticipado:", discountedPrice);

// porcentaje de ocupacion actual
const occupancyRate = (currentBookings / maxCapacity) * 100;
console.log("Porcentaje de ocupación:", occupancyRate + "%");

// sobrante al dividir reservas en grupos de 10
const remainder = currentBookings % 10;
console.log("Sobrante al dividir reservas en grupos de 10:", remainder);

console.log("");

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");

// acumulando ingresos del mes por tipo de servicio
let monthlyRevenue = 0;

// ingresos por tiquetes aereos
monthlyRevenue += 45_000_000;
console.log("Tras tiquetes aéreos:", monthlyRevenue);

// ingresos por paquetes turisticos
monthlyRevenue += 30_000_000;
console.log("Tras paquetes turísticos:", monthlyRevenue);

// ingresos por seguros de viaje
monthlyRevenue += 8_500_000;
console.log("Tras seguros de viaje:", monthlyRevenue);

// se aplica impuesto del 5%
monthlyRevenue *= 0.95;
console.log("Ingresos después de impuestos:", monthlyRevenue);

// se descuentan gastos operativos
monthlyRevenue -= 12_000_000;
console.log("Ganancia neta del mes:", monthlyRevenue);

console.log("");

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

// verificar si la agencia esta al tope de su capacidad
const isAtFullCapacity = currentBookings === maxCapacity;
console.log("¿Agencia al tope de capacidad?", isAtFullCapacity);

// verificar si hay reservas disponibles
const hasAvailability = availableBookings !== 0;
console.log("¿Tiene disponibilidad?", hasAvailability);

// verificar si la ocupacion supera el 80%
const isHighDemand = occupancyRate >= 80;
console.log("¿Demanda alta (más del 80%)?", isHighDemand);

// verificar si el descuento se aplico correctamente
const isDiscountApplied = discountedPrice < TICKET_PRICE;
console.log("¿Descuento aplicado correctamente?", isDiscountApplied);

console.log("");

// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");

// el cliente es miembro y compra mas de un tiquete
const isMember = true;
const ticketsBought = 3;
const qualifiesForDiscount = isMember && ticketsBought > 1;
console.log("¿Aplica descuento por membresía?", qualifiesForDiscount);

// la agencia puede aceptar reservas si hay disponibilidad o agentes libres
const freeAgents = 2;
const canAcceptBookings = hasAvailability || freeAgents > 0;
console.log("¿Puede aceptar nuevas reservas?", canAcceptBookings);

// verificar si NO esta en temporada alta
const isHighSeason = false;
const isLowSeason = !isHighSeason;
console.log("¿Está en temporada baja?", isLowSeason);

// descuento especial si es temporada baja y el cliente es miembro
const specialDiscount = isLowSeason && isMember;
console.log("¿Aplica descuento especial?", specialDiscount);

console.log("");

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

console.log("Agencia:               Agency Travel Hub");
console.log("Reservas actuales:     " + currentBookings);
console.log("Capacidad total:       " + maxCapacity);
console.log("Disponibilidad:        " + availableBookings);
console.log("Ocupación:             " + occupancyRate + "%");
console.log("Ganancia neta del mes: " + monthlyRevenue);
console.log("¿Alta demanda?:        " + isHighDemand);
console.log("¿Acepta reservas?:     " + canAcceptBookings);

console.log("");