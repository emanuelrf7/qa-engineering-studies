type ApiSuccess = {
  success: true;
  statusCode: 200;
  data: {
    id: number;
    name: string;
  };
};

type ApiError = {
  success: false;
  statusCode: 404;
  error: string;
};

type ApiResponse = ApiSuccess | ApiError;

async function fetchUser(userId: number): Promise<ApiResponse> {
    if (userId === 1) {
        return {
            success: true,
            statusCode: 200,
            data: {
                id: 1,
                name: "Emanuel"
            }
        };
    };

    return {
        success: false,
        statusCode: 404,
        error: "Usuário não encontrado"
    };
}

async function processUser(userId: number) {
    const response = await fetchUser(userId);

    if (response.success) {
        console.log(`Status: ${response.statusCode}\nUsuário: ${response.data.name}\nID: ${response.data.id}`);
    } else {
        console.log(`Status: ${response.statusCode}\nErro: ${response.error}`);
    }
}

processUser(1);
processUser(999);