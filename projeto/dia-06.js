const testResults = [
  { id: 1, name: "Login válido", status: "passed", duration: 120 },
  { id: 2, name: "Login inválido", status: "failed", duration: 95 },
  { id: 3, name: "Criar usuário", status: "passed", duration: 210 },
  { id: 4, name: "Excluir usuário", status: "failed", duration: 180 },
  { id: 5, name: "Alterar senha", status: "failed", duration: 150 }
];

const failedTestNames = testResults.filter((test) => test.status === "failed").map((test) => test.name);
console.log(failedTestNames);