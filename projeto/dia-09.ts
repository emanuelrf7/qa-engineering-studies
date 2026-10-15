function formatTestIdentifier(identifier: string | number): string {
    if (typeof identifier === "number") {
        return `ID numérico: ${identifier}`;        
    }

    return `ID textual: ${identifier}`;
}

console.log(formatTestIdentifier(101));
console.log(formatTestIdentifier("LOGIN-101"));