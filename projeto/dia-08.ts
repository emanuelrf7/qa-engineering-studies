type TestStatus = "passed" | "failed" | "skipped";

type TestResult = {
  id: number;
  name: string;
  status: TestStatus;
};

const testResult1: TestResult = {
    id: 1,
    name: "Login",
    status: "passed"
}

const testResult2: TestResult = {
    id: 2,
    name: "Checkout",
    status: "failed"
}

const testResult3: TestResult = {
    id: 3,
    name: "Perfil",
    status: "skipped"
}

const testResults: TestResult[] = [testResult1, testResult2, testResult3];

const approvedTests = testResults.filter((test) => test.status === "passed").map((test) => test.name);
const failedTests = testResults.filter((test) => test.status === "failed").map((test) => test.name);
const skippedTests = testResults.filter((test) => test.status === "skipped").map((test) => test.name);

console.log("Testes aprovados:", approvedTests);
console.log("Testes reprovados:", failedTests);
console.log("Testes ignorados:", skippedTests);