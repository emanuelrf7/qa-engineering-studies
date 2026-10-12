const executions = [
  { id: 101, test: "Login", environment: "QA", status: "passed" },
  { id: 102, test: "Checkout", environment: "QA", status: "failed" },
  { id: 103, test: "Cadastro", environment: "DEV", status: "failed" },
  { id: 104, test: "Pagamento", environment: "QA", status: "failed" },
  { id: 105, test: "Busca", environment: "DEV", status: "passed" },
  { id: 106, test: "Perfil", environment: "QA", status: "passed" }
];

const failedQaTests = executions.filter((execution) => execution.environment === "QA" && execution.status === "failed").map((execution) => execution.test);
console.log(failedQaTests);