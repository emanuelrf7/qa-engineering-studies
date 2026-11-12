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