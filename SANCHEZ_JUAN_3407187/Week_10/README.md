# 69 - Sistema de Gestión de Agencias de Viajes - Juan Pablo Sanchez Baquero

## 📋 Información
- **Nombre**: Juan Pablo Sanchez Baquero
- **Fecha**: 14/03/2026
- **Dominio Asignado**: Sistema de Gestión de Agencias de Viajes
- **Entidad Principal**: Servicios turísticos (Agency Travel Hub)

## 🎯 Descripción
Aplicación de consola completa que integra todos los conceptos de las semanas 01 a 09. Gestiona el catálogo de servicios de la agencia con funciones CRUD, análisis estadístico, actualización inmutable y un reporte completo con clasificación por precio, filtros, búsquedas y cálculo de IVA.

## ✅ Checklist de Integración

| Semana | Técnica | ¿Usada? |
|--------|---------|---------|
| 01–02 | `const`/`let`, tipos primitivos, separadores numéricos | ✅ |
| 03 | Operadores aritméticos, comparación, lógicos | ✅ |
| 04 | Template literals, `.padEnd()`, `.toUpperCase()` | ✅ |
| 05 | `if/else`, ternario, `&&` / `\|\|` | ✅ |
| 06 | `forEach`, `for...of`, `.sort()` | ✅ |
| 07 | Arrow functions, parámetros por defecto, `??`, `?.` | ✅ |
| 08 | `.filter()`, `.map()`, `.find()`, `.sort()`, `.forEach()` | ✅ |
| 09 | `Object.entries`, `Object.hasOwn`, spread | ✅ |

## 📚 Funciones Implementadas
- [x] `addItem(item)` — agrega servicio con validación de límite
- [x] `findById(id)` — busca por id con optional chaining
- [x] `getActive()` — filtra servicios activos
- [x] `filterByField(field, value)` — filtra por cualquier campo
- [x] `updateItem(id, changes)` — actualización inmutable con spread
- [x] `calculateStats(field)` — estadísticas de cualquier campo numérico
- [x] `formatItem(item)` — formato alineado con padEnd y ??
- [x] `buildReport()` — reporte completo del catálogo

## 🚀 Cómo Ejecutar
```
node app.js
```

## 🎯 Autoevaluación
- Sin errores de ejecución: 100%
- Integración completa (9 semanas): 100%
- Dominio coherente + clean code: 90%
- Originalidad: 100%
- **Total Estimado**: 98%
