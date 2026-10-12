const executionReport = {
  executionId: "RUN-2026-1012",
  environment: "QA",
  tests: [
    {
      id: 1,
      name: "Login válido",
      status: "passed",
      duration: 120,
      details: { automated: true }
    },
    {
      id: 2,
      name: "Login inválido",
      status: "failed",
      duration: 180,
      details: {
        automated: true,
        error: { message: "Mensagem de erro não exibida" }
      }
    },
    {
      id: 3,
      name: "Checkout",
      status: "passed",
      duration: 450,
      details: { automated: true }
    },
    {
      id: 4,
      name: "Pagamento",
      status: "failed",
      duration: 520,
      details: null
    },
    {
      id: 5,
      name: "Perfil",
      status: "passed",
      duration: 90,
      details: { automated: false }
    }
  ]
};

const failedTestNames = executionReport.tests.filter((test) => test?.status === "failed").map((test) => test?.name);
const hasSlowTests = executionReport.tests.some((test) => test.duration > 400);
const allTestsPassed = executionReport.tests.every((test) => test?.status === "passed");
const firstFailedTest = executionReport.tests.find((test) => test?.status === "failed");
console.log("Testes com falha:", failedTestNames);
console.log("Existem testes lentos:", hasSlowTests);
console.log("Todos os testes passaram:", allTestsPassed);
console.log("Primeira falha:", firstFailedTest?.name);
console.log("Erro da primeira falha:", firstFailedTest?.details?.error?.message);

const invalidTest = executionReport.tests.find((test) => test?.id === 999);
console.log("Teste encontrado:", invalidTest?.name || "Teste não encontrado");