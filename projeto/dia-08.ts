type TestResult = {
  id: number;
  name: string;
  status: string;
  errorMessage?: string;
};

const testResult1: TestResult = {
    id: 1,
    name: "Login",
    status: "passed"
};

const testResult2: TestResult = {
    id: 2,
    name: "Checkout",
    status: "failed",
    errorMessage: "Payment service unavailable"
};

const testResults: TestResult[] = [testResult1, testResult2];

for (const result of testResults) {
    if (result.status === "failed") {
        console.log(`${result.name} - ${result.errorMessage ?? "Sem erro registrado"}`);
    } else {
        console.log(`${result.name} - Sem erro registrado`);
    }
}