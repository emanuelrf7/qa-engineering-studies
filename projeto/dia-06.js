const pipelineReport = {
  build: "2.4.0",
  environment: "QA",
  execution: {
    id: "EXEC-501",
    tests: [
      {
        id: 1,
        name: "Login",
        status: "passed",
        priority: "high",
        duration: 140,
        details: { automated: true }
      },
      {
        id: 2,
        name: "Checkout",
        status: "failed",
        priority: "critical",
        duration: 620,
        details: {
          automated: true,
          error: { message: "Timeout waiting for payment service" }
        }
      },
      {
        id: 3,
        name: "Cadastro",
        status: "passed",
        priority: "medium",
        duration: 230,
        details: { automated: true }
      },
      {
        id: 4,
        name: "Pagamento",
        status: "failed",
        priority: "high",
        duration: 510,
        details: null
      },
      {
        id: 5,
        name: "Busca",
        status: "passed",
        priority: "low",
        duration: 80,
        details: { automated: false }
      },
      {
        id: 6,
        name: "Perfil",
        status: "passed",
        priority: "medium",
        duration: 190,
        details: { automated: true }
      }
    ]
  }
};

const failedTests = pipelineReport.execution.tests.filter((test) => test.status === "failed").map((test) => test.name);
const hasCriticalFailedTest = pipelineReport.execution.tests.some((test) => test.status === "failed" && test.priority === "critical");
const allTestsPassed = pipelineReport.execution.tests.every((test) => test.status === "passed");
const allTestsAutomated = pipelineReport.execution.tests.every((test) => test?.details?.automated);
const firstSlowTest = pipelineReport.execution.tests.find((test) => test.duration > 500);
const criticalFailedTestError = pipelineReport.execution.tests.find((test) => test.status === "failed" && test.priority === "critical");
const qualityGate = hasCriticalFailedTest ? "BLOCKED" : "APPROVED";

console.log("Testes com falha:", failedTests);
console.log("Total de falhas:", failedTests.length);
console.log("Existe falha crítica:", hasCriticalFailedTest);
console.log("Todos os testes passaram:", allTestsPassed);
console.log("Todos os testes são automatizados:", allTestsAutomated);
console.log("Primeiro teste lento:", firstSlowTest.name);
console.log("Erro da falha crítica:", criticalFailedTestError.details?.error?.message);
console.log("Quality Gate:", qualityGate);

const test999 = pipelineReport.execution.tests.find((test) => test.id === 999);
console.log("Erro do teste:", test999?.details?.error?.message || "Sem erro registrado");