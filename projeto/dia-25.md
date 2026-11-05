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
## Exercício 2 — Configurando retries por grupo de testes
Responda:

*1. Por que o teste recebeu um retry mesmo com retries: 0 na configuração global local?*
- **Resposta:** Pois o grupo que ele faz parte possui o retries configurado como 1.

*2. Qual é a vantagem de configurar retries por grupo em vez de aplicar a mesma quantidade a todos os testes?*
- **Resposta:** Dessa forma é possível personalizar testes que podem ser mais instáveis que outros, mantendo uma melhor organização da suíte como um todo.

*3. Essa configuração altera o comportamento dos outros grupos de testes que eventualmente existam no mesmo arquivo?*
- **Resposta:** Depende de onde essa configuração estiver setada. Se for fora do describe, configura o arquivo inteiro. Se for dentro do describe, configura aquele grupo e seus grupos internos, sem afetar os grupos irmãos.
---