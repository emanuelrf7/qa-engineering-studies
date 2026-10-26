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
## Exercício 2 — Refatoração com beforeEach()
Responda:

*1. Quantas vezes o beforeEach() será executado nesse cenário?*
- **Resposta:** 2 vezes.

*2. Por que não colocamos a criação de Estudar Playwright dentro do beforeEach()?*
- **Resposta:** Pois a intenção do beforeEach() é executar um setup comum antes de cada teste, como a navegação até a página, por exemplo. Portanto, a criação de Estudar Playwright dentro de beforeEach() não faz sentido considerando o escopo do mesmo. Além disso, para cada teste, seria executado a criação da tarefa Estudar Playwright sem necessidade.

*3. Se o primeiro teste falhar, o segundo ainda deveria poder executar corretamente? Por quê?*
- **Resposta:** Sim, pois cada teste possui um BrowserContext isolado e é executado de forma independente. O que o test.describe() faz é agrupar os testes relacionados, não criar uma dependência entre os testes.

*4. Qual código repetido foi removido ao usar beforeEach()?*
- **Resposta:** O código de navegação até a página: await page.goto("https://demo.playwright.dev/todomvc/").

*5. O que cada teste ainda precisa preparar por conta própria?*
- **Resposta:** A captura do input, preenchimento da tarefa desejada, validação do input preenchido com a tarefa desejada, envio do Enter para cadastro da tarefa, validação do input vazio após a criação da tarefa e validação da tarefa sendo exibida na página.

*6. Se os dois testes usarem o mesmo page.getByPlaceholder(...), isso significa que estão compartilhando o mesmo elemento ou apenas a mesma estratégia de localização?*
- **Resposta:** A mesma estratégia de localização, pois como dito acima, o Playwright cria um BrowserContext novo para cada teste e cada teste recebe sua própria fixture page isolada.

*7. Se você executar somente o segundo teste pelo nome, ele deveria funcionar sozinho? O que isso demonstra sobre isolamento?*
- **Resposta:** Sim. Isso demonstra que mesmo os testes pertencendo a um agrupamento pois serem relacionados, cada um é independente. Logo, sua execução é única, não dependendendo de outro teste.
---
## Exercício 3 — Organização com describe aninhado
Responda:

*1. Qual é a vantagem de ter um describe('TodoMVC') externo e grupos internos por funcionalidade?*
- **Resposta:** Separação de responsabilidade para os testes e melhor legibilidade da suíte.

*2. O beforeEach() externo será executado para testes dentro dos describe() internos?*
- **Resposta:** Sim, pois o mesmo está dentro do describe() global (TodoMVC).

*3. Quantas vezes ele será executado se existirem exatamente esses dois testes?*
- **Resposta:** 2 vezes. No meu caso, como mantive os dois testes de criação de tarefa e criei o teste de conclusão de tarefa, será executado 3 vezes.

*4. O teste de conclusão pode usar a tarefa criada no teste de criação? Por quê?*
- **Resposta:** Não, pois o teste de conclusão não pode usar a tarefa criada pelo teste de criação porque cada teste possui um BrowserContext isolado e não deve depender do estado criado por outro teste.

*5. Por que o teste de conclusão precisa criar Estudar API por conta própria?*
- **Resposta:** Pois esse estado faz parte da pré-condição do próprio teste, ou seja: objetivo do teste -> concluir uma tarefa; pré-condição -> uma tarefa precisa existir; responsabilidade do próprio teste -> preparar essa tarefa.

*6. O agrupamento com describe() altera o isolamento entre os testes?*
- **Resposta:** Não.

*7. Qual diferença existe entre organização lógica da suíte e compartilhamento de estado?*
- **Resposta:** A organização lógica serve para criarmos agrupamento entre testes relacionados mas que são independentes entre si, ou seja, não dependem do estado de nenhum teste para serem executados. Já o compartilhamento de estado possui um estado mutável criado por um teste e exigido por outro, gerando acoplamento de testes.
---
## Exercício 4 — Desafio final: suíte organizada e independente
Responda:

*1. Por que o beforeEach() deve continuar apenas com a navegação nesse cenário?*
- **Resposta:** Pois é o único setup que todos os testes compartilham entre si.

*2. Por que o teste de filtros precisa criar suas próprias tarefas?*
- **Resposta:** Pois o teste não possui dependência entre os testes de criação de tarefas. Logo, é responsabilidade do próprio teste preparar essas tarefas, como se fossem um pré-requisito do mesmo.

*3. Se um dos testes do grupo Criação de tarefas falhar, o teste de filtros deveria continuar funcionando? Por quê?*
- **Resposta:** Sim, pois ele não depende de nenhum teste do grupo de criação de tarefas.

*4. Qual é a vantagem de conseguirmos executar somente o teste ou grupo de filtros isoladamente?*
- **Resposta:** A vantagem é poder validar uma funcionalidade específica independentemente das demais, facilitando execução direcionada, investigação de falhas e manutenção da suíte.

*5. O que aconteceria com a confiabilidade da suíte se o teste de filtros dependesse do teste de conclusão?*
- **Resposta:** Se tornaria menos confiável e mais acoplada, visto que se filtros dependesse da conclusão, teríamos: dependência de ordem, possibilidade de falhas em cascata, dificuldade de executar filtros isoladamente, diagnóstico mais difícil e problemas com paralelismo.

*6. Qual é a responsabilidade do test.describe() na estrutura criada hoje?*
- **Resposta:** Agrupar testes relacionados atribuindo responsabilidades específicas a cada um deles, melhorando a organização e legibilidade da suíte de testes.

*7. Qual é a responsabilidade do beforeEach()?*
- **Resposta:** Configurar um setup comum entre os testes que é acionado antes da execução de cada teste.

*8. Qual é a responsabilidade do próprio test()?*
- **Resposta:** Criar o fluxo de teste com seus passos e responsabilidades específicos para cada cenário.

*9. Como você explicaria agora a diferença entre:*
- *Organização da suíte;*
- *Setup comum;*
- *Estado específico do cenário?*

    **Resposta:** Organização da suíte: Agrupamento dos testes relacionados entre si para obter melhor organização, legibilidade e manutenção de uma suíte de testes. Setup comum: É uma configuração em comum entre os testes que pode ser definida para ser executada antes de cada teste, por exemplo: a navegação até a página. Estado específico do cenário: Corresponde aos dados/pré-condições necessários somente para aquele cenário específico.

*10. No exemplo profissional de Order que discutimos, qual seria a diferença entre reutilizar um helper de criação de Order e depender de um teste de criação de Order?*
- **Resposta:** A diferença está na resiliência e confiabilidade do teste, visto que ele não depende do resultado de outro teste para ser executado, podendo utilizar um helper para criar/preparar seu próprio estado.
---