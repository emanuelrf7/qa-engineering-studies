# Dia 10 - Test Design

## Exercício 1 - Particionamento de equivalência

Uma aplicação permite cadastrar uma quantidade de parcelas.
Regra:
- O número de parcelas deve estar entre 1 e 2, inclusive.
Considere apenas números inteiros.

### Questões:
1. *Quantas partições de equivalência existem?*
- **Resposta:** 3.
2. *Quais são as partições válidas e inválidas?*
- **Resposta:** parcelas < 1 -> Inválido; 1 <= idade <= 12 -> Válido; idade > 12 -> Inválido.
3. *Escolha um valor representativo para cada partição.*
- **Resposta:** Partição 1 -> 0; Partição 2 -> 7; Partição 3 -> 20.
4. Escreva os casos no formato:
Entrada:
Partição:
Resultado esperado:

| Entrada | Partição | Resultado esperado |
| --- | --- | --- |
| parcelas < 1 | 0 | Inválido |
| 1 <= parcelas <= 12 | 7 | Válido |
| parcelas > 12 | 20 | Inválido |
---
## Exercício 2 - Análise de Valor Limite
Regra:
- O número de parcelas deve estar entre 1 e 12, inclusive.

### Questões:
1. *Quais são os dois limites da regra?*
- **Resposta:** 1 (limite mínimo), 12 (limite máximo).
2. *Quais valores você escolheria usando análise de valor limite?*
- **Resposta:** Para o limite mínimo -> 0, 1 e 2 (valor logo abaixo do limite mínimo, valor mínimo e valor logo acima do limite mínimo, respectivamente). Para o limite máximo -> 11, 12 e 13 (valor logo abaixo do limite máximo, valor máximo e valor logo acima do limite máximo, respectivamente).
3. *Para cada valor escolhido, indique se o resultado esperado é válido ou inválido.*
- **Resposta:** 0 -> Inválido; 1 -> Válido; 2 -> Válido. 11 -> Válido; 12 -> Válido; 13 -> Inválido.
4. *Organize os casos em uma tabela Markdown com essas colunas: Valor -> Relação com o limite -> Resultado esperado.*

| Valor | Relação com o limite | Resultado esperado |
| --- | --- | --- |
| 0 | Valor logo abaixo do limite mínimo | Inválido |
| 1 | Valor mínimo | Válido |
| 2 | Valor logo acima do limite máximo | Válido |
| 11 | Valor logo abaixo do limite mínimo | Válido |
| 12 | Valor máximo | Válido |
| 13 | Valor logo acima do limite máximo | Inválido |
---
## Exercício 3 - Tabela de Decisão

Regra:
- Um usuário pode finalizar uma compra somente se:
    1. Estiver ativo;
    2. Não estiver bloqueado;
    3. Possuir saldo suficiente.

### Questões:
*1. Quais são as três condições envolvidas?*
- **Resposta:** Usuário estar ativo, não estar bloqueado e possuir saldo suficiente.

*2. Qual é a ação/resultado que estamos decidindo?*
- **Resposta:** Possibilidade de finalizar uma compra por parte do usuário.

*3. Quantas combinações possíveis existem considerando que cada condição pode ser apenas **Sim** ou **Não**?*
- **Resposta:** 8 Combinações.

*Monte uma tabela Markdown:*
| Usuário ativo? | Usuário bloqueado? | Saldo suficiente? | Resultado esperado |
| --- | --- | --- | --- |
| Sim | Sim | Sim | Compra recusada |
| Sim | Sim | Não | Compra recusada |
| Sim | Não | Sim | Compra aprovada |
| Sim | Não | Não | Compra recusada |
| Não | Sim | Sim | Compra recusada |
| Não | Sim | Não | Compra recusada |
| Não | Não | Sim | Compra recusada |
| Não | Não | Não | Compra recusada |

*4. Quantas combinações resultam em compra aprovada?*
- **Resposta:** Apenas uma, onde a primeira condição é Sim, a segunda é Não e a última Sim.

*5. Por que uma tabela de decisão é mais útil nesse cenário do que testar cada condição isoladamente?*
- **Resposta:** Pois só é possível chegar a um resultado específico (seja ele válido ou não) através da combinação de condições.
---