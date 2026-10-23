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