# Dia 23 — Playwright Test Tags e Annotations

## Exercício 2 — test.skip(), test.fixme(), test.fail() e test.slow()
Responda:

*1. Por que skip e fixme não executam o corpo restante do teste?*
- **Resposta:** Porque skip faz com que o Playwright pule a execução do respectivo teste e fixme indica que o respectivo teste possui defeito conhecido, fazendo o Playwright pular a execução desse teste também.

*2. Qual é a diferença de finalidade entre essas duas Annotations?*
- **Resposta:** Skip indica que o teste deve ser pulado mediante uma condição proposta. Já fixme indica que o teste possui defeito conhecido e precisa de correção.

*3. O que acontece quando um teste marcado com test.fail() passa inesperadamente?*
- **Resposta:** O Playwright acusa comportamento inesperado, pois o teste deveria falhar.

*4. O que muda na execução quando utilizamos test.slow()?*
- **Resposta:** O Playwright triplica o timeout padrão do respectivo teste.
---
## Exercício 3 — Annotations em grupos
Responda:

*1. Qual a vantagem de aplicar uma Annotation diretamente no describe em vez de individualmente em cada teste?*
- **Resposta:** Evitar repetição de código de maneira desnecessária, visto que ao declarar o grupo inteiro com a Annotation desejada, não será necessário adicionar a Annotation para cada teste do grupo.

*2. Qual a diferença entre test.describe.skip() e test.describe.fixme()?*
- **Resposta:** test.describe.skip() indica que o respectivo grupo de testes será pulado mediante a condição proposta. Já test.describe.fixme() indica que o respectivo grupo de testes possui defeito conhecido e precisa de correção.

*3. Os Hooks beforeAll e beforeEach dos grupos desabilitados serão executados normalmente?*
- **Resposta:** Não, os Hooks pertencentes aos grupos desabilitados também não são executados. Isso vale para beforeAll, beforeEach, afterEach e afterAll.
---
## Exercício 4 — Anotações personalizadas e relatórios
Responda:

*1. Qual é a diferença entre Tags e Annotations?*
- **Resposta:** Tag indica o tipo de um teste/grupo de teste, por exemplo: teste/grupo de teste do tipo smoke -> testes que referem aos fluxos principais, ou também: teste/grupo de teste do tipo regression -> testes que referem a regressão. Annotations servem como uma "documentação" específica sobre o teste/grupo de teste, servindo para melhor rastreabilidade e entendimento do respectivo teste/grupo de teste. Podemos resumir assim: Tags -> classificam testes e permitem filtrar a execução, por exemplo, com --grep "@smoke". Annotations -> adicionam metadados para identificar contexto, requisitos, cobertura, defeitos ou informações de execução.

*2. Qual a diferença entre uma Annotation estática e uma adicionada durante a execução?*
- **Resposta:** Na Annotation estática não conseguimos acessar elementos que são possíveis acessar apenas na execução do teste, diferentemente da annotation dinâmica que conseguimos capturar o nome do browser que o teste foi executado, por exemplo.

*3. Qual a vantagem de adicionar Annotations no nível de test.describe()?*
- **Resposta:** A possibilidade de ter uma anotação sobre o grupo de teste em si, fazendo com que possamos personalizar a annotation de cada teste, visto que o teste terá a sua annotation personalizada mais a annotation herdada do grupo.

*4. As Annotations personalizadas modificam o comportamento ou apenas documentam informações sobre os testes?*
- **Resposta:** Apenas documentam informações sobre os testes. Importante distinguir: as Annotations nativas skip, fixme, fail e slow possuem comportamento especial. Portanto, não devemos confundir as Annotations personalizadas com as Annotations de controle de execução.
---