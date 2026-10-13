const testExecution = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      id: 301,
      test: "Login",
      status: "passed"
    });
  }, 1000);
});

async function processExecution() {
  const result = await testExecution;
  console.log(`Teste: ${result.test}\nStatus: ${result.status}`)
}

console.log("Antes da função");

processExecution(testExecution);

console.log("Depois da função");