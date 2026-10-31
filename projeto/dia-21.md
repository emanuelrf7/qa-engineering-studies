# Dia 21 — Ciclo de vida e escopo das fixtures no Playwright

## Exercício 1 — Fixação conceitual
Responda com suas próprias palavras:

*1. Qual é a diferença entre setup e teardown em uma fixture?*
- **Resposta:** Setup prepara os recursos necessários para o teste antes da execução do mesmo. Teardown realiza o "fechamento" da fixture, realizando ações como limpeza, por exemplo.

*2. Se uma fixture não declarar seu escopo, qual será o comportamento padrão?*
- **Resposta:** O padrão é test: uma instância independente para cada teste que utiliza a fixture.

*3. Imagine que temos 8 testes executados por 4 workers. Se uma fixture tiver escopo worker e todos os testes a utilizarem, quantas instâncias serão criadas?*
- **Resposta:** 4 instâncias, uma para cada worker.

*4. Por que compartilhar uma mesma instância de Page entre vários testes pode comprometer o isolamento dos testes?*
- **Resposta:** Pois pode acabar gerando dependência entre os testes da suíte.
---