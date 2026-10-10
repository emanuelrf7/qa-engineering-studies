import { validarResultados, possuiResultadosInvalidos } from "./utils/resultadoUtils.js";

const resultadosValidos = [
    { nome: "Login válido", status: "passed" },
    { nome: "Logout", status: "passed" }
];

const resultadosInvalidos = [
    { nome: "Login válido", status: "passed" },
    { nome: "   ", status: "failed" }
];

const resultadosInvalidos2 = [
    { nome: "Login válido", status: "passed" },
    { nome: null, status: "failed" }
];

console.log(validarResultados(resultadosValidos));
console.log(validarResultados(resultadosInvalidos));
console.log(validarResultados(resultadosInvalidos2));
console.log(possuiResultadosInvalidos(resultadosValidos));
console.log(possuiResultadosInvalidos(resultadosInvalidos));
console.log(possuiResultadosInvalidos(resultadosInvalidos2));