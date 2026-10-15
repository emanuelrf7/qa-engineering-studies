type PassedTest = {
  status: "passed";
  name: string;
  duration: number;
};

type FailedTest = {
  status: "failed";
  name: string;
  errorMessage: string;
};

type TestResult = PassedTest | FailedTest;

function formatTestResult(test: TestResult): string {
    if (test.status === "passed") {
        return `${test.name} - ${test.status} - ${test.duration}ms`;
    }

    return `${test.name} - ${test.status} - ${test.errorMessage}`;
}

const login: TestResult = {
  status: "passed",
  name: "Login",
  duration: 180
};

const checkout: TestResult = {
  status: "failed",
  name: "Checkout",
  errorMessage: "Payment service unavailable"
};

console.log(formatTestResult(login));
console.log(formatTestResult(checkout));