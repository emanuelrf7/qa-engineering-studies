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

async function runTests() {
    const test1 = await executeTest("Login", "passed", 180);
    const test2 = await executeTest("Checkout", "failed", 650);

    console.log(`${test1.name} - ${test1.status} - ${test1.duration}ms`);
    console.log(`${test2.name} - ${test2.status} - ${test2.duration}ms`);
}

runTests();