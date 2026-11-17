# Dia 33 — API Testing: Request Chaining

## Exercício 1 — Request Chaining
Responda:

*1. O que caracteriza um Request Chaining e qual é sua principal finalidade?*
- **Resposta:** A possibilidade de utilizar informações capturadas em uma requisição para outras requisições posteriores.

*2. Por que utilizamos post.userId na segunda requisição em vez de informar diretamente /users/1?*
- **Resposta:** Porque utilizando Request Chaining conseguimos reaproveitar essa informação que foi capturada na primeira requisição, permitindo criarmos scripts de teste mais resilientes e menos dependentes de informações "hard-coded".

*3. Por que validamos o status HTTP das duas requisições individualmente?*
- **Resposta:** Porque embora utilizemos informações reaproveitadas cada requisição é indivídual, sendo assim, precisamos realizar validação para cada uma delas. Além disso, caso haja um erro na primeira requisição a segunda consequentemente falharia também, visto que a segunda requisição depende do sucesso da primeira.

*4. Qual é a diferença entre validar dois endpoints isoladamente e validar o relacionamento entre eles?*
- **Resposta:** Quando validamos os endpoints separadamente estamos validando o contrato de cada endpoint individualmente. Já quando validamos o relacionamento entre eles, estamos validando a integração e o contrato proposto para a relação entre esses endpoints.
---