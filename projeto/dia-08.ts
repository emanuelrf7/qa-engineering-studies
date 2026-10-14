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
    status: "passed" | "failed";
    details: TestDetails;
};

const testResult1: TestResult = {
    id: 1,
    name: "Login",
    status: "passed",
    details: {
        automated: true
    }
};

const testResult2: TestResult = {
    id: 2,
    name: "Checkout",
    status: "failed",
    details: {
        automated: true,
        error: {
            message: "Payment service unavailable",
            code: 503
        }
    }
};

const testResults: TestResult[] = [testResult1, testResult2];

for (const result of testResults) {
    if (result.status === "failed") {
        console.log(`${result.name} - ${result.details.error?.message ?? "Sem mensagem de erro registrada"} - Código: ${result.details.error?.code ?? "Sem código de erro registrado"}`);
    } else {
        console.log(`${result.name} - Sem erro registrado`);
    }
};