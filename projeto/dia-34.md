# Dia 34 — API Testing: Response Schema Validation

## Exercício 1 — Validando o schema de uma resposta
Responda:

*1. Qual é a diferença entre utilizar uma tipagem TypeScript (as Post) e validar os dados com Ajv?*
- **Resposta:** Com Ajv temos mais liberdade para realizar as validações pois podemos definir o contrato esperado para as respostas, quais propriedades existem e quais são obrigatórias, se propriedades adicionais são permitidas e etc. Além disso, as Post é uma asserção de tipo do TypeScript. Ela informa ao compilador que deve tratar aquele valor como Post, mas não verifica os dados recebidos em tempo de execução. Já o Ajv realiza uma validação real dos dados recebidos, comparando-os com o schema. Portanto: TypeScript verifica tipos durante o desenvolvimento; Ajv valida dados em runtime.

*2. Qual é a finalidade de required e additionalProperties em um JSON Schema?*
- **Resposta:** O required serve para indicar quais propriedades do contrato da API são obrigatórias. Já o additionalProperties indica se é permitido propriedades adicionais na validação do contrato da API.

*3. Por que utilizamos allErrors: true?*
- **Resposta:** Porque dessa forma podemos visualizar todos os erros de validação de uma só vez.

*4. Qual é a vantagem de compilar o schema fora do corpo do teste e reutilizar a função de validação?*
- **Resposta:** Melhor manutenibilidade do script de teste e legibilidade de código, visto que não será necessário repetir código de compilação todas as vezes que for necessário.
---
## Exercício 2 — Negative Schema Validation
Responda:

*1. Qual é a diferença entre um teste negativo de status HTTP (400/404) e um teste negativo de validação de schema?*
- **Resposta:** Nos testes de status HTTP, realizamos uma requisição e verificamos a resposta do servidor. Já nos testes negativos de schema que implementamos, não realizamos requisições. Estamos passando objetos diretamente para o Ajv para verificar se ele rejeita dados que violam o contrato. Portanto, estamos testando o comportamento do validador, não o comportamento de um endpoint.

*2. Por que verificamos validationErrors além de simplesmente garantir que isValid seja false?*
- **Resposta:** Porque quando validamos isValid.toBe(false) estamos validando apenas que o objeto não é válido. Com validationErrors podemos validar qual foi o erro encontrado na validação.

*3. O que representa a propriedade keyword de um erro do Ajv?*
- **Resposta:** Qual o tipo do erro encontrado na validação, como por exemplo: se a keyword for "required", indica que foi um erro de propriedade obrigatória que não foi encontrada para o objeto validado.

*4. Qual é a importância de allErrors: true quando recebemos um objeto com várias inconsistências?*
- **Resposta:** Tornar possível a análise de todos essas inconsistências do objeto de uma só vez.
---