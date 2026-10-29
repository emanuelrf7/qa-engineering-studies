# Dia 20 — Integração entre POM e Fixtures no Playwright

## Exercício 1 — Compreendendo a integração
Responda às quatro questões abaixo:

*1. Responsabilidades – Qual é a diferença entre a responsabilidade de uma fixture personalizada e a responsabilidade da classe TodoPage?*
- **Resposta:** Uma fixture personalizada possui características necessárias para a execução de um teste, como um setup por exemplo. Já a classe TodoPage possui métodos utilizados para a construção do script de teste automatizado.

*2. Reutilização – Se dez testes utilizarem TodoPage, qual é a vantagem de disponibilizá-la por uma fixture em vez de instânciá-la manualmente em cada teste?*
- **Resposta:** A vantagem está na manutenção do teste que se torna muito mais fácil pois basta alterar no arquivo onde está a classe TodoPage e não nos dez testes. A vantagem adicional da fixture é evitar repetir a criação do objeto e permitir centralizar sua preparação.

*3. Isolamento – Se dois testes utilizarem a mesma definição de fixture, isso significa que eles compartilharão a mesma instância de TodoPage e a mesma página do navegador? Explique considerando o isolamento padrão do Playwright.*
- **Resposta:** Não, a cada teste é criado um novo browser limpo a partir da fixture portanto não há dependência entre os testes e não é necessário criar um novo processo de navegador para cada teste, pois o Playwright pode reutilizar o navegador, fornecendo a cada teste um BrowserContext isolado e uma instância de Page associada a esse contexto.

*4. Separação de responsabilidades – A fixture deve necessariamente navegar até o TodoMVC antes de disponibilizar TodoPage, ou podemos deixar a navegação a cargo de cada teste? Qual é a vantagem da abordagem que você escolheria?*
- **Resposta:** Delegaria a responsabilidade de navegação até o TodoMVC para a fixture pois dessa forma não é preciso explicitar no script de teste a navegação já que a fixture já deixa a página preparada. Mas, se alguns testes precisarem começar em outra rota ou testar a própria navegação, deixar goto() explícito no teste oferece mais flexibilidade.
---
## Exercício 4 — Centralizando a navegação na fixture
Responda a pergunta conceitual:

- Por que a navegação precisa acontecer antes de await use(todoPage), e não depois?

    - **Resposta:** Porque a fixture precisa preparar a página fazendo a navegação até o TodoMVC antes do objeto da classe TodoPage ser disponibilizado ao teste. Se a navegação fosse depois do use(TodoPage), o teste tentaria utilizar os métodos do objeto TodoPage porém a navegação ainda não teria acontecido, o que ocasionaria em uma falha.
---