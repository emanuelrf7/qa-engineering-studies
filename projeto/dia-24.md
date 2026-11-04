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
## Exercício 4 — Configurações específicas por Project (Override)
Responda:

*1. Qual é a diferença entre o baseURL global e o baseURL definido dentro do Project Firefox?*
- **Resposta:** A baseURL global é utilizada para todos os testes executados para os projetos configurados desde que esse projeto não possua uma baseURL definida. Caso exista um baseURL especificado para um projeto, esse baseURL passa a ser levado em consideração e não mais o baseURL global.

*2. Precisamos alterar o baseURL global para modificar somente o endereço utilizado pelo Firefox? Por quê?*
- **Resposta:** Não. Podemos configurar um baseURL para cada projeto configurado no playwright.config.ts.

*3. Caso o baseURL global fosse alterado para https://example.net, quais projetos seriam afetados?*
- **Resposta:** Os projetos chromium e webkit. O projeto firefox não seria afetado pela alteração global pois possui seu próprio baseURL definido.
---
## Exercício 5 — Projects também podem representar dispositivos
Responda:

*1. Qual é a diferença entre o projeto chromium e o projeto Mobile Chrome?*
- **Resposta:** O projeto chromium utiliza uma configuração de desktop. Já Mobile Chrome utiliza o Chromium com características de um dispositivo móvel, simulando o ambiente de um Pixel 5.

*2. O projeto Mobile Chrome utiliza um navegador diferente do Chromium?*
- **Resposta:** Não. O nome Mobile Chrome é apenas o nome que demos ao project. O perfil Pixel 5 utiliza o mecanismo Chromium, configurado para simular um dispositivo Android.

*3. Por que testar uma aplicação em diferentes viewports pode revelar problemas que não aparecem no desktop?*
- **Resposta:** Porque podem existir problemas relacionados a dimensão da página ou localização dos elementos na tela que para telas maiores (como telas de desktop ou notebooks) não são encontrados, já para telas menores (como celulares) são. Outros problemas que podem ser revelados são: responsividade e layout, menus e navegação, elementos que ultrapassam os limites da tela, interações por toque e textos e botões que ficam difíceis de utilizar.
---