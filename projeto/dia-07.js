function executeTest(testName, shouldPass, delay) {
  if (shouldPass) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          test: testName,
          status: "passed"
        });
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`${testName} apresentou falha`));
      }, delay);
    });
  }
}

const loginExecution = executeTest("Login", true, 800);
const checkoutExecution = executeTest("Checkout", false, 1200);
const profileExecution = executeTest("Perfil", true, 600);

async function runAllSettled() {
  const results = await Promise.allSettled([loginExecution, checkoutExecution, profileExecution]);
  console.log(results);
}

runAllSettled();