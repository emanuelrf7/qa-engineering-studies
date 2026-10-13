const testExecution = new Promise((resolve, reject) => {
  const testPassed = true;

  setTimeout(() => {
    if (testPassed) {
      resolve({
        test: "Checkout",
        status: "passed"
      });
    } else {
      reject(new Error("Checkout apresentou falha"));
    }
  }, 1000);
});

async function processExecution() {
  try {
    const result = await testExecution;
    console.log(`Teste: ${result.test}\nStatus: ${result.status}`);

  } catch (erro) {
    console.log(`Erro capturado: ${erro.message}`);
  }  
}

processExecution();