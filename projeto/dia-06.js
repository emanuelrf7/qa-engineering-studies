const testSuite = [
  { id: 1, name: "Login", status: "passed", automated: true },
  { id: 2, name: "Checkout", status: "passed", automated: true },
  { id: 3, name: "Cadastro", status: "failed", automated: true },
  { id: 4, name: "Pagamento", status: "passed", automated: false },
  { id: 5, name: "Perfil", status: "passed", automated: true }
];

const hasFailedTests = testSuite.some((test) => test.status === "failed");
const allTestsPassed = testSuite.every((test) => test.status === "passed");
const allTestsAutomated = testSuite.every((test) => test.automated);
console.log("Existe teste com falha:", hasFailedTests);
console.log("Todos os testes passaram:", allTestsPassed);
console.log("Todos os testes são automatizados:", allTestsAutomated);