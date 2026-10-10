function calcularMedia(nota1, nota2) {
    if (nota1 < 0 || nota1 > 10) {
        throw new Error("Nota 1 inválida");
    }

    if (nota2 < 0 || nota2 > 10) {
        throw new Error("Nota 2 inválida");
    }

    return (nota1 + nota2) / 2;
}

export default calcularMedia;