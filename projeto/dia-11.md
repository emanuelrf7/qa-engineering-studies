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