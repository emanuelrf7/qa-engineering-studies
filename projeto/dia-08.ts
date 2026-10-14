function isTestFailed(status: string): boolean {
    if (status === "failed") {
        return true;
    } else {
        return false;
    }
}

console.log("Teste failed:", isTestFailed("failed"));
console.log("Teste passed:", isTestFailed("passed"));