# Dia 26 — Execução paralela, Workers e isolamento de testes

## Exercício 1 — Identificando os Workers
Responda:

*1. Qual é a diferença entre workerIndex e parallelIndex?*
- **Resposta:** workerIndex é o identificador único do processo worker. Quando ele é reiniciado, recebe um novo índice. Já parallelIndex identifica a posição do worker no conjunto de workers disponíveis. Vai de 0 até workers - 1 e permanece igual quando aquele worker é reiniciado.

*2. Por que os quatro testes podem ser executados paralelamente mesmo estando no mesmo arquivo?*
- **Resposta:** Devido a configuração fullyParallel: true no arquivo playwright.config.ts.

*3. Que tipo de problema pode acontecer quando testes paralelos modificam os mesmos dados em um banco de dados?*
- **Resposta:** Pode ocorrer um problema de Race Condition quando, por exemplo, dois testes modificam simultaneamente os mesmos dados e o resultado depende da ordem das operações.
---