# Dia 28 — Playwright Debugging

## Exercício 1 — Playwright Inspector
Responda:

*1. Qual é a principal diferença entre executar um teste normalmente e utilizar --debug?*
- **Resposta:** Quando executamos em modo debug utilizamos para investigar a causa de um problema em um script de teste, onde conseguimos realizar ações específicas como executar o teste linha a linha e conferir a ação e seu resultado, o que não é possível fazer executando o teste de maneira convencional. Além disso, ao utilizar esse modo, o Playwright abre o navegador em modo visual (headed), inicia o Inspector e configura o timeout padrão como zero, evitando que a depuração seja interrompida por um timeout padrão.

*2. Qual é a finalidade de page.pause()? Em que situação ele pode ser especialmente útil?*
- **Resposta:** O page.pause() pausa a execução do script de teste no ponto em que foi chamado. Isso permite inspecionar o DOM, experimentar seletores e realizar interações manualmente antes de retomar a execução.

*3. Durante a execução, como o Inspector pode ajudar a identificar problemas em um locator?*
- **Resposta:** Com a execução passo a passo e também com recursos específicos para investigar locators:
    - Pick Locator: seleciona um elemento no navegador e sugere um locator;
    - Live Editing: permite alterar um locator durante a depuração e visualizar os elementos correspondentes;
    - Actionability Logs: mostram as verificações realizadas pelo Playwright antes de executar uma ação, como visibilidade, estabilidade e estado habilitado.
---
## Exercício 2 — Playwright UI Mode
Responda:

*1. Qual é a principal diferença entre Playwright Inspector e UI Mode?*
- **Resposta:** O Playwright Inspector é a interface do Playwright Test dedicada a depuração de erros em um script de teste. Já o UI Mode é uma interface com diversas funcionalidades, como execução de testes individuais ou em grupo, timeline de ações, pick locator, watch mode, DOM Snapshots, entre outros. Além disso, também é possível realizar a depuração do script de teste através dele.

*2. Como os DOM Snapshots ajudam a investigar uma falha que ocorre depois de uma interação?*
- **Resposta:** Com o DOM Snapshots é possível verificar como a página estava antes e como ficou depois de uma interação. Logo, é possível ver o que essa interação realizou na prática e realizar uma melhor análise do problema ocorrido.

*3. Qual é a vantagem prática do Watch Mode durante o desenvolvimento de testes automatizados?*
- **Resposta:** A reexecução automática do teste após uma correção no código do teste investigado.
---