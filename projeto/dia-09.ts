type TestResult = {
  name: string;
  status: "passed" | "failed";
  duration: number;
};

async function executeApiTest(shouldFail: boolean): Promise<TestResult> {
    if (!shouldFail) {
        return {
            name: "GET /users",
            status: "passed",
            duration: 320
        };
    };

    throw new Error("API indisponível");
}

async function processApiTest(shouldFail: boolean) {
    try {
        const test = await executeApiTest(shouldFail);
        console.log(`${test.name} - ${test.status} - ${test.duration}ms`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Falha na execução: ${error.message}`);
        } else {
            console.log("Falha desconhecida");
        }
    }
}

processApiTest(false);
processApiTest(true);