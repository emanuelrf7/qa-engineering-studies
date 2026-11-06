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
## Exercício 2 — Comparando a execução com diferentes Workers
Responda:

*1. Qual configuração apresentou o menor tempo de execução?*
- **Resposta:** A configuração com 2 workers.

*2. Com --workers=1, quantos testes podem executar simultaneamente?*
- **Resposta:** Apenas 1 teste por execução já que temos apenas 1 worker. Ou seja, nenhum teste é executado simultaneamente.

*3. Com --workers=2 e fullyParallel: true, quantos testes podem executar simultaneamente?*
- **Resposta:** Depende da quantidade de testes totais. No nosso caso, 2 testes podem executar simultaneamente, pois temos 4 testes no total e 2 workers ativos.

*4. Seria adequado aumentar indefinidamente a quantidade de workers para acelerar uma suíte? Por quê?*
- **Resposta:** Não, pois dessa forma os testes que forem dependentes um do outro podem falhar por problemas de race condition, onde um teste ainda não preparou algo importante para o outro, por exemplo. Outros possíveis problemas ao trabalhar com muitos workers são: consumo excessivo de CPU e memória; sobrecarga do servidor ou banco de dados da aplicação; aumento na competição por recursos; execução mais lenta em vez de mais rápida.
---