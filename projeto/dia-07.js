function executeTest(testName, shouldResolve, testStatus, priority, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          test: testName,
          status: testStatus,
          priority
        });
      } else {
        reject(new Error(`${testName} apresentou erro de execução`));
      }
    }, delay);
  });
}

const loginExecution = executeTest("Login", true, "passed", "high", 700);

const checkoutExecution = executeTest("Checkout", true, "failed", "critical", 1100);

const paymentExecution = executeTest("Pagamento", false, null, "critical", 900);

const profileExecution = executeTest("Perfil", true, "passed", "medium", 500);

const searchExecution = executeTest("Busca", true, "failed", "low", 800);

async function runPipeline() {
  const results = await Promise.allSettled([loginExecution, checkoutExecution, paymentExecution, profileExecution, searchExecution]);

  const successfulPromises = results.filter((result) => result.status === "fulfilled");
  const failedPromises = results.filter((result) => result.status === "rejected");
  const approvedTests = successfulPromises.filter((test) => test.value.status === "passed").map((test) => test.value.test);
  const failedTests = successfulPromises.filter((test) => test.value.status === "failed").map((test) => test.value.test);
  const executionErrors = failedPromises.map((result) => result.reason.message);
  const hasCriticalFailure = successfulPromises.some((result) => result.value.status === "failed" && result.value.priority === "critical");
  const qualityGate = hasCriticalFailure ? "BLOCKED" : "APPROVED";

  console.log(`Promises resolvidas: ${successfulPromises.length}\nPromises rejeitadas: ${failedPromises.length}`);
  console.log("Testes aprovados:", approvedTests);
  console.log("Testes reprovados:", failedTests);
  console.log("Erros de execução:", executionErrors);
  console.log("Existe falha crítica:", hasCriticalFailure);
  console.log("Quality Gate:", qualityGate);
}

runPipeline();