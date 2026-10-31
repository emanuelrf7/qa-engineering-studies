# Dia 21 — Ciclo de vida e escopo das fixtures no Playwright

## Exercício 1 — Fixação conceitual
Responda com suas próprias palavras:

*1. Qual é a diferença entre setup e teardown em uma fixture?*
- **Resposta:** Setup prepara os recursos necessários para o teste antes da execução do mesmo. Teardown realiza o "fechamento" da fixture, realizando ações como limpeza, por exemplo.

*2. Se uma fixture não declarar seu escopo, qual será o comportamento padrão?*
- **Resposta:** O padrão é test: uma instância independente para cada teste que utiliza a fixture.

*3. Imagine que temos 8 testes executados por 4 workers. Se uma fixture tiver escopo worker e todos os testes a utilizarem, quantas instâncias serão criadas?*
- **Resposta:** 4 instâncias, uma para cada worker.

*4. Por que compartilhar uma mesma instância de Page entre vários testes pode comprometer o isolamento dos testes?*
- **Resposta:** Pois pode acabar gerando dependência entre os testes da suíte.
---
## Exercício 2 — Compatibilidade entre escopos
Analise a seguinte fixture:
```
    workerResource: [
    async ({ page }, use) => {
        const resource = {
            page,
        };

        await use(resource);
    },
    { scope: 'worker' }
]
```
Uma colega pretende compartilhar esse recurso entre todos os testes executados pelo mesmo worker.
Responda às três questões:

*1. Essa implementação é válida no Playwright?*
- **Resposta:** Não. O Playwright não permite que uma fixture com escopo worker dependa de uma fixture com escopo test.

*2. Considerando os escopos padrão, qual é o problema de utilizar page dentro de uma fixture worker?*
- **Resposta:** Pois page deveria estar dentro do escopo de teste, não de worker.

*3. Como você reorganizaria essa implementação para respeitar o ciclo de vida dos recursos?*
- **Resposta:** Existem dois caminhos: 1. Se o recurso precisa utilizar page - a fixture deve ter escopo test, que já é o padrão; 2. Se o recurso precisa ser compartilhado pelo worker: ele não pode depender de page. Deve utilizar apenas dependências compatíveis com o escopo worker.

### Para confirmar o entendimento
Imagine que você precisa criar uma fixture que disponibilize uma página do navegador para cada teste, mas deseja manter a inicialização automatizada. Responda:

*1. Qual escopo você escolheria para essa fixture e por quê?*
- **Resposta:** Escolheria escopo test pois a fixture depende de page, logo ela deve possuir escopo test.
---