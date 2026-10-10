import fs from "fs";

function carregarJson(caminhoArquivo) {
    try {
        const conteudoJson = fs.readFileSync(caminhoArquivo, "utf-8");
        const dados = JSON.parse(conteudoJson);
        return dados;
    } catch (erro) {
        console.log(`Erro ao carregar JSON: ${erro.message}`);
        return [];
    }
}

function salvarJson(caminhoArquivo, dados) {
    try {
        const conteudoJson = JSON.stringify(dados, null, 2);
        fs.writeFileSync(caminhoArquivo, conteudoJson);
        console.log("Arquivo salvo com sucesso");
    } catch (erro) {
        console.log(`Erro ao salvar JSON: ${erro.message}`);
    }
}

export {
    carregarJson,
    salvarJson
};