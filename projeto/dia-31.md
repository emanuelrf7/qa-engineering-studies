# Dia 31 — API Testing com Playwright

## Exercício 1 — Primeira requisição GET
Responda:

*1. Qual é a diferença entre utilizar a fixture page e a fixture request?*
- **Resposta:** A fixture page serve para acessar uma página web e manipular a mesma para executar um comportamento do sistema através de um script de teste. Já a fixture request serve para testar endpoints HTTP enviando requisições como GET, POST, PUT e etc.

*2. Qual é a diferença entre response.status() e response.ok()?*
- **Resposta:** O response.status() retorna o status code da requisição executada. Já o response.ok() verifica através de um boolean se o status code retornado está entre 200 e 299 indicando que foi uma requisição de sucesso, sendo true para valor dentro do escopo citado e false para valor fora do escopo citado.

*3. Por que utilizamos await response.json() antes de validar os campos do post?*
- **Resposta:** O que acontece é a leitura e conversão do corpo da resposta para um objeto JavaScript. O await é necessário porque essa operação é assíncrona. Logo, estamos interpretando seu conteúdo para conseguir validar os campos. Outro detalhe: se o corpo não contiver um JSON válido, response.json() lançará um erro.

*4. O que estamos verificando ao utilizar expect.any(String)?*
- **Resposta:** Estamos verificando que o valor dessas propriedades pode ser qualquer um desde que esse valor seja do tipo String. Então pode ser tanto '' (string vazia) como 'teste' (string preenchida), por exemplo.
---