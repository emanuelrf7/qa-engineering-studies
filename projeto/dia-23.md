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