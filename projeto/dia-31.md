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
## Exercício 2 — Operações POST, PUT e DELETE
Responda:

*1. Qual é a diferença entre POST e PUT em relação à finalidade de cada operação?*
- **Resposta:** POST -> Tem como finalidade inserir algo novo ao sistema, como um novo cadastro, por exemplo. PUT -> Tem como finalidade substituir/atualizar algo já existente no sistema de forma completa. Para atualizações parciais, seria utilizado PATCH. Um detalhe adicional: dependendo da API, PUT também pode criar um recurso caso ele ainda não exista no endereço informado.

*2. Por que utilizamos data para enviar o objeto nas requisições POST e PUT?*
- **Resposta:** Porque para requisições POST e PUT é necessário informar as inserções desejadas, e essa é a responsabilidade do data, que permite enviar o conteúdo da requisição no corpo (request body). O Playwright serializa esse objeto como JSON automaticamente.

*3. Qual é a diferença entre os status HTTP 200 e 201?*
- **Resposta:** HTTP 200 -> Indica que a requisição foi executada e teve sucesso (OK). HTTP 201 -> Indica que a requisição foi executada com sucesso e que o novo recurso foi criado corretamente (Created).

*4. Por que não podemos concluir que um recurso foi realmente persistido no JSONPlaceholder apenas porque recebemos uma resposta HTTP 201?*
- **Resposta:** Porque o status code indica o status da requisição, e não constata que aquela informação foi de fato persistida no sistema. Para isso, o ideal seria realizar uma nova requisição GET ao endpoint correspondente, caso a API ofereça essa garantia.
---
## Exercício 3 — Organização e reutilização de testes de API
Responda:

*1. Qual é a vantagem de configurar baseURL em vez de repetir a URL completa em cada requisição?*
- **Resposta:** Dessa forma centralizamos a URL base do nosso sistema fazendo com que os testes recebam apenas o caminho relativo, tornando a manutenção mais fácil e deixando o código mais legível.

*2. Qual é a responsabilidade da propriedade params em uma requisição?*
- **Resposta:** Enviar os query params da requisição.

*3. Qual é a diferença entre enviar dados utilizando data e utilizar params?*
- **Resposta:** Com data, fazemos a inserção dos dados direto no corpo da requisição (request body). Já com params, fazemos a inserção dos dados na query string da URL.

*4. Por que validamos todos os resultados com posts.every() em vez de verificar apenas se o primeiro post pertence ao usuário 1?*
- **Resposta:** Porque um usuário pode ter mais de um post. Logo, utilizamos posts.every() verificando o id do usuário para cobrir todos os posts desse usuário. Um detalhe adicional: a validação anterior também é importante, pois sem ela um array vazio também faria every() retornar true. Portanto, as duas asserções se complementam.
---