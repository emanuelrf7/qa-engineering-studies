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
## Exercício 3 — Fixture customizada com test.extend()
Responda:

*1. Por que importamos test as base em vez de simplesmente test?*
- **Resposta:** Pois utilizaremos o test proveniente do @playwright/test como base da nossa fixture.

*2. Qual é a função de base.extend()?*
- **Resposta:** Estender o test original do Playwright para que seja possível criar uma fixture customizada com base no test original do Playwright.

*3. Por que a fixture todoPage pode utilizar a fixture nativa page?*
- **Resposta:** Porque declaramos explicitamente uma dependência entre fixtures no trecho todoPage: async ({ page }, use).

*4. O que acontece antes de await use(...) em uma fixture?*
- **Resposta:** É onde acontece a preparação da fixture.

*5. Qual é a função de await use(todoPage) ou await use(page)?*
- **Resposta:** Entregar a página preparada para os testes que utilizarão a fixture.

*6. O que normalmente pode acontecer depois de await use(...)?*
- **Resposta:** Um teardown.

*7. Por que o teste que recebe todoPage não precisa executar page.goto()?*
- **Resposta:** Pois a página que é entregue pela fixture todoPage já possui esse fluxo na sua preparação. Logo, não é necessário repetir esse código.

*8. Qual é a diferença entre:*
```
    async ({ page })
```
*e*
```
    async ({ todoPage })
```
*nesse projeto?*
- **Resposta:** async ({ page }) -> teste solicita a fixture nativa page. Já async ({ todoPage }) -> teste solicita a fixture customizada todoPage.

*9. A fixture todoPage será automaticamente executada para todos os testes existentes ou apenas para aqueles que a solicitarem?*
- **Resposta:** Apenas para aqueles que a solicitarem.

*10. Se dois testes solicitarem todoPage, eles compartilharão a mesma Page?*
- **Resposta:** Não, os testes seguem sendo independentes mesmo utilizando uma fixture customizada.

*11. Neste caso, qual diferença prática existe entre colocar a navegação em beforeEach() e encapsulá-la em uma fixture todoPage?*
- **Resposta:** A diferença prática e principal está na organização, reutilização e composição do teste. Além disso, a fixture é on-demand, enquanto um beforeEach() declarado naquele escopo executa para todos os testes desse escopo.

*12. Por que não faria sentido transformar todo helper em fixture só porque fixtures são reutilizáveis?*
- **Resposta:** Pois helper é uma operação reutilizável chamada explicitamente. Já fixture é um recurso/dependência gerenciado pelo Playwright, possui ciclo de vida e pode executar setup e teardown. Nem toda ação reutilizável precisa virar fixture.
---
## Exercício 4 — Desafio final: helper + fixture + isolamento
Responda:

*1. Qual responsabilidade pertence à fixture todoPage?*
- **Resposta:** Realizar a navegação até a página do TodoMVC e entregar ao teste a página preparada.

*2. Qual responsabilidade pertence ao helper createTodo()?*
- **Resposta:** Criar a tarefa desejada atribuindo um objeto Page e o título da tarefa como parâmetros da função.

*3. Qual responsabilidade permanece no próprio test()?*
- **Resposta:** Validar e executar o comportamento esperado proposto para o cenário.

*4. Por que passamos todoPage para createTodo() se o parâmetro do helper se chama page?*
- **Resposta:** Porque nesse caso o nome do parâmetro não implica na fixture que queremos passar para a função, o parâmetro se chamar page é apenas para tornar mais fácil de entender qual é o parâmetro esperado, que nesse caso é a page manipulada pelo Playwright nos testes.

*5. O helper precisa saber se recebeu a fixture nativa page ou a fixture customizada todoPage? Por quê?*
- **Resposta:** Não, pois ele espera um parâmetro que seja do tipo Page, onde tanto a fixture nativa page quanto a customizada todoPage cumprem a condição de tipagem.

*6. Por que o segundo teste não deve encontrar Estudar Playwright criada pelo primeiro?*
- **Resposta:** Pois cada teste recebe um BrowserContext isolado e uma Page pertencente a esse contexto.

*7. Se os dois testes utilizam todoPage, isso significa que compartilham o mesmo estado?*
- **Resposta:** Não, apenas compartilham a mesma fixture.

*8. Qual benefício existe em combinar fixture e helper em vez de colocar toda a preparação dentro de um único beforeEach()?*
- **Resposta:** Organização, reutilização e composição da suíte de testes, além de cada teste chamar apenas o necessário para sua execução, já que fixtures são on-demand e blocos de código presentes em beforeEach() são executados para todos os testes da suíte.

*9. Em qual situação você escolheria um helper em vez de uma fixture?*
- **Resposta:** Quando quero encapsular uma operação reutilizável chamada expliciamente pelo teste ou por outro código.

*10. Em qual situação você escolheria uma fixture em vez de um helper?*
- **Resposta:** Quando quero fornecer ao teste um recurso ou dependência com ciclo de vida gerenciado pelo Playwright, já que ela pode: fazer setup, fornecer um recurso, depender de outras fixtures, executar teardown e ser usada somente pelos testes que a solicitam.

*11. Relacionando com seu exemplo profissional de Order, como você poderia imaginar uma combinação de fixture + helper para preparar testes de Order sem depender de outros testes?*
- **Resposta:** Se muitos testes tiverem como pré-condição uma Order existente, uma fixture pode preparar e fornecer essa Order, inclusive com teardown. Caso contrário, uma fixture pode preparar o ambiente — como uma página autenticada — e um helper createOrder() pode executar a criação da Order quando necessário.

*12. Depois de hoje, como você explicaria em uma frase cada um:*

    - beforeEach();
    - helper;
    - fixture.
- **Resposta:** beforeEach() -> Hook que execeuta um setup comum antes de cada teste do seu escopo; helper -> Função reutilizável chamada explicitamente para executar uma responsabilidade/operação; fixture -> Recurso ou dependência fornecido e gerenciado pelo Playwright, podendo possuir setup e teardown.
---