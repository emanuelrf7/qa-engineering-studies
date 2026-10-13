function executeLoginTest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        test: "Login",
        status: "passed"
      });
    }, 1000);
  });
}

function executeCheckoutTest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        test: "Checkout",
        status: "passed"
      });
    }, 1500);
  });
}

async function runSequentially() {
  const loginResult = await executeLoginTest();
  const checkoutResult = await executeCheckoutTest();
  console.log(loginResult, checkoutResult);
}

async function runTogether() {
  const loginResult = executeLoginTest();
  const checkoutResult = executeCheckoutTest();
  
  const results = await Promise.all([loginResult, checkoutResult]);
  console.log(results);
}

runSequentially();
runTogether();