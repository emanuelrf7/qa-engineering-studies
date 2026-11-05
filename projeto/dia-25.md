# Dia 25 — Playwright Retries e Flaky Tests

## Exercício 1 — Observando o comportamento dos retries
Responda:

*1. Qual valor de testInfo.retry apareceu na primeira execução?*
- **Resposta:** 0.

*2. Qual valor apareceu no retry?*
- **Resposta:** 1.

*3. Por que o Playwright classificou o teste como flaky, em vez de simplesmente passed?*
- **Resposta:** Pois o teste falhou na primeira execução e passou na segunda, sendo assim um teste instável.
---