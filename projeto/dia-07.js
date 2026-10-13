const testExecution = new Promise((resolve, reject) => {
  const testPassed = false;

  setTimeout(() => {
    if (testPassed) {
      resolve("Login executado com sucesso");
    } else {
      reject("Login apresentou falha");
    }
  }, 1000);
});

testExecution.then((passou) => console.log(`Resultado: ${passou}`)).catch((naoPassou) => console.log(`Erro: ${naoPassou}`));