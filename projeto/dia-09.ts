type SuccessResponse = {
  data: string;
  statusCode: number;
};

type ErrorResponse = {
  error: string;
  statusCode: number;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function formatApiResponse(response: ApiResponse): string {
    if ("data" in response) {
        return `Status: ${response.statusCode} - Dados: ${response.data}`;
    }

    return `Status: ${response.statusCode} - Erro: ${response.error}`;
}

const successResponse: ApiResponse = {
  data: "Usuário encontrado",
  statusCode: 200
};

const errorResponse: ApiResponse = {
  error: "Usuário não encontrado",
  statusCode: 404
};

console.log(formatApiResponse(successResponse));
console.log(formatApiResponse(errorResponse));