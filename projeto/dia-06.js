const testExecution = {
  id: 101,
  name: "Login",
  retries: 0,
  automated: false,
  errorMessage: null
};

console.log("Retries:", testExecution.retries ?? "Não informado");
console.log("Automated:", testExecution.automated ?? "Não informado");
console.log("Error:", testExecution.errorMessage ?? "Não informado");