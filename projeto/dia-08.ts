type TestStatus = "passed" | "failed" | "skipped";

type TestResult = {
  id: number;
  name: string;
  status: TestStatus;
  errorMessage?: string;
};

function formatTestResult(test: TestResult): string {
    if (test.status === "passed" || test.status === "skipped") {
        return `${test.name} - ${test.status}`;
    }

    if (test.status === "failed" && test.errorMessage) {
        return `${test.name} - ${test.status} - ${test.errorMessage}`;
    }

    if (test.status === "failed" && !test.errorMessage) {
        return `${test.name} - ${test.status} - Sem erro registrado`;
    }

    return "Teste inválido / teste não encontrado";
}

const login: TestResult = {
  id: 1,
  name: "Login",
  status: "passed"
};

const checkout: TestResult = {
  id: 2,
  name: "Checkout",
  status: "failed",
  errorMessage: "Payment service unavailable"
};

const payment: TestResult = {
  id: 3,
  name: "Pagamento",
  status: "failed"
};

const profile: TestResult = {
  id: 4,
  name: "Perfil",
  status: "skipped"
};

console.log(formatTestResult(login));
console.log(formatTestResult(checkout));
console.log(formatTestResult(payment));
console.log(formatTestResult(profile));