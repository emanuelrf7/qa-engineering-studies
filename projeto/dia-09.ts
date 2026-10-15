type TestResult = {
  name: string;
  status: "passed" | "failed";
  duration: number;
};

async function executeTest(
    name: string,
    status: "passed" | "failed",
    duration: number
): Promise<TestResult> {
    return {
        name: name,
        status: status,
        duration: duration
    };
}

async function generateTestReport() {
    const executions: Array<Promise<TestResult>> = [executeTest("Login", "passed", 180), executeTest("Checkout", "failed", 720), executeTest("Perfil", "passed", 250)];

    const results = await Promise.all(executions);

    const failedTests = results.filter((test) => test.status === "failed");

    console.log(`Total: ${results.length}\nPassed: ${results.length - failedTests.length}\nFailed: ${failedTests.length}\nTestes com falha:\n- ${failedTests.map((test) => test.name)}`);
}

generateTestReport();