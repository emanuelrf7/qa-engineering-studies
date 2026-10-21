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