# Dia 32 — API Testing: Headers e Authentication

## Exercício 1 — HTTP Request Headers e Response Headers
Responda:

*1. Qual é a diferença entre Request Headers e Response Headers?*
- **Resposta:** Request Headers -> Informações enviadas pelo cliente ao servidor, como Content-Type, Authorization e Accept. Response Headers -> Informações devolvidas pelo servidor, como Content-Type, Cache-Control e Set-Cookie. 

*2. Qual é a finalidade do header Content-Type?*
- **Resposta:** Identificar o formato do conteúdo transportado no corpo da mensagem HTTP. Indica que o corpo da requisição ou resposta está no formato JSON. Não devemos confundi-lo com Accept, que indica quais formatos de resposta o cliente aceita receber.

*3. Qual é a diferença entre response.headers() e os headers retornados dentro de body.headers pelo Postman Echo?*
- **Resposta:** response.headers() corresponde aos Response Headers enviados pelo servidor. Já body.headers corresponde aos Request Headers recebidos pelo Postman Echo.

*4. Por que é importante validar se um header personalizado foi efetivamente recebido pelo servidor?*
- **Resposta:** Para evitar erros de manipulação de headers no script de teste que não foram recebidos pelo servidor como o esperado, tornando a suíte mais resiliente.
---
## Exercício 2 — APIRequestContext reutilizável
Responda:

*1. Qual é a diferença entre utilizar a fixture request e criar manualmente um contexto com playwright.request.newContext()?*
- **Resposta:** A possibilidade de personalizar um contexto reutilizável entre mais de uma requisição no mesmo teste. Outras diferenças são que a fixture request é criada manualmente, possui armazenamento independente, exige o dispose() manual e permite configurar opções próprias.

*2. Qual é a responsabilidade de extraHTTPHeaders?*
- **Resposta:** Permitir que sejam informados Headers HTTP extras, como no nosso exemplo o "x-qa-course" que foi criado com esse intuito.

*3. Por que precisamos chamar apiContext.dispose()?*
- **Resposta:** Porque sua responsabilidade é descartar os recursos associados ao contexto, incluindo as respostas armazenadas em memória. Dessa forma, depois de descartado, o contexto não pode mais ser utilizado.

*4. Qual é a evidência no nosso segundo teste de que o contexto está sendo reutilizado corretamente?*
- **Resposta:** O fato de utilizarmos novamente a mesma variável apiContext criada anteriormente. Sendo assim, a segunda requisição recebe automaticamente os headers configurados na criação do contexto. Logo, as duas validações "expect(body.headers...)..." confirmam que as configurações foram preservadas na segunda requisição.
---
## Exercício 3 — Autenticação com Bearer Token
Responda:

*1. Qual é a finalidade do header Authorization em uma requisição autenticada?*
- **Resposta:** Transportar as credenciais e informar o esquema de autenticação utilizado.

*2. Qual é a diferença entre autenticação e autorização?*
- **Resposta:** Authentication (autenticação) -> Verifica quem é o cliente e se suas credenciais são válidas. Authorization (autorização) -> Verifica o que esse cliente está autorizado a fazer.

*3. Por que uma requisição sem Bearer Token recebe HTTP 401?*
- **Resposta:** Porque é o status code adequado para a situação. 401 Unauthorized indica que as credenciais estão ausentes ou inválidas. Logo, o cliente não foi autenticado corretamente. Caso o cliente tivesse sido autenticado corretamente mas não possuísse autorização para acessar determinado recurso, o status code deveria ser 403 Forbidden.

*4. Por que não devemos armazenar tokens reais diretamente no código-fonte do projeto?*
- **Resposta:** Porque dessa forma usuários maliciosos podem usufruir do token válido para ataques nos endpoints, com o intuito de capturar alguma informação importante ou até mesmo roubar dados.
---