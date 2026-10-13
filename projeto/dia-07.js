const loginExecution = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      test: "Login",
      status: "passed"
    });
  }, 800);
});

const checkoutExecution = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      test: "Checkout",
      status: "failed"
    });
  }, 1200);
});

async function processExecution(executionPromise) {
  const result = await executionPromise;
  console.log(`Teste: ${result.test}\nStatus: ${result.status}`);
}

console.log("Iniciando execuções");

processExecution(loginExecution);
processExecution(checkoutExecution);

console.log("Execuções solicitadas");