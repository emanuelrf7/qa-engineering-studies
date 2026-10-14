const testResult: {
    id: number;
    name: string;
    status: string;
    duration: number;
    automated: boolean;
} = {
    id: 201,
    name: "Checkout",
    status: "failed",
    duration: 650,
    automated: true
};

console.log(`Teste: ${testResult.name}\nStatus: ${testResult.status}\nDuração: ${testResult.duration}ms\nAutomatizado: ${testResult.automated}`);