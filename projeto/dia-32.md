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