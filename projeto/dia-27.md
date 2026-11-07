# Dia 27 — Playwright Timeouts e Auto-waiting

## Exercício 1 — Expect Timeout e Auto-retrying Assertions
Responda:

*1. Por que a assertion conseguiu passar mesmo que o texto inicialmente fosse Carregando...?*
- **Resposta:** Porque as assertions possuem auto-retry. Logo, mesmo que a assertion inicialmente não encontre "Concluído", ela encontrará na nova tentativa, fazendo com que o teste seja aprovado.

*2. Qual é a diferença entre utilizar toHaveText() com auto-retry e utilizar uma assertion síncrona como expect(value).toBe('Concluído')?*
- **Resposta:** Uma assertion com auto-retry possibilita testes mais dinâmicos, visto que mesmo que um elemento não esteja disponível na hora da execução o teste não seja considerado falho de imediato, visto que a assertion realiza o auto-retry e identifica o elemento posteriormente. Com uma assertion síncrona, isso não é possível. Ou seja, a primeira aguarda automaticamente até que a condição seja satisfeita ou o timeout expire. Já a segunda avalia o valor imediatamente, sem novas tentativas.

*3. O que aconteceria se configurássemos o timeout da assertion para 500 ms, considerando que o texto demora aproximadamente 1,2 segundo para mudar?*
- **Resposta:** A assertion realizaria o auto-retry até encontrar o texto proposto. Se o timeout da assertion esgotar e o texto não for encontrado, será gerado erro. Nesse caso específico, o teste seria considerado reprovado pois a assertion não conseguiria encontrar o texto a tempo.
---