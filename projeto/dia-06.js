const executions = [
  {
    id: 101,
    test: "Login",
    result: {
      status: "passed",
      retries: 0
    }
  },
  {
    id: 102,
    test: "Checkout",
    result: {
      status: "failed",
      retries: 2,
      error: {
        message: "Payment service unavailable"
      }
    }
  },
  {
    id: 103,
    test: "Cadastro",
    result: null
  }
];

const executionFound = executions.find((execution) => execution.id === 104);

console.log("Teste:", executionFound?.test || "Execução não encontrada");
console.log("Status:", executionFound?.result?.status || "Não informado");
console.log("Retries:", executionFound?.result?.retries ?? "Não informado");
console.log("Erro:", executionFound?.result?.error?.message || "Sem erro registrado");