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
## Exercício 3 — Preparação condicional durante retries
Responda:

*1. Por que utilizamos testInfo.retry > 0 em vez de testInfo.retry === 1?*
- **Resposta:** Porque a primeira tentativa é sempre índice 0. Logo, como queremos verificar todas as novas tentativas, a condição tem que ser testInfo.retry > 0.

*2. Qual seria a vantagem de executar uma limpeza de dados apenas durante um retry?*
- **Resposta:** Evitar que dados inconsistentes tenham permanecido após o teste que falhou tenham impacto no novo teste. Essa preparação pode restaurar o estado do ambiente, limpar dados temporários ou remover registros criados por uma execução anterior.

*3. Por que não devemos utilizar retries como solução definitiva para testes instáveis?*
- **Resposta:** Porque a abordagem mais adequada é tornar o teste mais robusto ao invés de tentar executá-lo novamente. Retries são mecanismos de resiliência, não uma correção para a causa raiz.
---