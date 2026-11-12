# Dia 29 — Playwright Reporters

## Exercício 1 — Built-in Terminal Reporters
Responda:

*1. Qual é a principal diferença entre os reporters list e dot?*
- **Resposta:** O list exibe uma linha detalhada para cada teste executado. Já o dot exibe um símbolo compacto que representa o status do teste que foi executado.

*2. Em qual situação o reporter line pode ser mais interessante que o list?*
- **Resposta:** Quando temos muitos testes, o line é especialmente útil. Ele utiliza uma única linha para apresentar o progresso e o último teste concluído, sem gerar uma saída permanente para cada teste, como acontece no list. As falhas continuam sendo apresentadas para investigação.

*3. Por que o reporter dot é uma boa escolha para ambientes de CI/CD?*
- **Resposta:** Porque o reporter dot exibe um resultado compacto que torna a visibilidade do mesmo melhor na exibição de logs de uma pipeline, onde diversos comandos são executados sequencialmente.
---
## Exercício 2 — HTML Reporter
Responda:

*1. Quais informações o HTML Reporter apresenta que tornam sua análise mais confortável do que a utilização exclusiva dos reporters de terminal?*
- **Resposta:** O campo de search para buscar os testes, a guia Summary que traz um resumo de cada teste, seu status, projeto executado e tempo de execução e os campos de filtro, onde é possível filtrar por todos os testes, apenas nos que passaram, apenas nos que falharam, apenas nos que o Playwright considerou flaky, apenas nos que foram ignorados e rankeando o Summary do mais demorado para o mais rápido no tempo de execução. Além de todas essas informações, ainda é possível analisar informações detalhadas de um teste específico ao clicar no mesmo, onde são exibidas outras informações como os passos (steps) da execução.

*2. Qual é a finalidade de test.step() e como ele contribui para a organização do relatório?*
- **Resposta:** O test.step() tem como objetivo tornar um passo (step) de execução mais fácil de compreender o que o trecho de código do script visa replicar, tornando o entendimento do fluxo mais entendível principalmente para usuários não-técnicos. Outro benefício é que os passos (steps) executados também aparecem em ferramentas de diagnóstico, como o Trace Viewer.

*3. Qual é a diferença entre as opções always, on-failure e never?*
- **Resposta:** Always -> Sempre abre o HTML Playwright Report após a execução de uma suíte, independente do status; On-failure -> Abre o HTML Playwright Report apenas quando existe pelo menos uma falha nos testes que foram executados; Never -> Nunca abre o HTML Playwright Report.
---
## Exercício 3 — JSON Reporter e JUnit Reporter
Responda:

*1. Qual é a principal diferença entre JSON Reporter e JUnit Reporter em relação à estrutura dos dados?*
- **Resposta:** No JSON Reporter os dados são estruturados em objetos JSON, já no JUnit Reporter os dados são estruturados no formato XML. O JSON Reporter pode ser útil para relatórios de teste automatizados personalizados e o JUnit Reporter pode ser útil para ferramentas de CI/CD que suportem esse formato. Além disso, outra diferença é que o JSON Reporter exibe muito mais informações sobre os testes que o JUnit Reporter.

*2. Por que o formato JUnit XML é interessante para integração com ferramentas de CI/CD?*
- **Resposta:** Porque grandes ferramentas CI/CD possuem suporte ao formato XML, dando ao gerenciador da ferramenta uma possibilidade de integrar o relatório gerado diretamente pela execução da suíte de testes.

*3. Qual é a vantagem de configurar list, json e junit simultaneamente em uma mesma execução?*
- **Resposta:** Visibilidade e integração. Ao configurar list, as execuções são exibidas no terminal possuindo uma linha detalhada para cada teste executado. Já json e junit geram relatórios em formatos JSON e XML, que podem ser integrados de forma externa e automatizada, gerando aumento de produtividade já que não seria necessária uma etapa de geração de relatório de testes de forma manual. Dito isso, gerar os arquivos automaticamente elimina a etapa manual de produção dos relatórios, mas a ferramenta de CI/CD ainda precisa estar configurada para consumir esses arquivos.
---