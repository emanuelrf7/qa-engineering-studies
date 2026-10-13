function executeLoginTest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        test: "Login",
        status: "passed"
      });
    }, 800);
  });
}

function executeCheckoutTest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Checkout apresentou falha"));
    }, 1200);
  });
}

function executeProfileTest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        test: "Perfil",
        status: "passed"
      });
    }, 600);
  });
}

async function runTests() {
  const loginResult = executeLoginTest();
  const checkoutResult = executeCheckoutTest();
  const profileResult = executeProfileTest();

  const results = await Promise.allSettled([loginResult, checkoutResult, profileResult]);
  
  const successfulResults = results.filter((result) => result.status === "fulfilled");
  const failedResults = results.filter((result) => result.status === "rejected");
  const errorMessages = failedResults.map((result) => result.reason.message);

  console.log(`Sucessos: ${successfulResults.length}\nFalhas: ${failedResults.length}\nMensagens de erro:`, errorMessages);
}

runTests();