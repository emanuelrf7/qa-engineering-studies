# Dia 18 — Helpers, reutilização e introdução a Fixtures no Playwright

## Exercício 1 — Helper x Fixture
Analise este código:

```
    import { test, expect, type Page } from '@playwright/test';

    async function createTodo(page: Page, title: string) {
        const input = page.getByPlaceholder('What needs to be done?');

        await input.fill(title);
        await input.press('Enter');
        }

        test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
        });

        test('deve criar Estudar Playwright', async ({ page }) => {
        await createTodo(page, 'Estudar Playwright');

        await expect(
            page.getByText('Estudar Playwright')
        ).toBeVisible();
        });

        test('deve criar Estudar API', async ({ page }) => {
        await createTodo(page, 'Estudar API');

        await expect(
            page.getByText('Estudar API')
        ).toBeVisible();
    });
```
Sem executar ainda, responda:

*1. Qual é a responsabilidade da função createTodo()?*
- **Resposta:** Criar uma função que guarde uma responsabilidade repetitiva para ser utilizada nos testes. Nesse caso, createTodo() tem a responsabilidade de executar a operação reutilizável de criação de uma tarefa.

*2. createTodo() é um teste? Por quê?*
- **Resposta:** Não, é uma função helper que tem como objetivo auxiliar na criação do script de teste automatizado evitando repetir blocos de código repetitivos para responsabilidades específicas.

*3. Por que passamos page como parâmetro para o helper?*
- **Resposta:** Pois a fixture page é utilizada dentro da função na variável input, que captura o input da página.

*4. Os dois testes compartilham a mesma page porque chamam a mesma função createTodo()?*
- **Resposta:** Não, para cada teste existe uma page única para o mesmo.

*5. Qual código repetido foi removido dos testes?*
- **Resposta:** O código de criação de tarefas, onde é identificado o input -> preenchimento do campo com o título da tarefa a ser criada -> envio do Enter para cadastro da tarefa.

*6. Por que as assertions de visibilidade continuam dentro de cada test() em vez de ficarem obrigatoriamente dentro de createTodo()?*
- **Resposta:** Para não tornar um helper em um "teste mascarado" onde são delegadas responsabilidades desnecessárias para o helper. Isso não quer dizer que um helper nunca pode ter assertion, a decisão depende da responsabilidade daquela abstração.

*7. Se createTodo() falhar ao preencher o input, o que acontecerá com o teste que chamou o helper?*
- **Resposta:** Falhará também levantando uma exceção pertinente ao problema encontrado.

*8. Qual é a diferença entre reutilizar createTodo() nos dois testes e fazer o segundo teste depender da tarefa criada pelo primeiro?*
- **Resposta:** Reutilizando cada teste fica mais enxuto e legível e ambos permanecem independentes, sem ser necessário o resultado de um para o funcionamento do outro.

*9. Nesse código, qual elemento é uma fixture nativa do Playwright?*
- **Resposta:** Page.

*10. Em suas palavras, qual é a diferença inicial entre um helper e uma fixture?*
- **Resposta:** Um helper serve para encapsular responsabilidades repetitivas que podem ser utilizadas para escrever um código mais enxuto e legível. Já fixture pode preparar e fornecer um recurso/dependência para o teste, podendo também controlar seu setup e teardown.
---