function executeTest(testName, shouldPass, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldPass) {
        resolve({
          test: testName,
          status: "passed"
        });
      } else {
        reject(new Error(`${testName} apresentou falha`));
      }
    }, delay);
  });
}

async function processTest(testPromise) {
  try {
    const result = await testPromise;
    console.log(`Teste: ${result.test}\nStatus: ${result.status}`);
  } catch (erro) {
    console.log("Erro capturado:", erro.message);
  }
}

console.log("Início");

processTest(executeTest("Login", true, 800));
processTest(executeTest("Checkout", false, 1200));
processTest(executeTest("Perfil", true, 600));

console.log("Fim das solicitações");