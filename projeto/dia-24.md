# Dia 24 — Playwright Configuration e Test Projects

## Exercício 2 — Configurando baseURL
Responda:

*1. Qual é a vantagem de utilizar baseURL em vez de repetir a URL completa em cada page.goto()?*
- **Resposta:** Tornar o código mais legível e fácil de dar manutenção visto que todos os testes terão o caminho "/", indicando que a página a ser navegada é a página presente no playwright.config.ts, sendo necessário alterar em apenas um lugar ao invés de vários.

*2. Se futuramente precisarmos executar os mesmos testes em homologação e produção, como essa configuração poderia ajudar?*
- **Resposta:** Alterando a parte pertinente a diferença entre os ambientes apenas no baseURL, ao invés de alterar teste por teste.

*3. O que acontece se utilizarmos page.goto('/login') com baseURL: 'https://example.com'?*
- **Resposta:** O Playwright tentaria navegar para a rota /login da página example. Seria algo como: page.goto('https://example.com/login').
---