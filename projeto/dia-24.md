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
## Exercício 3 — Executando testes em múltiplos Projects
Responda:

*1. Por que o Playwright executou seis testes, embora o arquivo tenha apenas dois?*
- **Resposta:** Pois ele executou os dois testes para todos os projects configurados, que neste caso são 3: chromium, firefox e webkit.

*2. Qual é a diferença entre executar com --project=chromium e executar sem informar --project?*
- **Resposta:** A diferença está no momento da execução dos testes. Quando informamos o projeto desejado com --project=, estamos dizendo ao Playwright que queremos que os testes sejam executados apenas para o respectivo projeto. Já a execução sem --project= diz ao Playwright que ele deve executar todos os testes para todos os projects configurados.

*3. Por que um teste pode passar no Chromium e falhar no Firefox ou WebKit?*
- **Resposta:** Pois cada project/browser possui suas características únicas que podem fazer com que um teste passe em um project e falhe em outro. Por exemplo, além de diferenças de implementação de HTML, CSS e JavaScript, os navegadores também podem apresentar comportamentos diferentes em recursos de rede, certificados, permissões e renderização. Esse é justamente um dos motivos para manter testes em múltiplos projetos.
---