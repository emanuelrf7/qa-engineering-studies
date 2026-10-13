function executeTest(testName, shouldResolve, testStatus, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          test: testName,
          status: testStatus
        });
      } else {
        reject(new Error(`${testName} apresentou erro de execução`));
      }
    }, delay);
  });
}

const loginExecution = executeTest("Login", true, "passed", 800);
const checkoutExecution = executeTest("Checkout", true, "failed", 1000);
const paymentExecution = executeTest("Pagamento", false, null, 1200);
const profileExecution = executeTest("Perfil", true, "passed", 600);

async function generateReport() {
  const results = await Promise.allSettled([loginExecution, checkoutExecution, paymentExecution, profileExecution]);

  const successfulPromises = results.filter((result) => result.status === "fulfilled");
  const failedPromises = results.filter((result) => result.status === "rejected");
  const approvedTests = successfulPromises.filter((test) => test.value.status === "passed").map((test) => test.value.test);
  const failedTests = successfulPromises.filter((test) => test.value.status === "failed").map((test) => test.value.test);
  const executionErrors = failedPromises.map((test) => test.reason.message);
  const hasFailedTest = successfulPromises.some((teste) => teste.value.status === "failed");

  console.log(`Promises resolvidas: ${successfulPromises.length}\nPromises rejeitadas: ${failedPromises.length}`);
  console.log("Testes aprovados:", approvedTests);
  console.log("Testes reprovados:", failedTests);
  console.log("Erros de execução:", executionErrors);
  console.log(`Existe teste reprovado: ${hasFailedTest}`);
}

generateReport();