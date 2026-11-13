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