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
## Exercício 2 — Test Timeout
Responda:

*1. Por que o segundo teste falhou mesmo que a Promise fosse resolvida após 1.200 ms?*
- **Resposta:** Porque o segundo teste havia um timeout de execução de 500ms. Ou seja, o tempo total de execução do teste era menor que o tempo de resolve da Promise. Logo, o teste era finalizado antes do resolve da Promise, gerando falha.

*2. Qual é a diferença entre test.setTimeout() e o timeout configurado diretamente em uma assertion?*
- **Resposta:** O test.setTimeout() configura o tempo total de execução de um teste. Já o timeout configurado diretamente em uma assertion configura o tempo máximo que ela assertion tem para validar o que foi proposto.

*3. Se configurarmos test.setTimeout(5_000), mas uma assertion possuir timeout: 2_000, qual limite será aplicado à assertion?*
- **Resposta:** Será aplicado 2_000. Um detalhe complementar: o timeout geral do teste também continua valendo. Portanto, se a assertion tivesse um limite de 10 segundos, mas restassem apenas 3 segundos do timeout geral, o teste poderia ser interrompido antes de completar os 10 segundos.
---
## Exercício 3 — Action Timeout
Responda:

*1. Por que o terceiro teste falhou quando configuramos actionTimeout: 500?*
- **Resposta:** Porque o tempo de execução da ação expirou antes da ação ser realizada de fato.

*2. Qual é a diferença entre actionTimeout e expect timeout?*
- **Resposta:** No actionTimeout configuramos o timeout para uma determinada ação, como uma ação de click, por exemplo. Já no expect timeout configuramos o timeout para uma validação utilizando uma assertion.

*3. Qual é a vantagem de configurar timeout individualmente em um click() em vez de alterar o actionTimeout globalmente?*
- **Resposta:** Para não acabar impactando as outras ações como fill() ou check() indevidamente.
---