const testExecution = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      id: 101,
      test: "Checkout",
      status: "failed",
      duration: 650
    });
  }, 1000);
});

testExecution.then((result) => { return result.duration > 500 ? true : false }).then((result) => console.log(`Teste lento: ${result}`));