const testResults = [
  { id: 1, name: "Login", status: "passed", priority: "high", duration: 120 },
  { id: 2, name: "Checkout", status: "failed", priority: "high", duration: 340 },
  { id: 3, name: "Cadastro", status: "passed", priority: "medium", duration: 210 },
  { id: 4, name: "Pagamento", status: "failed", priority: "high", duration: 480 },
  { id: 5, name: "Busca", status: "passed", priority: "low", duration: 90 },
  { id: 6, name: "Perfil", status: "failed", priority: "medium", duration: 170 }
];

const slowTest = testResults.find((test) => test.duration > 300);
const criticalFailures = testResults.filter((test) => test.status === "failed" && test.priority === "high");
const criticalFailureNames = criticalFailures.map((test) => test.name);
console.log(`Slow Test: `, slowTest);
console.log(`Critical Failures: `, criticalFailures);
console.log(`Critical Failures Names: `, criticalFailureNames);