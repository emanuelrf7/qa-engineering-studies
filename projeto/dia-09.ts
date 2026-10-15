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

async function processUsers(usersIds: number[]) {
    let userPromises: Array<Promise<ApiResponse>> = [];
    for (const userId of usersIds) {
        const userPromise = fetchUser(userId);
        userPromises.push(userPromise);
    };
    
    const users = await Promise.all(userPromises);
    
    for (const user of users) {
        if (user.success) {
            console.log(`Usuário encontrado: ${user.data.name}`);
        } else {
            console.log(user.error);
        };
    };
}

processUsers([1, 999, 1]);