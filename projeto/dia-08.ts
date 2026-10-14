const testStatuses: string[] = [
  "passed",
  "failed",
  "passed",
  "failed"
];

const failedStatuses = testStatuses.filter((test) => test === "failed");
console.log(`Status encontrados:`, failedStatuses);
console.log(`Total de falhas: ${failedStatuses.length}`);

const durations: number[] = [120, 350, 800, 90];

const higherThan300 = durations.filter((duration) => duration > 300);
console.log(`Testes lentos:`, higherThan300);