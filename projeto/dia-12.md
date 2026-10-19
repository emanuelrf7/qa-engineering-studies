# Dia 12 — Bug Reporting e documentação de defeitos

## Exercício 1 — Bug ou não bug?
Analise os cenários abaixo e classifique cada um como:
- Bug
- Dúvida/Lacuna
- Comportamento esperado
Justifique brevemente

Cenário A

*Regra:*
*- Usuários bloqueados não podem realizar PIX.*

Comportamento observado:

**- Usuário bloqueado consegue finalizar uma transferência PIX com sucesso.**

Cenário B

*Regra:*
*- O código de recuperação deve expirar rapidamente.*

Comportamento observado:

**- Código permanece válido por 10 minutos.**

Cenário C

*Regra:*
*- Após 3 tentativas consecutivas de senha inválida, a conta deve ser bloqueada.*

Comportamento observado:

**- Após a terceira tentativa inválida, a conta é bloqueada.**

Cenário D

*Regra:*
*- O valor máximo permitido para saque é R$1.000,00.*

Comportamento observado:

**- Saque de R$1.000,01 é recusado.**

Cenário E

*Regra:*
*- Compras acima de R$2.000 exigem confirmação adicional.*

Comportamento observado:

**- Compra de exatamente R$2.000 não solicita confirmação adicional.**

Responda em tabela:

| Cenário | Classificação | Justificativa |
| --- | --- | --- |
| A | Bug | A regra diz explicitamente que usuários bloqueados não podem realizar transferências PIX, e o comportamento observado foi que um usuário mesmo bloqueado conseguiu finalizar a transferência com sucesso, logo o comportamento observado é um bug. |
| B | Dúvida/Lacuna | Não há como dar certeza se o tempo em que o código ficou válido está correto pois o requisito está vago/ambíguo. "Rapidamente" pode levar a diferentes interpretações de pessoa para pessoa. |
| C | Dúvida/Evidência insuficiente | Eu vou considerar essa uma dúvida pois o comportamento observado diz que após a terceira tentativa inválida a conta foi bloqueada mas em momento algum diz que foram três vezes consecutivas. Logo, não é possível dizer com certeza se o comportamento foi o esperado ou se foi um bug de fato (considerando que a conta ser bloqueada após três tentativas inválidas seja um bug, já que a regra diz explicitamente que devem ser três tentativas consecutivas). |
| D | Comportamento esperado | A regra diz que o valor máximo permitido para saque é R$1.000,00 e R$1.000,01 já excede o respectivo valor, mesmo que por muito pouco. |
| E | Comportamento esperado | A regra diz que compras ACIMA de R$2.000 exigem confirmação adicional, logo uma compra de exatamente R$2.000 não deve solicitar a confirmação adicional. |
---
## Exercício 2 — Títulos de bug
Para cada cenário abaixo, escreva um **título de bug** objetivo.

*Cenário A*

**Na tela de login, um usuário bloqueado informa credenciais válidas e consegue acessar a aplicação.**

*Cenário B*

**No checkout, ao pagar com PIX, o QR Code não é exibido após selecionar essa forma de pagamento.**

*Cenário C*

**Na recuperação de senha, o código expirado há mais de 5 minutos ainda é aceito.**

*Cenário D*

**Na tela de saque, ao informar R$1.000,01, o sistema realiza o saque mesmo com limite máximo de R$1.000.**

*Cenário E*

**Na tela de perfil, após alterar o nome e clicar em Salvar, o novo nome aparece na tela, mas volta ao valor anterior após atualizar a página.**

Responda assim:

| Cenário | Título do bug |
| --- | --- |
| A | Login — Usuário bloqueado consegue acessar o sistema com credenciais válidas |
| B | Checkout — QR Code não é exibido para pagamentos via PIX no Checkout de compras |
| C | Login — Código de recuperação de senha expirado ainda é aceito pelo sistema |
| D | Saque — Sistema permite saque acima do limite máximo de R$1.000,00 |
| E | Perfil — Edição de nome não persiste no sistema ao atualizar a página |
---