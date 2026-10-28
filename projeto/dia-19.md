# Dia 19 — Page Object Model (POM)

## Exercício 1 — Entendendo a estrutura do POM
Considere este exemplo ilustrativo:
```
    import { type Locator, type Page } from '@playwright/test';

    export class TodoPage {
        readonly page: Page;
        readonly newTodoInput: Locator;

        constructor(page: Page) {
            this.page = page;
            this.newTodoInput = page.getByPlaceholder(
            'What needs to be done?'
            );
        }

        async goto() {
            await this.page.goto(
            'https://demo.playwright.dev/todomvc/'
            );
        }

        async createTodo(title: string) {
            await this.newTodoInput.fill(title);
            await this.newTodoInput.press('Enter');
        }
    }
```
Responda:

*1. Qual parte da aplicação a classe TodoPage representa?*
- **Resposta:** A TodoPage representa a página do TodoMVC, encapsulando seus elementos e suas operações. Nesse exemplo, isso inclui o campo de entrada, a navegação até a página e a criação de tarefas.

*2. Por que recebemos page pelo constructor em vez de criar uma Page nova dentro da classe?*
- **Resposta:** Pois dessa forma é possível tornar page em um atributo da classe e utilizá-lo nos métodos internos da mesma. Além disso, recebemos uma instância de Page já gerenciada pelo Playwright, normalmente fornecida pela fixture page. Assim, a classe reutiliza a página do teste, em vez de criar uma nova página independente e gerenciar seu ciclo de vida por conta própria.

*3. Qual é a finalidade de newTodoInput? E o que readonly indica nesse contexto?*
- **Resposta:** Capturar o input do TodoMVC. O readonly impede que a propriedade receba uma nova atribuição depois de inicializada.

*4. Qual é a diferença entre o método createTodo(title) dessa classe e o helper createTodo(page, title) do Dia 18?*
- **Resposta:** A diferença é que não é necessário passar o page como parâmetro, pois ele já existe no construtor da classe.

*5. Por que o método createTodo() não precisa necessariamente validar que a tarefa ficou visível?*
- **Resposta:** Pois essa responsabilidade será delegada ao teste que estaremos criando/executando, fazendo com que o método tenha a responsabilidade única de criar uma nova tarefa.

*6. Se o placeholder do campo mudar, qual parte da estrutura deveria ser alterada? E se a regra de negócio do teste mudar?*
- **Resposta:** O atributo this.newTodoInput dentro do construtor da classe TodoPage. Para a regra de negócio a alteração deve ser realizada dentro do respectivo script de teste.
---