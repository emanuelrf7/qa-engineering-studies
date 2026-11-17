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
## Exercício 2 — Nested Resources e API Filtering
Responda:

*1. O que são Nested Resources e qual é sua finalidade em uma API REST?*
- **Resposta:** Nested Resources são recursos representados hierarquicamente na URL, indicando uma relação entre um recurso pai e um recurso filho. Basicamente, é apenas uma forma de representar a relação entre os recursos. A finalidade prática é representar a hierarquia entre recursos e deixar explícito o contexto do recurso pai.

*2. Qual é a diferença entre /posts/1/comments e /comments?postId=1?*
- **Resposta:** O primeiro corresponde ao endpoint /posts acessando os comentários do post de id 1 através de Nested Resources. Já o segundo corresponde ao endpoint /comments filtrando pelos comentários do post de id 1 através de query parameters.

*3. Por que validamos se todos os comentários possuem postId igual ao ID solicitado?*
- **Resposta:** Porque dessa forma garantimos que os comentários que estamos visualizando são de fato correspondentes ao id solicitado.

*4. Por que comparar os IDs dos resultados das duas rotas é uma validação interessante?*
- **Resposta:** Porque dessa forma trazemos uma maior confiabilidade e resiliência para o script de teste visto que ambas retornam o mesmo conteúdo porém com acessos diferentes. Uma ressalva a ser feita é que como comparamos apenas os IDs, estamos garantindo que as duas rotas retornem o mesmo conjunto de identificadores, não necessariamente que todos os campos dos objetos sejam idênticos.
---