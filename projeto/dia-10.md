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
## Exercício 4 - Transição de Estados
Considere um sistema de autenticação com estes estados: Deslogado -> Logado -> Bloqueado.
Regras:
- Deslogado + login válido -> **Logado**
- Deslogado + login inválido -> permanece **Deslogado**
- após 3 tentativas inválidas consecutivas, o usuário vai para **Bloqueado**
- Logado + logout -> **Deslogado**
- **Bloqueado** não permite login

### Questões:
*1. Quais são os estados existentes?*
- **Resposta:** Logado, Deslogado e Bloqueado.

*2. Quais eventos/ações podem causar transição?*
- **Resposta:** Login válido, login inválido, terceira tentativa inválida consecutiva e logout.

*3. Qual é o estado inicial mais provável?*
- **Resposta:** Deslogado.

*4. Monte uma tabela com: Estado atual -> Evento -> Próximo estado -> Resultado esperado. Inclua pelo menos estes cenários:*

    - Login válido estando deslogado;
    - Login inválido estando deslogado;'
    - Terceira tentativa inválida consecutiva;
    - Logout estando logado;
    - Tentativa de login estando bloqueado.

| Estado atual | Evento | Próximo estado | Resultado esperado |
| --- | --- | --- | --- |
| Deslogado | Login válido | Logado | Login efetuado com sucesso |
| Deslogado | Login inválido | permanece Deslogado | Login não realizado |
| Deslogado | Login inválido pela terceira vez consecutiva | Bloqueado | Usuário bloqueado após três tentativas consecutivas de login sem sucesso |
| Logado | Logout válido | Deslogado | Usuário deslogado com sucesso |
| Bloqueado | Tentativa de login | permanece Bloqueado | Login não permitido |

*5. Por que, nesse cenário, testar apenas "login válido" e "login inválido" sem considerar o estado atual seria insuficiente?*
- **Resposta:** Pois o mesmo evento pode produzir resultados diferentes dependendo do estado atual do sistema, podendo ocasionar bugs relacionados a transições incorretas ou ações que deveriam ser bloqueadas.
---
## Exercício 5 - Escolha da Técnica de Teste
Para cada cenário abaixo, diga:
1. Qual técnica você escolheria como principal;
2. Por que essa técnica é adequada.

Cenário A -> Um campo aceita valores inteiros de 10 a 100, inclusive.

Cenário B -> Uma transferência bancária é permitida somente se:
- A conta estiver ativa;
- Houver saldo suficiente;
- O limite diário não tiver sido excedido.

Cenário C -> Um pedido pode passar pelos estados: Criado -> Pago -> Enviado -> Entregue. Também pode ser cancelado antes de ser enviado.

Cenário D -> Um campo de quantidade aceita valores entre 1 e 50, mas você quer reduzir a quantidade de testes escolhendo valores representativos de entradas válidas e inválidas.

Cenário E -> Um usuário é bloqueado após 5 tentativas consecutivas de login inválido e permanece bloqueado até ocorrer um desbloqueio administrativo.

Responder em tabela:

| Cenário | Técnica principal | Justificativa |
| --- | --- | --- |
| A | Análise de Valor Limite | É a técnica adequada para esse cenário por focar nos limites válidos e imediatamente próximos a eles, evitando testes pouco representativos, visto que há uma faixa de valores inteiros de 10 a 100. |
| B | Tabela de decisão | Para esse cenário, podemos chegar a diversos resultados levando em consideração várias combinações de condições diferentes. Portanto, a técnica de Tabela de decisão se torna a mais adequada. |
| C | Transição de estados | O cenário diz que existem 5 estados possíveis de pedido, que são eles: Criado, Pago, Enviado, Entregue e Cancelado. Levando em consideração os diferentes estados que o pedido pode se encontrar, a técnica de transição de estados se encaixa perfeitamente para esse cenário. |
| D | Particionamento de Equivalência | Para esse cenário a técnica mais adequada também é a técnica de Particionamento de Equivalência, pois a intenção é reduzir a quantidade de testes visando escolher valores representativos de entradas válidas e inválidas. Logo, a respectiva técnica se enquadra perfeitamente para o cenário estabelecido. |
| E | Transição de estados | Para esse cenário, a técnica mais adequada é novamente a Transição de estados, visto que são citados alguns valores pertinentes para a aplicação desta técnica: Estado atual (Deslogado -> Indicado de forma implícita nesse caso), Evento (Bloqueio após 5 tentativas de login inválido), Próximo estado (Bloqueado) e Resultado esperado (Login não realizado e permanência em estado Bloqueado até desbloqueio administrativo). |
---
## Exercício 6 - Desafio Final
Cenário - Saque em conta digital
Considere as seguintes regras:
- O valor do saque deve estar entre R$20 e R$1.000, inclusive.
- O cliente pode sacar somente se:
    - A conta estiver ativa;
    - Houver saldo  suficiente;
    - A conta não estiver bloqueada.
- Após 3 tentativas consecutivas de senha inválida, a conta entra no estado Bloqueada.
- Uma conta bloqueada só volta ao estado Ativa após desbloqueio administrativo.

Parte 1 - Identificação das técnicas
| Regra | Técnica principal | Justificativa |
| --- | --- | --- |
| Valor permitido entre R$ 20 e R$ 1.000 | Análise de Valor Limite | Como queremos focar nas bordas dos valores, utilizamos a Análise de Valor Limite. Dessa forma analisamos os valores de borda dos limites mínimo e máximo. |
| Conta ativa + saldo suficiente + não bloqueada | Tabela de decisão | Aqui possuímos resultados diferentes mediante a combinação de várias condições das que foram propostas. Dito isso, a Tabela de decisão é a técnica que melhor se encaixa para essa regra. |
| Bloqueio após 3 senhas inválidas | Transição de estados | Para essa regra, temos implícito o estado Ativa que, após 3 tentativas consecutivas de senha inválida, faz com que a conta entre no estado Bloqueada. A conta só volta ao estado Ativa após desbloqueio administrativo. Portanto, a técnica mais adequada é a Transição de estados. |

Parte 2 - Aplicação prática
Para a regra do valor do saque:
1. Defina as partições de equivalência.
- **Resposta:** Partição 1 -> valor < R$20 - Inválido; Partição 2 -> R$20 <= valor <= R$1.000 - Válido; Partição 3 -> valor > R$1.000 - Inválido.

2. Escolha um representante de cada partição.
- **Resposta:** Partição 1 -> R$19,99; Partição 2 -> R$20; Partição 3 -> R$1.000,01.

3. Defina os valores que você testaria com análise de valor limite.
- **Resposta:** Para o limite mínimo: R$19,99, R$20 e R$20,01. Para o limite máximo: R$999,99, R$1.000 e R$1.000,01.

Parte 3 - Combinação de condições
Monte uma tabela considerando: Conta ativa? / Saldo suficiente? / Conta bloqueada?
Preencha todas as combinações e use como resultado: Saque permitido / Saque recusado.

| Conta ativa? | Saldo suficiente? | Conta bloqueada? | Resultado esperado |
| --- | --- | --- | --- |
| Sim | Sim | Sim | Saque recusado |
| Sim | Sim | Não | Saque permitido |
| Sim | Não | Não | Saque recusado |
| Sim | Não | Sim | Saque recusado |
| Não | Não | Não | Saque recusado |
| Não | Não | Sim | Saque recusado |
| Não | Sim | Sim | Saque recusado | 
| Não | Sim | Não | Saque recusado |

Parte 4 - Transição de estados
Considere: Ativa / Bloqueada
Monte uma tabela com: Estado atual -> Evento -> Próximo estado -> Resultado esperado

Inclua pelo menos:
- Senha válida com conta ativa;
- Primeira tentativa inválida;
- Terceira tentativa inválida consecutiva;
- Tentativa de operação com conta bloqueada;
- Desbloqueio administrativo.

| Estado atual | Evento | Próximo estado | Resultado esperado |
| --- | --- | --- | --- |
| Ativa | Senha válida  | permanece Ativa | Autenticação permitida |
| Ativa | Primeira tentativa de senha inválida | permanece Ativa | Operação não autorizada; conta ainda ativa |
| Ativa | Terceira tentativa inválida consecutiva | Bloqueada | Operação não autorizada e conta bloqueada |
| Bloqueada | Tentativa de saque | permanece Bloqueada | Saque não permitido |
| Bloqueada | Desbloqueio administrativo da conta | Ativa | Conta desbloqueada e retorna ao estado Ativa |

### Questões finais:
*1. Por que uma técnica de teste não seria suficiente para cobrir bem essa funcionalidade?*
- **Resposta:** Pois existem diferentes regras que levam a diferentes abordagens de teste, visando a maior cobertura e qualidade de testes da mesma, pois dessa forma é possível validar valores, combinações de condições e mudanças de estado.

*2. Qual técnica você considera mais adequada para encontrar erros nas bordas dos valores?*
- **Resposta:** Análise de Valor Limite.

*3. Qual técnica é mais adequada para encontrar erros causados pela combinação de regras?*
- **Resposta:** Tabela de decisão.

*4. Qual técnica é mais adequada para detectar comportamentos incorretos ao longo do ciclo de vida de um estado?*
- **Resposta:** Transição de estados.
---