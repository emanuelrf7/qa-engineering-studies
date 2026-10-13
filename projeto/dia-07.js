const testExecution = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      id: 201,
      test: "Pagamento",
      status: "failed",
      error: null
    });
  }, 1000);
});

testExecution.then((result) => {
  if (result.status === "failed" && !result.error) {
    throw new Error("Teste falhou sem mensagem de erro");
  }
  return result;
}).then(() => {
  console.log("Execução processada com sucesso");
}).catch((error) => {
  console.log(`Erro capturado: ${error.message}`);
})