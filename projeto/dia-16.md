# Dia 16 — Múltiplos elementos, filtros e escopo de Locators

## Exercício 1 — Strictness e escopo de Locators
Considere que o TodoMVC possui estas três tarefas:

    Estudar Playwright
    Estudar API
    Estudar SQL

E analise:

```
    const todos = page.getByRole('listitem');

    const playwrightTodo = todos.filter({
        hasText: 'Estudar Playwright'
    });

    const checkbox = playwrightTodo.getByRole('checkbox', {
        name: 'Toggle Todo'
    });

    await checkbox.check();
```

Sem executar ainda, responda:

*1. O que page.getByRole('listitem') representa nesse cenário?*
- **Resposta:** A captura de todos os items de uma lista na página, possivelmente todas as tarefas existentes na lista de tarefas.

*2. Esse primeiro Locator precisa necessariamente corresponder a apenas um elemento? Por quê?*
- **Resposta:** Não. Se trata de um listitem, portanto, pode haver 1 ou n elementos para o Locator.

*3. O que filter({ hasText: 'Estudar Playwright' }) faz com o Locator todos?*
- **Resposta:** Filtra por "Estudar Playwright" dentro do Locator desejado (todos).

*4. Por que playwrightTodo.getByRole(...) é diferente de usar diretamente page.getByRole(...)?*
- **Resposta:** Porque dessa forma estamos acessando diretamente o elemento que desejamos, que foi filtrado utilizando o método filter na variável playwrightTodo. Outra diferença é que page.getByRole() procura a partir da página inteira. Já playwrightTodo.getbyRole() procura apenas dentro dos elementos correspondentes a playwrightTodo, o que reduz muito a ambiguidade mas não elimina strict violations automaticamente.

*5. Qual checkbox será marcado nesse código?*
- **Resposta:** A checkbox da tarefa "Estudar Playwright".

*6. Por que essa abordagem é mais resiliente do que simplesmente usar nth(0)?*
- **Resposta:** Pois o nth(0) pode não ser necessariamente o elemento desejado, visto que ele seleciona o primeiro elemento da lista que possua o índice 0. Ou seja, nth(0) depende da posição, enquanto filter({ hasText: ... }) depende da identidade/conteúdo do item.

*7. O que você espera que aconteça se filter({ hasText: 'Estudar Playwright' }) ainda corresponder a duas tarefas e depois executarmos checkbox.check()?*
- **Resposta:** Que seja gerado um strict violation e seja lançada uma exceção indicando que o Playwright não conseguiu localizar o elemento correto.

*8. Conceitualmente, qual é a diferença entre:*
```
    locator.count()
```
e:
```
    expect(locator).toHaveCount(3)
```
- **Resposta:** locator.count() faz a contagem de todos os elementos presentes no locator desejado. Já expect(locator).toHaveCount(3) espera que o locator desejado possua a contagem específica de 3. A diferença é que locator.count() consulta a quantidade naquele momento retornando um número, enquanto expect(locator).toHaveCount(3) é uma assertion com retry. Ou seja, quantidade ainda é 2: espera/revalida; quantidade virou 3: assertion passa; timeout e ainda não é 3: assertion falha.

*9. Por que o Playwright permitiria contar vários elementos, mas poderia rejeitar um click() sobre esse mesmo Locator?*
- **Resposta:** Pois o Playwright se recusa a executar a ação visto que ele não sabe qual é o elemento desejado a ser usado.
---