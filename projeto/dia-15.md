# Dia 15 — Inputs, ações e assertions com Playwright

## Exercício 1 — Interpretando interação com campos
Considere este código:

```
    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill('Estudar Playwright');
    await expect(input).toHaveValue('Estudar Playwright');

    await input.press('Enter');
```

Sem executar ainda, responda:

*1. O que a variável input armazena conceitualmente?*
- **Resposta:** O Locator do campo de input de texto do TodoMVC.

*2. O que getByPlaceholder() está usando para localizar o elemento?*
- **Resposta:** O atributo Placeholder da tag do elemento capturado.

*3. Qual é a função de fill() nesse fluxo?*
- **Resposta:** Preencher o campo com o texto "Estudar Playwright".

*4. O que toHaveValue() valida?*
- **Resposta:** Que o campo foi preenchido com o valor textual "Estudar Playwright".

*5. Qual é a diferença entre fill() e press('Enter')?*
- **Resposta:** O fill() preenche o campo com o valor desejado, o press('Enter') envia a tecla Enter do teclado para o campo, criando a tarefa no sistema.

*6. Por que usamos await nas três operações?*
- **Resposta:** Pois as operações são assíncronas e retornam Promises. O await faz a função aguardar a conclusão de cada operação antes de seguir para a próxima.

*7. Se toHaveValue('Estudar Playwright') não atingir o valor esperado dentro do timeout, o que acontecerá?*
- **Resposta:** O toHaveValue() repetirá a assertion até o valor esperado aparecer ou até atingir o Timeout. Se não conseguir, a assertion falha e o teste é marcado como failed, exibindo esperado, recebido e o histórico da espera.

*8. Por que geralmente seria desnecessário usar uma espera fixa, como waitForTimeout(2000), antes dessas ações?*
- **Resposta:** Pois o Playwright já espera dinamicamente apenas o necessário. Com waitForTimeout(2000) o teste sempre esperaria 2 segundos, mesmo que o elemento esteja pronto em 100ms, por exemplo.
---
## Exercício 2 — Criando uma tarefa no TodoMVC
Registre:

- O código criado;

```
    import { test, expect } from '@playwright/test';

    test('deve criar uma nova tarefa', async ({ page }) => {
        await page.goto("https://demo.playwright.dev/todomvc/");

        const input = page.getByPlaceholder("What needs to be done?");
        await input.fill('Estudar Playwright');

        await expect(input).toHaveValue('Estudar Playwright');

        await input.press('Enter');

        const task = page.getByText('Estudar Playwright');
        await expect(task).toBeVisible();

        await expect(input).toBeEmpty();
    });
```

- Resultado da execução;

```
    Running 1 test using 1 worker
    1 passed (1.7s)

    To open last HTML report run:

    npx playwright show-report
```

- Respostas:

*1. Por que armazenar o resultado de getByPlaceholder() em uma variável pode ser útil?*
- **Resposta:** Pois a partir dela é possível realizar diversas ações utilizando métodos do Playwright, como fill() e press().

*2. O que muda no estado da aplicação após press('Enter')?*
- **Resposta:** A aplicação passa a ter uma tarefa cadastrada.

*3. Por que validar o valor do input antes de pressionar Enter?*
- **Resposta:** Validamos o input antes do Enter para confirmar que o preenchimento ocorreu corretamente antes de avançarmos para a ação que cria a tarefa, garantindo que o estado intermediário esperado foi atingido.

*4. Por que validar que o texto da tarefa aparece na página depois?*
- **Resposta:** Para confirmar que a tarefa foi cadastrada e está sendo exibida na página como era esperado.

*5. Por que também é útil validar que o input ficou vazio?*
- **Resposta:** Pois dessa forma é possível comprovar o funcionamento adequado da aplicação: preencheu o input com o nome da tarefa -> cadastrou a tarefa através do envio do Enter -> input volta a ficar vazio para novo cadastro.

*6. Se a tarefa for criada corretamente, mas o input continuar com Estudar Playwright, o teste deveria passar ou falhar? Justifique.*
- **Resposta:** Falhar, pois fazemos uma validação após o cadastro verificando se o campo está vazio. Dessa forma, o Playwright executaria o código referente a validação a lançaria uma exceção, indicando que a assertion falhou pois o campo estava preenchido ao invés de estar vazio.
---
## Exercício 3 — Checkbox e mudança de estado
Registre:

- Código criado;

```
    test('deve concluir uma tarefa', async ({ page }) => {
        await page.goto("https://demo.playwright.dev/todomvc/");

        const input = page.getByPlaceholder("What needs to be done?");
        await input.fill('Estudar Playwright');

        await expect(input).toHaveValue('Estudar Playwright');

        await input.press('Enter');

        const task = page.getByText('Estudar Playwright');
        await expect(task).toBeVisible();

        await expect(input).toBeEmpty();

        const checkbox = page.getByRole('checkbox', { name: 'Toggle Todo' });
        await expect(checkbox).not.toBeChecked();

        await checkbox.check();
        await expect(checkbox).toBeChecked();
    });
```

- Resultado da execução;

```
    Running 2 tests using 2 workers
    2 passed (2.5s)

    To open last HTML report run:

    npx playwright show-report
```

- Respostas:

*1. Qual é a diferença entre check() e toBeChecked()?*
- **Resposta:** check() corresponde a um método que serve para marcar um input do tipo checkbox. Já toBeChecked() é uma assertion que valida se um checkbox já está marcado ou não, sendo realizado através da notação .not para casos negativos.

*2. Por que validar primeiro que o checkbox está desmarcado?*
- **Resposta:** Para validar o estado inicial esperado da tarefa. Ao criarmos uma tarefa, esperamos que a mesma não esteja marcada pois acabou de ser criada e, portanto, é esperado que a tarefa ainda não tenha sido concluída, ou seja: esteja com o checkbox desmarcado.

*3. O que significa usar .not.toBeChecked()?*
- **Resposta:** Significa que estamos fazendo a negação da assertion toBeChecked(), ou seja: toBeChecked() espera que a respectiva checkbox já esteja marcada. Quando utilizamos .not.toBeChecked estamos realizando a negação da assertion original, logo a assertion passa a esperar que a respectiva checkbox NÃO esteja marcada.

*4. Se check() for executado em um checkbox que já está marcado, o que você espera que aconteça?*
- **Resposta:** Que o método retorne sem alterar nada, visto que check() possui dois fluxos: se a checkbox estiver desmarcada, marca e verifica se está marcada. Se estiver marcada, retorna sem alterar nada e garante que o checkbox permaneça marcado.

*5. Por que usar check() pode ser melhor do que simplesmente usar click() para esse tipo de elemento?*
- **Resposta:** Pois o método check() é um método específico para campos marcáveis, como campos do tipo checkbox, por exemplo. A vantagem sobre o método click() é que o método click() pode alterar o estado do checkbox baseado no estado atual (se estiver desmarcado, marca; se estiver marcado, desmarca). Com check() não existe a chance desse problema devido aos fluxos citados na questão 4.

*6. Se a tarefa aparecer visualmente como concluída, mas o checkbox continuar desmarcado, o teste deveria passar ou falhar? Por quê?*
- **Resposta:** Deveria falhar, pois validamos o estado do checkbox após a execução do método check().
---