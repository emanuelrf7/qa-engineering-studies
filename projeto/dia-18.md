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
# Exercício 2 — Extraindo createTodo() para um helper
Responda:

*1. Qual responsabilidade ficou no arquivo todo.helper.ts?*
- **Resposta:** Executar a operação reutilizável necessária para criar uma tarefa.

*2. Qual responsabilidade continuou no arquivo de testes?*
- **Resposta:** Validar que a tarefa está sendo exibida na página após o cadastro.

*3. Por que createTodo() recebe page em vez de criar uma nova página internamente?*
- **Resposta:** Pois estamos trabalhando com a page do teste. Logo, devemos indicar para a função esse comportamento através do parâmetro page da mesma.

*4. O helper altera o isolamento entre os testes?*
- **Resposta:** Não, ele serve apenas como um auxílio para uma escrita mais enxuta e legível do script de teste automatizado.

*5. Qual vantagem existe em manter title como parâmetro em vez de criar helpers separados como createPlaywrightTodo() e createApiTodo()?*
- **Resposta:** A possibilidade de utilizar apenas uma função para a criação da tarefa e não criar várias funções sem necessidade para o devido contexto.

*6. Se amanhã a forma de criar uma tarefa mudar — por exemplo, além do título for necessário clicar em um botão — onde a alteração principal deverá ser feita?*
- **Resposta:** No helper createTodo().

*7. Por que essa estrutura tende a reduzir manutenção?*
- **Resposta:** Porque dessa forma é possível centralizar a responsabilidade compartilhada, tornando mais fácil identificar e alterar o trecho responsável por esse comportamento, reduzindo o esforço de manutenção sem concentrar responsabilidades que pertencem aos próprios testes.

*8. Se createTodo() for usado por 20 testes, esses testes passam a depender uns dos outros?*
- **Resposta:** Não, um helper não gera dependência entre testes, apenas reutiliza códigos repetitivos de responsabilidades específicas em comum entre os testes.

*9. Qual é a diferença entre:*
```
    reutilizar implementação
```
*e*
```
    compartilhar estado
```
*nesse exemplo?*
- **Resposta:** Quando reutilizamos uma implementação estamos apenas transformando nosso script de teste em um script mais enxuto e legível, facilitando a manutenção do mesmo sem criar dependência entre os testes. Já o compartilhamento de estado gera uma dependência entre os testes de forma que para um funcionar o outro deve estar funcionando também, dificultando o processo de manutenção do script.

*10. Por que é interessante o nome do helper representar uma ação de negócio/interface (createTodo) em vez de detalhes técnicos como fillInputAndPressEnter()?*
- **Resposta:** Pois dependendo do tamanho do comportamento do helper o título que corresponde ao que ele faz pode se tornar inviável. Além disso, utilizar uma representação de uma ação de negócio/interface para o título do helper comunica melhor para outros usuários que irão ver o código, como desenvolvedores, por exemplo.
---