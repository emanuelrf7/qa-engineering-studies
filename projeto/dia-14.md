# Dia 14 — Introdução ao Playwright e primeiros testes E2E

## Exercício 1 — Interpretando um teste Playwright
Considere o código:
```
import { test, expect } from '@playwright/test';

test('deve exibir o título da página', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveTitle('Example Domain');
});
```
Responda, sem executar o código ainda:

*1. Para que serve o import { test, expect } from '@playwright/test'?*
- **Resposta:** Para importar os métodos test e expect do pacote @playwright/test, permitindo definir casos de teste e realizar assertions.

*2. O que representa test('deve exibir o título da página', ...)?*
- **Resposta:** O cenário de teste a ser executado.

*3. Por que a função do teste está marcada como async?*
- **Resposta:** Pois ações no navegador são assíncronas.

*4. O que o objeto page representa?*
- **Resposta:** A aba atual do navegador que será controlada pelo Playwright.

*5. O que acontece em await page.goto('https://example.com')?*
- **Resposta:** Solicita a navegação até o caminho passado aguardando a conclusão da navegação conforme o critério de carregamento usado pelo Playwright antes de continuar.

*6. Qual é a diferença conceitual entre page.goto() e expect() nesse teste?*
- **Resposta:** O page.goto() serve para navegação, já o expect() serve para validar uma informação específica da página navegada.

*7. O que exatamente toHaveTitle('Example Domain') está validando?*
- **Resposta:** Está validando se a página acessada possui o título 'Example Domain'.

*8. Se o título real fosse Example Website, o que você espera que aconteça com o teste?*
- **Resposta:** Retornasse um erro de assertion porque o título recebido foi diferente do título esperado.
---
## Exercício 2 — Primeira execução com Playwright
*1. A saída de:*
`npx playwright --version`
- **Resposta:** Version 1.64.1.

*2. O resultado resumido de:*
`npx playwright test`
- **Resposta:** Running 6 tests using 6 workers
  6 passed (5.2s)

3. Responda:
    - O que você entende por headless?
        - **Resposta:** Execução dos testes sem abrir a interface gráfica (navegador).
    
    - O que mudou quando executou com **--headed**?
        - **Resposta:** A execução dos testes passou a exibir o navegador.
    
    - O que você entende que **--project=chromium** fez?
        - **Resposta:** Faz com que o Playwright execute apenas o projeto chamado chromium que está definido no arquivo playwright.config.ts.
    
    - Abra o **playwright.config.ts**: quais browsers/projetos aparecem configurados?
        - **Resposta:** Chromium -> projeto baseado no engine Chromium; Firefox -> projeto Firefox; WebKit -> projeto baseado no engine WebKit.

    - Quantos testes o terminal informou que executou? Tente explicar por que esse número pode ser maior do que a quantidade de funções **test()** existentes no arquivo.
        - **Resposta:** Para headless, 6 testes. No primeiro comando de teste, ele executou os dois testes para os 3 projetos configurados, logo: 6 testes. Para o segundo, como definimos no comando --project=chromium, ele fez a execução dos dois testes apenas para esse projeto, logo: 2 testes. Isso comunica que o Playwright consegue executar os testes para cada projeto configurado dentro do playwright.config.ts, caso seja desejado.
---
## Exercício 3 — Primeiro teste Playwright
Registre:
- O código que você criou;

    ``` 
        import { test, expect } from '@playwright/test';

        test('deve validar a página Example Domain', async ({ page }) => {
            await page.goto("https://example.com");

            await expect(page).toHaveTitle("Example Domain");
        });
    ```

- O resultado da execução;

    ```
        Running 1 test using 1 worker
        1 passed (3.0s)

        To open last HTML report run:

        npx playwright show-report
    ```

- Uma explicação curta, linha por linha, do que cada parte faz.
    - **Resposta:** Primeiro eu importo os métodos test e expect do pacote @playwright/test; em seguida, utilizo o método test para escrever meu cenário de teste e, dentro dele, solicito ao Playwright para acessar a página example.com e faço uma validação no título da página com toHaveTitle(), que deve ser "Example Domain". As operações assíncronas dentro do teste, como page.goto() e expect(...).toHaveTitle(), são precedidas por await, enquanto a função callback do teste é declarada com async.
---
## Exercício 4 — Locators e interação com elementos
- Código do segundo teste:
```
    test('deve interagir com o link Get started', async ({ page }) => {
        await page.goto("https://playwright.dev/");

        await expect(page.getByRole('heading', { name: 'Playwright enables reliable web automation for testing, scripting, and AI agents.' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
        await page.getByRole('link', { name: 'Get started' }).click();

        await expect(page).toHaveURL(/docs\//);
    });
```

- O resultado da execução:
```
    Running 2 tests using 2 workers
    2 passed (3.9s)

    To open last HTML report run:

    npx playwright show-report
```

- Por que escolheu getByRole() para o heading e para o link?
    - **Resposta:** Pois dessa forma é possível capturar o elemento desejado diretamente pela função dos mesmos na página: heading para o cabeçalho/título visível da página, link para o elemento que possui papel acessível de link, não de botão.

- O que toBeVisible() está validando?
    - **Resposta:** Que os elementos desejados (heading e link) estão visíveis na página após a navegação para a mesma.

- Por que validar apenas uma parte estável da URL, como docs/, pode ser mais resiliente do que comparar a URL inteira?
    - **Resposta:** Como a URL completa pode sofrer alterações em parâmetros, fragmentos ou outras partes que não são relevantes para o teste, validar apenas uma parte estável e significativa, como docs/, torna a assertion menos frágil e ainda confirma que a navegação chegou à área esperada.

- Na sua interpretação, o que o auto-waiting do Playwright ajuda a evitar nesse teste?
    - **Resposta:** O auto-waiting faz o Playwright aguardar automaticamente as condições necessárias para executar uma ação, como o elemento estar visível, estável, habilitado e apto a receber eventos, reduzindo falhas causadas por timing.
---