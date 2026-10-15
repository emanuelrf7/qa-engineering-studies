type TestResult = {
  name: string;
  status: "passed" | "failed";
  duration: number;
};

function executeTest(): Promise<TestResult> {
    const promise: TestResult = {
        name: "Login",
        status: "passed",
        duration: 180
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(promise);
        }, 800);
    });
}

async function processTest() {
    const execution = await executeTest();

    console.log(`Teste: ${execution.name}\nStatus: ${execution.status}\nDuração: ${execution.duration}ms`);
}

processTest();