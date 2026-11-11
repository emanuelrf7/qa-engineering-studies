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