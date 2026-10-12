const testCases = [
  { id: 1, name: "Login válido", status: "passed", priority: "high" },
  { id: 2, name: "Login inválido", status: "failed", priority: "high" },
  { id: 3, name: "Recuperar senha", status: "passed", priority: "medium" },
  { id: 4, name: "Criar usuário", status: "failed", priority: "medium" },
  { id: 5, name: "Excluir usuário", status: "passed", priority: "low" },
  { id: 6, name: "Alterar senha", status: "failed", priority: "high" }
];

const criticalFailures = testCases.filter((test) => test.status === "failed" && test.priority === "high");
console.log(criticalFailures);
console.log(`Total de falhas de alta prioridade: ${criticalFailures.length}`);