# Dia 17 — Organização de testes, hooks e isolamento no Playwright

## Exercício 1 — test.describe(), beforeEach() e isolamento
Analise este código, sem executá-lo ainda:
```
    import { test, expect } from '@playwright/test';

    test.describe('TodoMVC - tarefas', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('https://demo.playwright.dev/todomvc/');
        });

        test('deve exibir o campo de nova tarefa', async ({ page }) => {
            const input = page.getByPlaceholder('What needs to be done?');

            await expect(input).toBeVisible();
        });

        test('deve iniciar sem tarefas cadastradas', async ({ page }) => {
            const checkboxes = page.getByRole('checkbox', {
            name: 'Toggle Todo'
            });

            await expect(checkboxes).toHaveCount(0);
        });

    });
```
Responda:

*1. Qual é a função de test.describe() nesse código?*
- **Resposta:** Agrupar os testes que são relacionados entre si.

*2. Quantas vezes o beforeEach() será executado? Por quê?*
- **Resposta:** O beforeEach() é executado antes de cada teste presente na suíte. Portanto, será executado 2 vezes.

*3. O page recebido pelo primeiro teste é o mesmo page recebido pelo segundo?*
- **Resposta:** Não. Embora haja o agrupamento dos testes, cada teste possui um BrowserContext isolado. Ou seja, não herdam suas características, como cookies, local storage etc.

*4. Se o primeiro teste criasse a tarefa Estudar Playwright, você esperaria que ela estivesse presente no segundo teste? Por quê?*
- **Resposta:** Não, pois como falado na questão acima, os testes são agrupados mas possuem características independentes entre si.

*5. Qual vantagem existe em colocar o page.goto() dentro de beforeEach() em vez de repeti-lo manualmente nos dois testes?*
- **Resposta:** Evitar código repetido para os testes, escrevendo a navegação apenas uma vez que será executada antes do início de cada teste.

*6. Se adicionarmos um terceiro teste dentro desse mesmo describe, quantas vezes o page.goto() será executado?*
- **Resposta:** 3 vezes.

*7. Qual seria o problema de criar uma tarefa no primeiro teste e escrever o segundo teste assumindo que essa tarefa já existe?*
- **Resposta:** O problema seria que a tarefa não existiria para o segundo teste, ocasionando em erro pois o Playwright não seria capaz de encontrar a respectiva tarefa. Além disso, isso criaria uma dependência entre os testes.

*8. Em suas palavras, o que significa dizer que um teste é isolado?*
- **Resposta:** O isolamento significa que um teste não depende do estado ou do resultado de outro teste.

*9. Por que isolamento é especialmente importante quando os testes podem ser executados em paralelo?*
- **Resposta:** Pois o isolamento é importante para que a execução continue previsível independentemente da ordem e do paralelismo, além de evitar falhas em cascata.

*10. Qual diferença você espera existir conceitualmente entre beforeEach() e beforeAll()?*
- **Resposta:** beforeEach() possui um setup repetido e é executado para cada teste. Já beforeAll() possui um setup compartilhado executado uma vez antes do grupo.
---