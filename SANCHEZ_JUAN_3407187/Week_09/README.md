# 69 - Sistema de Gestión de Agencias de Viajes - Juan Pablo Sanchez Baquero

## 📋 Información
- **Nombre**: Juan Pablo Sanchez Baquero
- **Fecha**: 14/03/2026
- **Dominio Asignado**: Sistema de Gestión de Agencias de Viajes
- **Entidad Principal**: Servicios turísticos (Agency Travel Hub)

## 🎯 Descripción
Script de consola que implementa un catálogo completo de servicios de la agencia usando objetos literales y los métodos de Object. Incluye inspección de propiedades, estadísticas, manejo de propiedades opcionales (promoCode), actualizaciones inmutables con spread y operaciones de filtrado, búsqueda, transformación y ordenamiento.

## 📚 Conceptos Aplicados
- [x] `Object.entries()` — inspeccionar claves y valores de un servicio
- [x] `Object.values()` + `map` — calcular estadísticas de precios
- [x] `Object.hasOwn()` — verificar si el servicio tiene código promocional
- [x] `for...in` — recorrer todas las propiedades de un objeto
- [x] Spread `{...item, ...changes}` — actualización inmutable
- [x] `filter` — obtener servicios activos
- [x] `find` — buscar por id
- [x] `map` — agregar precio con IVA (19%)
- [x] `sort` — ordenar por precio sin mutar el original

## 🚀 Cómo Ejecutar
```
node script.js
```

## 🎯 Autoevaluación
- Array con 7 objetos de 5+ propiedades: 100%
- Object.keys/values/entries: 100%
- Object.hasOwn(): 100%
- for...in: 100%
- Spread copia + actualización inmutable: 100%
- filter, find, map, sort: 100%
- Reporte final completo: 100%
- Dominio coherente + clean code: 90%
- **Total Estimado**: 99%
