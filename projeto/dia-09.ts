type TestResult = {
  name: string;
  status: "passed" | "failed";
};

async function executeTest(
    name: string,
    shouldReject: boolean
): Promise<TestResult> {
    if (!shouldReject) {
        return {
            name: name,
            status: "passed"
        };
    }

    throw new Error(`Falha ao executar ${name}`);
}

async function runTestSuite() {
    const tests: Array<Promise<TestResult>> = [executeTest("Login", false), executeTest("Checkout", true), executeTest("Perfil", false)];

    const results = await Promise.allSettled(tests);

    for (const result of results) {
        if (result.status === "fulfilled") {
            console.log(`Teste concluído: ${result.value.name} - ${result.value.status}`);
        } else {
            if (result.reason instanceof Error) {
                console.log(`Falha na execução: ${result.reason.message}`);
            } else {
                console.log("Falha desconhecida");
            }
        }
    }
}

runTestSuite();