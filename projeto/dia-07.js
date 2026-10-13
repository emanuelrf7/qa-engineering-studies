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

async function runTests() {
  const loginResult = executeLoginTest();
  const checkoutResult = executeCheckoutTest();

  try {
    const results = await Promise.all([loginResult, checkoutResult]);
    console.log(results);
  } catch (erro) {
    console.log(`Erro nas execuções: ${erro.message}`);
  }
}

runTests();