const executions = [
  {
    id: 201,
    test: "Login",
    environment: "QA",
    result: { status: "passed", retries: 0 }
  },
  {
    id: 202,
    test: "Checkout",
    environment: "QA",
    result: {
      status: "failed",
      retries: 1,
      error: { message: "Timeout" }
    }
  },
  {
    id: 203,
    test: "Cadastro",
    environment: "DEV",
    result: { status: "failed", retries: 0 }
  },
  {
    id: 204,
    test: "Pagamento",
    environment: "QA",
    result: null
  },
  {
    id: 205,
    test: "Perfil",
    environment: "QA",
    result: {
      status: "failed",
      retries: 2,
      error: { message: "User service unavailable" }
    }
  }
];

const failedQaTests = executions.filter((execution) => execution.environment === "QA" && execution.result?.status === "failed").map((execution) => execution.test);
console.log(failedQaTests || "Não foram encontrados testes falhos em QA");
console.log(`Total de falhas em QA: ${failedQaTests.length}`);

const paymentTest = executions.find((execution) => execution?.id === 204);
console.log("Status do Pagamento:", paymentTest?.result?.status || "Não informado");