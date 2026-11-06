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
## Exercício 3 — Entendendo o comportamento de fullyParallel
Responda:

*1. Por que, mesmo utilizando --workers=2, apenas um worker executou os quatro testes?*
- **Resposta:** Devido a configuração fullyParallel: false setada no arquivo playwright.config.ts, que faz com que o Playwright distribua arquivos de teste entre os workers ao invés de distribuir os testes em si.

*2. Com fullyParallel: false, dois arquivos diferentes ainda podem ser executados simultaneamente?*
- **Resposta:** Sim. Os arquivos podem executar simultaneamente, mas os testes dentro de cada arquivo seguem sequencialmente.

*3. Qual seria a vantagem de utilizar fullyParallel: false em uma suíte que possui testes que compartilham algum estado?*
- **Resposta:** Evitar inconsistências em testes que dependem de um/outros testes anteriores, já que cada teste é executado de forma individual e sequencial. Isso não garante isolamento completo, visto que arquivos diferentes ainda podem executar simultaneamente e modificar os mesmos dados.
---
## Exercício 4 — Paralelismo entre arquivos
Responda:

*1. Qual foi a distribuição dos dois arquivos entre os workers?*
- **Resposta:** O Worker 0 foi responsável pela execução sequencial dos testes do arquivo dia-26-extra.spec.ts e o Worker 1 foi responsável pela execução sequencial dos testes do arquivo dia-26.spec.ts.

*2. Por que os testes de um mesmo arquivo mantiveram o mesmo workerIndex?*
- **Resposta:** Porque com fullyParallel: false os arquivos são distribuídos entre os workers. Logo, cada teste possui o mesmo worker que ficou responsável pelo arquivo em que se encontram.

*3. Qual é a diferença entre distribuir testes individualmente e distribuir arquivos inteiros entre workers?*
- **Resposta:** A diferença é: fullyParallel: false -> o arquivo inteiro é distribuído como unidade de trabalho; fullyParallel: true -> os testes individuais também podem ser distribuídos entre diferentes workers.

*4. Em uma suíte com muitos testes, qual das duas estratégias poderia proporcionar melhor distribuição de carga? Quais fatores influenciariam essa escolha?*
- **Resposta:** Na minha opinião, depende. Se forem suítes de teste grandes porém distribuídas em poucos arquivos (como 2 arquivos apenas, por exemplo), acredito que a melhor abordagem seria utilizar fullyParallel: true. Caso as suítes de teste forem grandes ou semelhantes entre si e estiverem distribuídas em muitos arquivos, acredito que a melhor abordagem seria utilizar fullyParallel: false. Além disso, testes que compartilham estado precisam de isolamento adequado, independentemente da configuração. Minha escolha foi influenciada pensando no todo, pensando nas possíveis inconsistências citadas anteriormente, como consumo excessivo de CPU e memória, sobrecarga no servidor ou banco de dados da aplicação, quantidade de workers e tempo de execução de cada teste.
---
## Exercício 5 — Paralelismo seletivo com test.describe.configure()
Responda:

*1. Por que os testes conseguiram executar paralelamente mesmo com fullyParallel: false?*
- **Resposta:** Porque eles estavam dentro de um grupo onde a configuração de execução do grupo era parallel, com o seguinte trecho de código: test.describe.configure({ mode: 'parallel' }).

*2. Qual é a vantagem de utilizar test.describe.configure({ mode: 'parallel' }) em vez de habilitar fullyParallel: true globalmente?*
- **Resposta:** A vantagem é poder configurar apenas grupos de teste específicos que fazem sentido para o devido cenário seguir um comportamento diferente da configuração global.

*3. Por que os testes de um grupo paralelo precisam ser independentes entre si?*
- **Resposta:** Para evitar inconsistências provenientes de outro teste, como por exemplo: teste B depende do teste A, ambos são executados ao mesmo tempo. Teste A não preparou um dado importante para o teste B, teste B falha. Ou seja, testes em modo paralelo podem executar em processos diferentes. Portanto, não devemos depender de variáveis globais, estado compartilhado em memória ou da execução anterior de outro teste.
---
## Exercício 6 — Modo Serial (mode: 'serial')
Responda:

*1. Qual foi o comportamento do Playwright quando o Teste B falhou?*
- **Resposta:** Parou a execução indicando os testes que passaram, falharam e indicando que houve teste que não foi executado, ou seja, foi ignorado pelo mesmo. Isso não significa que toda a suíte ou todos os arquivos sejam interrompidos.

*2. Por que o Teste C foi ignorado, em vez de ser executado normalmente?*
- **Resposta:** Porque o teste B foi reprovado e a configuração do grupo é serial. Logo, o Playwright ignora os testes posteriores a um teste reprovado.

*3. Qual é a principal desvantagem de utilizar mode: 'serial' em uma suíte de testes?*
- **Resposta:** A principal desvantagem está na dependência entre testes que é gerada ao utilizar essa configuração, com uma falha podendo comprometer os testes seguintes. Além disso, com retries habilitados, o grupo inteiro é repetido.

*4. Qual seria a abordagem preferível para evitar que o Teste C dependa do resultado do Teste B?*
- **Resposta:** Fazer com que o teste tenha sua preparação adequada, de forma que não dependa de dados ou resultados de testes anteriores.
---