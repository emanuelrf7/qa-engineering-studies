# Dia 30 — CI/CD com Playwright e GitHub Actions

## Exercício 1 — Primeira pipeline com GitHub Actions
Responda:

*1. Qual é a diferença entre push e pull_request como eventos de disparo de um workflow?*
- **Resposta:** Push -> O comando git push dispara o workflow quando alterações são enviadas ao repositório remoto. No nosso caso, como não foi configurado um filtro de branches, qualquer branch pode dispará-lo; Pull Request -> A pipeline é disparada toda vez que um Pull Request de uma branch for aberto para a branch main.

*2. Qual é a responsabilidade do runs-on e por que utilizamos ubuntu-latest?*
- **Resposta:** Indica qual ambiente queremos que a pipeline seja executada. O ubuntu-latest indica que a pipeline deve rodar utilizando uma máquina virtual Linux (ubuntu) fornecida pelo GitHub Actions.

*3. Por que utilizamos npm ci em vez de npm install em uma pipeline de CI?*
- **Resposta:** Porque o npm ci instala as dependências do projeto seguindo rigorosamente o package-lock.json. As principais diferenças são:
    - npm install -> Pode atualizar o package-lock; npm ci -> Não modifica o package-lock.
    - npm install -> Pode resolver versões conforme as dependências declaradas; npm ci -> Instala as versões registradas no lockfile.
    - npm install -> Pode ser utilizado no desenvolvimento; npm ci -> É especialmente adequado para instalações reproduzíveis em CI.

*4. O que acontece com o job quando o comando npx playwright test retorna um código de saída diferente de zero?*
- **Resposta:** O job é interrompido exibindo a seguinte mensagem: "Error: Process completed with exit code 1.". Além disso, o respectivo step também falha. Apenas reforçando, etapas posteriores podem continuar executando caso tenham condições específicas, como if: always().
---
## Exercício 2 — Publicação de relatórios e artefatos no GitHub Actions
Responda:

*1. Qual é a diferença entre gerar um relatório HTML localmente e publicá-lo como artefato no GitHub Actions?*
- **Resposta:** Serve como evidência e uma informação a mais sobre o que a pipeline executou e seus resultados para todos os colaboradores do projeto, não apenas para o responsável pela execução localmente.

*2. Por que utilizamos if: ${{ !cancelled() }} nos steps de upload?*
- **Resposta:** Porque dessa forma o relatório é publicado como artefato mesmo que algum step da pipeline falha, mantendo a rastreabilidade.

*3. Qual é a vantagem de manter os relatórios disponíveis por 30 dias?*
- **Resposta:** A vantagem é que temos os relatórios disponíveis por um tempo considerável (30 dias) e não mantemos os mesmos para sempre, de forma que sejam acumulados muitos relatórios de testes que, com o tempo, se tornarão obsoletos e apenas ocuparão um espaço de memória desnecessário.

*4. Qual é a diferença entre os artefatos playwright-html-report e playwright-structured-reports?*
- **Resposta:** O playwright-html-report gera o relatório em formato HTML, que é interativo e melhor legível para todos, incluindo usuários não-técnicos. Já o playwright-structured-reports é onde são gerados os relatórios mais "técnicos", em formato JSON e XML, que nos permitem criar relatórios personalizados utilizando o JSON ou integrar em ferramentas de resultado de testes que possuam suporte a XML com o relatório XML.
---
## Exercício 3 — Investigação de falhas em CI/CD
Responda:

*1. Por que o job inteiro ficou vermelho mesmo que os dois steps de upload tenham sido concluídos com sucesso?*
- **Resposta:** Porque a pipeline (workflow) é considerada falha a partir do momento que um dos steps sejam declarados como falho, ou seja, retornem código de saída 1. Então mesmo que os steps de upload tenham sido concluídos com sucesso, o step de teste não foi, resultando na falha da pipeline.

*2. Quais informações do HTML Report ajudaram a identificar a origem da falha?*
- **Resposta:** Summary do teste executado; Trace Viewer; Nome e projeto do teste que falhou; Mensagem de erro; Valor esperado e valor recebido; Stack trace e linha de código; Histórico de retries; Anexos da execução.

*3. Qual foi a contribuição do Trace Viewer para essa investigação?*
- **Resposta:** O grande diferencial do Trace Viewer é permitir entender o que aconteceu durante a execução, e não apenas descobrir onde ocorreu a falha.

*4. Por que é importante preservar os relatórios de uma execução que falhou?*
- **Resposta:** Porque dessa forma temos as evidências da falha e informações e ferramentas a mais para realizar a análise do mesmo.
---