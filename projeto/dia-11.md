# Dia 11 — Análise de requisitos e criação de cenários de teste

## Exercício 1 — Requisito funcional e regras de negócio
Considere esta história:
Como cliente de uma conta digital, quero realizar transferências via PIX para poder enviar dinheiro para outras pessoas.
A transferência deve possuir valor mínimo de R$1,00 e máximo de R$5.000,00.
O cliente deve possuir saldo suficiente.
Contas bloqueadas não podem realizar transferências.
### Questões:
*1. Qual é o requisito funcional principal?*
- **Resposta:** "Realizar transferências via PIX para poder enviar dinheiro para outras pessoas."

*2. Quais são as regras de negócio presentes?*
- **Resposta:** 1 - "A transferência deve possuir valor mínimo de R$1,00 e máximo de R$5.000,00."; 2 - "O cliente deve possuir saldo suficiente."; 3 - "Contas bloqueadas não podem realizar transferências."

*3. Há alguma informação que você considera importante para testar PIX e que não está definida nessa história? Cite pelo menos 3.*
- **Resposta:** Sim. 1 - O limite de R$5.000,00 é por transferência ou também existe um limite diário?; 2 - Como o sistema deve se comportar caso a chave PIX informada seja inválida ou inexistente?; 3 - O que deve acontecer se ocorrer timeout ou indisponibilidade durante o processamento da transferência?

*4. Por que identificar essas lacunas antes da execução dos testes é importante para o QA?*
- **Resposta:** Pois dessa forma é possível minimizar erros antes da implementação de um requisito funcional/regra de negócio, levando essas lacunas para o Produto/PO melhor esclarecimento. A partir das definições realizadas, novos casos de teste podem ser gerados caso o requisito/regra venha a ser atualizada.
---
## Exercício 2 — Ambiguidades e inconsistências
Considere este requisito:
O usuário poderá redefinir sua senha caso esqueça a senha atual.
O sistema deverá enviar um código de recuperação por e-mail.
O código deve expirar rapidamente.
O usuário poderá solicitar novos códigos quando necessário.
Após algumas tentativas inválidas, novas validações deverão ser bloqueadas temporariamente.
### Questões:
1. Identifique pelo menos 4 trechos ambíguos ou incompletos.
2. Para cada um deles, explique por que não é possível testá-lo de forma objetiva como está escrito.
3. Transforme cada lacuna em uma pergunta para Produto/PO.
4. Existe alguma possível inconsistência ou risco de regra conflitante nesse requisito? Se sim, explique.

| Trecho | Problema identificado | Pergunta para Produto/PO | É possivel testar? - Justificativa | Possível inconsistência / risco de regra conflitante? |
| --- | --- | --- | --- | --- |
| "O código deve expirar rapidamente" | "rapidamente" = quanto tempo? | Qual deve ser o tempo exato para expiração do código? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Não. |
| "Após algumas tentativas inválidas, novas validações deverão ser bloqueadas temporariamente" | "temporariamente" = quanto tempo? | Qual deve ser o tempo exato de bloqueio para novas validações? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Sim, pode conflitar com a regra "o usuário poderá solicitar novos códigos quando necessário" pois não está definido se o bloqueio também impede novas solicitações ou apenas novas validações. |
| "O sistema deverá enviar um código de recuperação por e-mail" | "deverá enviar um código de recuperação por e-mail" = em que ação? | Qual é o fluxo/ação que o usuário deve realizar para receber o código de recuperação? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Não foi identificado conflito direto, mas o fluxo está incompleto e existe dependência entre a solicitação de recuperação e o envio do código. |
| "Após algumas tentativas inválidas, novas validações deverão ser bloqueadas temporariamente" | "Após algumas tentativas inválidas..." = quantas tentativas? | O usuário pode realizar quantas tentativas inválidas para que aconteça o bloqueio? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Não. |
---