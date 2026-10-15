type ApiSuccess = {
  success: true;
  endpoint: string;
  statusCode: 200;
  responseTime: number;
};

type ApiFailure = {
  success: false;
  endpoint: string;
  statusCode: 400 | 404 | 500;
  error: string;
};

type ApiResult = ApiSuccess | ApiFailure;

async function executeApiTest(
    endpoint: string,
    statusCode: 200 | 400 | 404 | 500,
    responseTime: number
): Promise<ApiResult> {
    if (statusCode === 200) {
        return {
            success: true,
            statusCode: statusCode,
            endpoint: endpoint,
            responseTime: responseTime
        };
    };

    return {
        success: false,
        endpoint: endpoint,
        statusCode: statusCode,
        error: `Request failed with status ${statusCode}`
    };
}

async function runApiSuite() {
    const tests: Array<Promise<ApiResult>> = [executeApiTest("/users", 200, 180), executeApiTest("/products", 500, 620), executeApiTest("/profile", 404, 240), executeApiTest("/checkout", 200, 430)];

    const results = await Promise.all(tests);
    
    for (const result of results) {
        if (result.success) {
            console.log(`PASS ${result.endpoint} - ${result.statusCode} - ${result.responseTime}ms`);
        } else {
            console.log(`FAIL ${result.endpoint} - ${result.statusCode} - ${result.error}`);
        }
    }

    const approvedTests = results.filter((test) => test.success);

    console.log(`Total: ${results.length}\nPassed: ${approvedTests.length}\nFailed: ${results.length - approvedTests.length}`);
}

runApiSuite();