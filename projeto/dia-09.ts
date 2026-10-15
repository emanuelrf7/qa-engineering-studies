type PassedApiTest = {
  type: "passed";
  endpoint: string;
  statusCode: 200;
  duration: number;
};

type FailedApiTest = {
  type: "failed";
  endpoint: string;
  statusCode: 400 | 404 | 500;
  error: string;
};

type ApiTestResult = PassedApiTest | FailedApiTest;

async function executeApiTest(
    endpoint: string,
    statusCode: 200 | 400 | 404 | 500,
    duration: number,
    shouldReject: boolean
): Promise<ApiTestResult> {
    if (shouldReject) {
        throw new Error(`Execution error on ${endpoint}`);
    };

    if (statusCode === 200) {
        return {
            type: "passed",
            endpoint: endpoint,
            statusCode: statusCode,
            duration: duration
        }
    };

    return {
        type: "failed",
        endpoint: endpoint,
        statusCode: statusCode,
        error: `Request failed with status ${statusCode}`
    };
}

async function runFinalSuite() {
    const tests: Array<Promise<ApiTestResult>> = [executeApiTest("/users", 200, 180, false), executeApiTest("/products", 500, 620, false), executeApiTest("/profile", 404, 240, true), executeApiTest("/checkout", 200, 430, false)];

    const results = await Promise.allSettled(tests);
    
    for (const result of results) {
        if (result.status === "fulfilled") {
            if (result.value.type === "passed") {
                console.log(`PASS ${result.value.endpoint} - ${result.value.statusCode} - ${result.value.duration}ms`);
            } else {
                console.log(`FAIL ${result.value.endpoint} - ${result.value.statusCode} - ${result.value.error}`);
            };
        } else {
            if (result.reason instanceof Error) {
                console.log(`ERROR - ${result.reason.message}`);                
            } else {
                console.log("ERROR - Falha desconhecida");
            };
        };
    };

    const resolvedPromises = results.filter((promise) => promise.status === "fulfilled");

    console.log(`Promises executadas: ${tests.length}\nPromises resolvidas: ${resolvedPromises.length}\nPromises rejeitadas: ${tests.length - resolvedPromises.length}`);
}

runFinalSuite();