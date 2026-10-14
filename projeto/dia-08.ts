type TestResult = {
    id: number;
    name: string;
    status: string;
    duration: number;
    automated: boolean;
};

const testResult1: TestResult = {
    id: 101,
    name: "Login",
    status: "passed",
    duration: 180,
    automated: true
};

const testResult2: TestResult = {
    id: 102,
    name: "Checkout",
    status: "failed",
    duration: 650,
    automated: true
};

const testResults: TestResult[] = [testResult1, testResult2];
const failedTests = testResults.filter((test) => test.status === "failed").map((test) => test.name);
console.log("Testes com falha:", failedTests);
console.log(`Total de testes: ${testResults.length}`);