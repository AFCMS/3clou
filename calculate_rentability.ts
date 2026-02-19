#!/usr/bin/env -S node --experimental-strip-types

// Requires Node.js > v22 or manual execution via `tsx` or `ts-node`
//
// - `node --experimental-strip-types ./calculate_rentability.ts` (NodeJS v22)
// - `node ./calculate_rentability.ts` (NodeJS v24+)
// - `tsx ./calculate_rentability.ts` (via tsx)

// External Constants
const averageElectricityCostFrance = 0.2; // €/kWh

// Common Constants
const countServer = 7;

// On-Premise Constants
const onPremServerCost = 3000; // € par serveur
const onPremServerCostTotal = countServer * onPremServerCost; // €
const onPremPowerConsumption = 0.18; // kW / serveur
const onPremPowerConsumptionMonthly = onPremPowerConsumption * 24 * 30; // kWh / mois / serveur
const onPremPowerCostMonthly =
  onPremPowerConsumptionMonthly * averageElectricityCostFrance; // € / mois / serveur

const onPremPowerCostTotalMonthly = onPremPowerCostMonthly * countServer; // € / mois pour 7 serveurs

const onPremEstimatedMonthlyCost = 250; // € (électricité + maintenance) pour 7 serveurs

// Cloud OVH Constants
const ovhCostPerServer = 200; // € par mois
const ovhCostTotalMonthly = ovhCostPerServer * countServer; // € par mois pour 7 serveurs

// Printing Results
console.log("On-Premise:");
console.log(`- Coût initial des serveurs: ${onPremServerCostTotal}€`);
console.log(
  `- Coût mensuel d'électricité par serveur: ${onPremPowerCostMonthly.toFixed(2)}€`,
);
console.log(
  `- Coût mensuel d'électricité pour ${countServer} serveurs: ${onPremPowerCostTotalMonthly.toFixed(2)}€`,
);
console.log(
  `- Coût mensuel total estimé (électricité + maintenance): ${onPremEstimatedMonthlyCost}€`,
);

console.log("\nCloud OVH:");

console.log(`- Coût mensuel par serveur: ${ovhCostPerServer}€`);
console.log(
  `- Coût mensuel pour ${countServer} serveurs: ${ovhCostTotalMonthly}€`,
);

console.log("\nRentabilité:");

const monthsToBreakEven =
  onPremServerCostTotal / (ovhCostTotalMonthly - onPremEstimatedMonthlyCost); // mois

console.log(
  `- Temps pour atteindre le point d'équilibre: ${monthsToBreakEven.toFixed(2)} mois`,
);
