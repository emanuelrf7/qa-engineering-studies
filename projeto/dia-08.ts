type TestStatus = "passed" | "failed" | "skipped";

type ErrorInfo = {
  message: string;
  code: number;
};

type TestDetails = {
  automated: boolean;
  error?: ErrorInfo;
};

type TestResult = {
  id: number;
  name: string;
  status: TestStatus;
  duration: number;
  details: TestDetails;
};

const testResults: TestResult[] = [
  {
    id: 1,
    name: "Login",
    status: "passed",
    duration: 180,
    details: {
      automated: true
    }
  },
  {
    id: 2,
    name: "Checkout",
    status: "failed",
    duration: 720,
    details: {
      automated: true,
      error: {
        message: "Payment service unavailable",
        code: 503
      }
    }
  },
  {
    id: 3,
    name: "Perfil",
    status: "skipped",
    duration: 0,
    details: {
      automated: false
    }
  },
  {
    id: 4,
    name: "Pagamento",
    status: "failed",
    duration: 510,
    details: {
      automated: true
    }
  }
];

function formatTestResult(test: TestResult): string {
    if (test.status === "passed" || test.status === "skipped") {
        return `${test.name} - ${test.status} - ${test.duration}ms`;
    }

    if (test.status === "failed" && test.details.error) {
        return `${test.name} - ${test.status} - ${test.details.error.message} - Código: ${test.details.error.code}`;
    }

    if (test.status === "failed" && !test.details.error) {
        return `${test.name} - ${test.status} - Sem erro registrado`;
    }
    
    return "Teste inválido - teste não encontrado";
};

for (const result of testResults) {
    console.log(formatTestResult(result));
};

const failedTests = testResults.filter((test) => test.status === "failed").map((test) => test.name);
const skippedTests = testResults.filter((test) => test.status === "skipped").map((test) => test.name);
const automatedTests = testResults.filter((test) => test.details.automated).map((test) => test.name);

console.log("Testes reprovados:", failedTests);
console.log("Testes ignorados:", skippedTests);
console.log("Testes automatizados:", automatedTests);
console.log(`Total de testes: ${testResults.length}`);