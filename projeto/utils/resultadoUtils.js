function gerarResumo(resultados) {
    const resumo = resultados.reduce((acumulador, resultado) => {
        acumulador.total += 1;

        if (resultado.status === "passed") {
            acumulador.aprovados += 1;
        }

        if (resultado.status === "failed") {
            acumulador.falhos += 1;
        }

        if (resultado.status === "skipped") {
            acumulador.ignorados += 1;
        }

        if (resultado.status !== "passed" && resultado.status !== "failed" && resultado.status !== "skipped") {
            acumulador.desconhecidos += 1;
        }

        return acumulador;
    },
        {
            total: 0,
            aprovados: 0,
            falhos: 0,
            ignorados: 0,
            desconhecidos: 0
        }
    );
    
    return resumo;
}

function campoTextoValido(valor) {
    return typeof valor === "string" && valor.trim().length > 0;
}

function validarResultados(resultados) {
    return resultados.every(resultado => campoTextoValido(resultado.nome) && campoTextoValido(resultado.status));
}

function possuiResultadosInvalidos(resultados) {
    return resultados.some(resultado => !campoTextoValido(resultado.nome) || !campoTextoValido(resultado.status));
}

function processarResultados(resultados) {
    if (possuiResultadosInvalidos(resultados)) {
        throw new Error("Existem resultados inválidos");
    }

    return gerarResumo(resultados);
}

export {
    gerarResumo,
    validarResultados,
    possuiResultadosInvalidos,
    processarResultados
};