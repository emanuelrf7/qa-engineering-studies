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
## Exercício 2 — Múltiplas tarefas e toHaveCount()
Responda:

*1. Por que podemos usar um único Locator para representar as três tarefas?*
- **Resposta:** Pois o locator pode representar vários elementos correspondentes que, através dele, conseguimos capturar todas as tarefas cadastradas. Para o nosso caso, conseguimos capturar as 3 tarefas.

*2. Por que toHaveCount(3) é mais adequado do que fazer expect(await locator.count()).toBe(3) nesse teste?*
- **Resposta:** Pois count() retorna imediatamente a quantidade encontrada naquele momento. Já toHaveCount() reavalia o Locator até encontrar exatamente 3 elementos ou atingir o timeout.

*3. Se somente duas das três tarefas aparecerem inicialmente e a terceira surgir alguns milissegundos depois, como toHaveCount(3) se comporta?*
- **Resposta:** Ele é uma assertion com retry, portanto, ele aguarda e revalida até que resolva ou estoure o timeout.

*4. Validar apenas toHaveCount(3) garante que as tarefas corretas foram criadas? Por quê?*
- **Resposta:** Não, pois toHaveCount(3) valida que o locator possui a contagem exata de 3 elementos, mas que não quer dizer que sejam as 3 tarefas desejadas de fato.

*5. Por que também é útil validar os textos Estudar Playwright, Estudar API e Estudar SQL individualmente?*
- **Resposta:** Para garantir que as tarefas esperadas se encontram dentro do filtro criado através de uma assertion, e não fazer uma validação genérica do tipo "existem 3 tarefas cadastradas?".

*6. Se houver três tarefas, mas uma delas estiver duplicada e outra ausente, qual das validações detectaria o problema: apenas a contagem, apenas os textos ou ambas?*
- **Resposta:** Seria a validação dos textos pois a quantidade continua exata mas não seriam as tarefas esperadas.
---
## Exercício 3 — Filtrando uma tarefa específica
Responda:

*1. O que muda entre localizar o checkbox diretamente pela page e localizá-lo dentro da tarefa filtrada?*
- **Resposta:** Diretamente pela page pode ocorrer uma strict mode violation pois não estaríamos sendo específicos sobre o checkbox desejado. Ao filtrar a tarefa desejada, podemos realizar uma busca somente dentro da tarefa filtrada.

*2. Por que filter({ hasText: 'Estudar API' }) é melhor que nth(1) nesse cenário?*
- **Resposta:** Pois o método nth() depende da posição. nth(1) hoje poderia representar a tarefa "Estudar API" e amanhã representar a tarefa "Estudar Playwright". O teste continuaria passando, mas resultando em um falso positivo visto que não seria a tarefa desejada.

*3. Se a ordem das tarefas mudar, qual das duas abordagens tende a continuar funcionando: filter() ou nth()?*
- **Resposta:** filter(), pois dessa forma capturamos exatamente a tarefa desejada independentemente de sua posição.

*4. Se duas tarefas tiverem exatamente o texto Estudar API, o filter() sozinho garante unicidade? Por quê?*
- **Resposta:** Não, depende de como o filtro será utilizado. Por exemplo, o filtro pode capturar mais de um elemento desde que existam mais de um elemento que cumpra a condição do filter. Para operações que exigem um elemento único (como o check()), ele identificaria mais de um elemento e geraria uma strict mode violation. Logo, Locators podem representar múltiplos elementos, sendo as operações que implicam um único alvo as que aplicam strictness.

*5. Depois de filtrar a tarefa correta, por que ainda faz sentido usar getByRole('checkbox', { name: 'Toggle Todo' }) dentro dela?*
- **Resposta:** Pois o filter() captura a tarefa, não a checkbox dela. Logo, devemos capturar a checkbox para poder realizar a ação desejada utilizando getByRole('checkbox', { name: 'Toggle Todo' }).

*6. Qual é a vantagem de construir Locators em etapas, em vez de tentar criar um seletor enorme de uma vez?*
- **Resposta:** Existem algumas vantagens: Especificidade -> torna o elemento cada vez mais específico; Legibilidade -> fica claro o que cada Locator representa; Manutenção -> se a forma de localizar a tarefa mudar, basta alterar uma parte específica; Debug -> fica mais fácil descobrir em qual nível está a ambiguidade; Reutilização -> o Locator da tarefa pode ser usado para encontrar outros elementos dentro dela; Escopo -> Cada nova busca ocorre dentro de um contexto menor.
---
## Exercício 4 — Validando efeitos colaterais
Responda:

*1. Por que não basta validar apenas que Estudar API ficou marcada?*
- **Resposta:** Não basta validar que estudar API ficou marcada porque também precisamos garantir que a ação não alterou indevidamente o estado das outras tarefas. O comportamento esperado é que apenas Estudar API mude de desmarcada para marcada, enquanto Estudar Playwright e Estudar SQL permaneçam desmarcadas.

*2. O que significa validar que Estudar Playwright e Estudar SQL continuam desmarcadas?*
- **Resposta:** Significa que estamos validando o estado dessas checkboxes em dois momentos: antes da ação de marcar "Estudar API" -> devem estar desmarcados; após a ação de marcar "Estudar API" -> devem permanecer desmarcados.

*3. Se check() em Estudar API marcar acidentalmente também Estudar SQL, qual assertion detectaria o problema?*
- **Resposta:** expect(studySqlTaskCheckbox).not.toBeChecked().

*4. Qual é a diferença entre validar o resultado esperado e validar a ausência de efeitos colaterais?*
- **Resposta:** Validar o resultado esperado é o objetivo do teste, mas não impede que efeitos colaterais como a marcação de um checkbox indesejado aconteça, podendo ocasionar em falso positivo. Logo, a diferença está na robustez e confiabilidade do script de teste.

*5. Por que esse tipo de validação aumenta a qualidade de um teste E2E?*
- **Resposta:** Porque aumenta a confiabilidade e a robustez do teste ao validar tanto o resultado esperado quanto a ausência de efeitos colaterais.

*6. Nesse cenário, quantas transições de estado realmente esperamos que ocorram?*
- **Resposta:** Apenas uma para a checkbox da tarefa "Estudar API" -> inicia desmarcada, termina marcada após a ação do check().

*7. Se todas as três tarefas começarem desmarcadas, mas duas terminarem marcadas, o teste deveria falhar mesmo que Estudar API esteja correta? Por quê?*
- **Resposta:** Sim, pois o objetivo do teste é marcar apenas uma tarefa (Estudar API). Mais de uma tarefa marcada seria critério para determinar que o teste falhou.
---
## Exercício 5 — Desafio final: filtros e múltiplos estados
Responda:

*1. Por que validar o estado dos checkboxes antes de testar os filtros?*
- **Resposta:** Porque dessa forma podemos identificar inconsistências no estado da tarefa, que possui impacto direto na exibição filtrada.

*2. Qual regra de negócio o filtro Active representa?*
- **Resposta:** Todas as tarefas cadastradas que ainda não foram concluídas.

*3. Qual regra de negócio o filtro Completed representa?*
- **Resposta:** Todas as tarefas cadastradas que já foram concluídas.

*4. Por que precisamos validar tanto os elementos que devem aparecer quanto os que não devem aparecer?*
- **Resposta:** Para evitar falso positivo onde a tarefa desejada está sendo exibida mas a indesejada também está sendo exibida incorretamente.

*5. Se Estudar API aparecer simultaneamente em Active e Completed, o que isso indicaria?*
- **Resposta:** Inconsistência entre o estado da tarefa e a lógica de filtragem, pois Active deve exibir apenas tarefas cadastradas que ainda não foram concluídas. Já Completed deve exibir apenas tarefas cadastradas que já foram concluídas.

*6. Se o filtro Active exibir apenas Playwright e SQL, mas o checkbox de API estiver desmarcado, o fluxo está correto? Por quê?*
- **Resposta:** Não, pois o checkbox representa visualmente o estado da tarefa, sendo marcado -> tarefa concluída e desmarcado -> tarefa ativa/pendente. Logo, as 3 tarefas deveriam ser exibidas para o filtro Active.

*7. Quantas tarefas devem estar visíveis em Active e quantas em Completed?*
- **Resposta:** 2 em Active, 1 em Completed.

*8. Quais conceitos estudados nos Dias 15 e 16 você identifica nesse único cenário?*
- **Resposta:** Conceitos do dia 15: getByPlaceholder(), fill(), press(), toHaveValue(), toBeEmpty(), check(), toBeChecked(), .not, toBeVisible(), estado inicial -> ação -> estado final e validação de filtros. Conceitos do dia 16: múltiplos elementos, Locator com vários matches, filter({ hasText }), escopo de Locators, chaining de Locators, prevenção de strict mode violations, seleção por identidade em vez de posição, validação de efeitos colaterais e toBeHidden().
---