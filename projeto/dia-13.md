# Dia 13 — Jira e ciclo de vida de defeitos

## Exercício 1 — Estruturando uma issue no Jira
Considere o seguinte defeito:
Em homologação, ao alterar o endereço de entrega no checkout e concluir uma compra, o sistema exibe o novo endereço na tela, porém o pedido é salvo com o endereço antigo. O problema ocorre em todas as tentativas realizadas. O pagamento e a criação do pedido funcionam normalmente.

Imagine que você precisa registrar esse problema no Jira.

Preencha:

| Campo | Conteúdo |
| --- | --- |
| Issue Type | Bug/Defeito |
| Summary | Checkout — Persistência do endereço antigo mesmo após alteração de endereço de entrega |
| Environment | Homologação |
| Priority | Alta |
| Severity | Alta |
| Description | Na tela de Checkout o usuário tem a possibilidade de alterar o endereço de entrega antes de finalizar o pedido. Porém, ao realizar o fluxo citado acima, embora o sistema exiba o novo endereço na tela o pedido é salvo mantendo o endereço anterior, causando inconsistência nos dados mesmo após a compra ser realizada com sucesso. |
| Preconditions | Usuário autenticado; Possuir ao menos um item no carrinho; Possuir um endereço de entrega previamente cadastrado; Estar no checkout. |
| Steps to reproduce | 1. Clicar em "Editar endereço de entrega"; 2. Preencher o formulário de endereço com um endereço válido e salvar; 3. Confirmar que o endereço é exibido na tela; 4. Concluir a compra; 5. Consultar o pedido criado. |
| Actual result | Endereço é exibido na tela, porém o pedido persiste com o endereço antigo após a conclusão da compra |
| Expected result | Endereço do pedido reflete o novo endereço cadastrado na alteração de endereço |
| Evidence | Print do novo endereço exibido no checkout e do endereço antigo salvo no pedido; Log do momento da edição do endereço. |

Depois responda:

*1. Qual seria a diferença entre Reporter e Assignee nessa issue?*
- **Resposta:** O Reporter seria o colaborador que reportou o bug encontrado. Já o Assignee é o colaborador responsável pelo bug, pode ser tanto responsável pelo acompanhamento quanto responsável pela tratativa do mesmo, depende de como a empresa utiliza o Jira.

*2. Você consideraria esse bug um blocker da release? Justifique.*
- **Resposta:** Pode ser blocker, mas não dá para afirmar apenas pelas informações fornecidas. A decisão dependeria de fatores como impacto, frequência, workaround e proximidade da release.

*3. Se esse bug estivesse relacionado à história **US-245 — Alteração de endereço no checkout**, como você relacionaria conceitualmente as duas issues?*
- **Resposta:** Realizaria um link entre as issues, usando uma relação adequada ao workflow da empresa.

*4. Por que informações como ambiente e evidências continuam importantes mesmo estando usando Jira?*
- **Resposta:** O Jira serve para controlar e organizar features e bugs em um time que utiliza metodologia ágil, mas o bug estar registrado no Jira por si só não considera um bug report adequado. O bug report cadastrado no Jira também precisa ter suas informações completas, e ambiente e evidências fazem parte dessas informações.
---
## Exercício 2 — Ciclo de vida do defeito
Considere este workflow simplificado:

    Open
    -> In progress
    -> Ready for QA
    -> In QA
    -> Closed

E responda como o status deveria evoluir em cada situação abaixo.

*Cenário A* —
**QA registra um novo bug e ainda ninguém começou a trabalhar nele.**

*Cenário B* —
**Um desenvolvedor iniciou a correção do bug.**

*Cenário C* —
**O desenvolvedor finalizou a correção e disponibilizou uma nova versão em homologação para validação.**

*Cenário D* —
**QA iniciou o reteste da correção.**

*Cenário E* —
**QA confirmou que o bug foi corrigido e que não encontrou regressões relacionadas.**

*Cenário F* —
**QA realizou o reteste, mas o problema original ainda ocorre.**

*Cenário G* —
**O bug original foi corrigido, mas durante o reteste QA encontrou um novo defeito diferente no mesmo fluxo.**

Monte:

| Cenário | Status / Ação | Justificativa
| --- | --- | --- |
| A | Open | A issue já foi criada/aberta no Jira porém nenhum desenvolvedor ainda iniciou a trabalhar na mesma, portanto, o status mais adequado é Open. Outro status que poderia ser pertinente é Backlog ou Backlog da Sprint. Como não foi citado no workflow, o escolhido foi Open. |
| B | In Progress | Issue criada/aberta e desenvolvedor iniciou o desenvolvimento, portanto, status In Progress. |
| C | Ready for QA | Desenvolvedor finalizou a correção e subiu a mesma para o ambiente de homologação mas os testes ainda não foram iniciados, portanto, status Ready for QA. |
| D | In QA | Após o deploy com sucesso da aplicação no ambiente de homologação, o QA iniciou o reteste da correção. Portanto, status In QA. |
| E | Closed | QA finalizou os testes e não encontrou nenhuma inconsistência, tanto no bugfix em específico quanto em regressões relacionadas. Portanto, status Closed. |
| F | In Progress | Já que não existe status específico para falha no ambiente de teste ou falha nos testes de QA, o mais adequado seria a transição de In QA -> In Progress, visto que essa transição fica registrada no histórico e indica que passou pelo QA mas não foi aprovada (já que não progrediu para o status Closed). |
| G | Closed | Para esse caso, na minha visão o ideal é fechar a issue referente ao bug que foi corrigido e abrir um novo bug report/issue no Jira detalhando o bug encontrado. |

Depois responda:

*1. Qual é a diferença entre reabrir um bug e abrir um novo bug?*
- **Resposta:** A reabertura de um bug indica que o bug havia sido corrigido (ou achava-se que havia sido corrigido) mas voltou a acontecer mesmo após ter sido considerado finalizado/corrigido. Como se trata do mesmo bug, reabrimos para reaproveitar a issue (já que é o mesmo bug) e adicionamos um comentário detalhando a situação. Um novo bug deve ser aberto quando encontramos um defeito diferente do original, mesmo que ele tenha surgido no mesmo fluxo, durante o reteste ou após uma nova release.

*2. Se o bug foi corrigido, mas surgiu outro defeito diferente no mesmo fluxo, você reutilizaria a mesma issue? Por quê?*
- **Resposta:** Não. Acredito que o melhor a se fazer é fechar a issue atual e abrir uma nova por dois motivos: 1 - Rastreabilidade: Fazendo dessa forma é possível manter todo o histórico referente ao bug corrigido.; 2 - Organização: Mesmo que o fluxo seja igual, se o bug for diferente ele deve ter sua issue específica, pois dessa forma o Jira não fica bagunçado com issues que correspondem a mais de um bug, trazendo melhor organização para o quadro na Sprint.

*3. Por que é importante registrar comentários no Jira durante transições relevantes, como envio para QA, falha no reteste ou reabertura?*
- **Resposta:** Pois o status nem sempre indica tudo o que aconteceu para que o status fosse alterado, seja para progressão ou regressão. Dessa forma, os comentários servem também como um complemento a alteração de status da issue.

*4. Se um bug voltar para In Progress após falhar no reteste, isso altera sua severidade ou prioridade automaticamente?*
- **Resposta:** A transição de status não altera por si só nem a severidade nem a prioridade. A prioridade pode mudar mediante nova avaliação, medindo fatores como release iminente, aumento do risco ou descoberta de impacto maior, por exemplo.
---
## Exercício 3 — Reteste, comentários e reabertura
Considere o bug:

    PAY-318 — Checkout permite concluir compra com cartão expirado

O desenvolvedor marcou como corrigido e enviou a issue para Ready for QA.

No reteste em homologação, versão v2.14.3, você executou:
- cartão válido → compra concluída normalmente;
- cartão expirado há 1 mês → corretamente recusado;
- cartão expirado no mês anterior → corretamente recusado;
- cartão com validade 10/2026, considerando que o mês atual é 10/2026 → compra recusada.
O requisito diz:
O cartão é válido até o último dia do mês indicado na validade.

Portanto, ainda existe um problema, mas agora em uma condição de borda.

Responda:

*1. Você fecharia a issue PAY-318, reabriria/devolveria para desenvolvimento ou abriria outro bug? Justifique.*
- **Responda:** Reabriria/devolveria para o desenvolvimento. O requisito diz explicitamente que o cartão é válido até o último dia do mês indicado na validade. Portanto, o cartão com validade 10/2026 não deveria ser recusado por estar expirado já que o mesmo permanece válido até o último dia do respectivo mês (Outubro).

*2. Qual status você utilizaria considerando nosso workflow simplificado?*
- **Responda:** In QA -> In Progress.

*3. Escreva um comentário de reteste para o Jira contendo as informações que você considera necessárias.*
- **Responda:** Reteste realizado pelo QA Emanuel Franco. Seguem detalhes: - Versão testada: v2.14.3; - Ambiente: Homologação; - Resultado do reteste: Falha - Cartão com validade 10/2026 é tratado como expirado durante outubro/2026; - Evidências: Print do cartão utilizado no teste - Print da mensagem de compra recusada - Log do momento da rejeição da compra; - Motivo da reabertura: O requisito diz que o cartão está válido até o último dia do mês respectivo ao mês de vencimento do cartão. Portanto, independente do dia do mês de vencimento do cartão, o cartão não deve ser considerado expirado, desde que as demais condições aplicáveis à compra sejam válidas; - Informações relevantes para DEV: Trecho do requisito que impõe essa regra.

*4. Você manteria as evidências antigas e adicionaria as novas, ou substituiria tudo? Por quê?*
- **Responda:** Manteria as evidências antigas e adicionaria as novas pois dessa forma é possível ter rastreabilidade e histórico de toda a vida do respectivo bug, sem comprometer nenhuma informação no processo.

*5. O fato de o comportamento original ter melhorado parcialmente é suficiente para considerar o bug corrigido? Explique.*
- **Responda:** Não. Como o próprio enunciado diz, o bug teria corrigido o comportamento de forma parcial. Acredito que, quando levantamos um bug para correção, a funcionalidade deve ser restaurada completamente ao seu comportamento original. Mas, se for considerado que o impacto não será tão grande e há possibilidade de corrigir o bug depois, a prioridade pode ser reavaliada e, caso exista uma decisão formal de não corrigir ou aceitar o risco, a issue pode receber uma resolução/status correspondente, como "Won't Fix" ou "Accepted Risk", conforme o workflow da empresa.
---
## Exercício 4 — Triagem de defeitos
Considere que uma release está prevista para daqui a dois dias.

| Bug | Situação |
| --- | --- |
| BUG-A | Em produção, 5% dos pagamentos com cartão retornam erro. O usuário pode tentar novamente e normalmente consegue concluir a compra. |
| BUG-B | Em homologação, um novo fluxo de cadastro permite criar conta sem aceitar os Termos de Uso, embora isso seja obrigatório pelo requisito. A funcionalidade fará parte da próxima release. |
| BUG-C | Em homologação, o texto do botão “Confirmar pagamento” aparece como “Confirmar pagamnto”. |
| BUG-D | Em produção, usuários conseguem alterar o e-mail do perfil, mas o e-mail antigo continua sendo utilizado para recuperação de senha. |
| BUG-E | Um bug aberto anteriormente não consegue mais ser reproduzido na versão atual e não existe evidência suficiente para confirmar quando ou como deixou de ocorrer. |

Para cada um, indique:
- Severidade
- Prioridade
- Ação sugerida na triagem
- Justificativa

| Bug | Severidade | Prioridade | Ação sugerida | Justificativa |
| --- | --- | --- | --- | --- |
| A | Média | Média | Investigar e planejar correção, sem necessariamente bloquear a próxima release | Embora a falha no pagamento com cartão possa trazer desconfiança ou medo para o usuário a primeira vista, ao tentar novamente a compra é concluída normalmente. Levando isso em consideração e a porcentagem de pagamentos com erro sendo muito baixa (5%), tanto a severidade quanto a prioridade são média para esse caso. Até a release que corrige esse problema em definitivo a orientação ao usuário contorna o problema momentaneamente. |
| B | Alta | Alta | Corrigir antes da release | O fluxo funcional continua operando, porém permitir a criação de conta sem o aceite obrigatório dos Termos de Uso pode gerar impacto jurídico/compliance relevante para a empresa. Portanto, deve haver correção antes da release. |
| C | Baixa | Baixa | Manter no backlog | Um erro de escrita não pode ser desconsiderado mas o mesmo não causa impacto relevante ao sistema e ao usuário para bloquear uma release. |
| D | Crítica | Crítica | Investigar imediatamente | Se o usuário perde o acesso e alterou o e-mail antes disso, o mesmo não conseguirá recuperar sua senha e, portanto, não conseguirá acessar o sistema, fazendo com que o mesmo perca toda a produtividade que ganha com o uso do sistema ou até mesmo na não possibilidade de realizar seu trabalho, o que ocasiona um impacto crítico. |
| E | Manter classificação anterior / não é possível determinar c om os dados fornecidos | Reavaliar  conforme impacto original e contexto atual | Retestar - Investigar - Solicitar informações adicionais | O fato de não conseguirmos reproduzir não prova que o defeito deixou de existir, portanto é um movimento arriscado fechar como não reproduzível. Primeiro, é necessário tentar outras ações, como: reproduzir nas mesmas condições originais, se conhecidas; verificar versões/ambientes; consultar evidências e comentários anteriores; verificar logs; perguntar ao Reporter se existem informações adicionais; identificar se alguma alteração recente pode ter afetado o comportamento. Se, após uma investigação mais robusta ainda não for possível reproduzir e faltarem informações suficientes, ai é válido considerar uma resolução como "Cannot Reproduce", "Unable to Reproduce" ou "Needs More Information", mediante workflow da empresa. |

Depois responda:

*1. Triagem de bugs serve apenas para definir prioridade?*
- **Resposta:** Não, serve também como uma decisão coletiva sobre como tratar o defeito. A triagem pode definir elementos como: validade do bug; severidade; prioridade; responsável; necessidade de investigação; é ou não blocker da release; duplicidade; necessidade de mais informações; aceitação de risco; release alvo. 

*2. Quem deveria participar de uma triagem de defeitos?*
- **Resposta:** Pode depender do workflow da empresa, mas em uma composição comum: QA, Desenvolvimento e Produto/PO. Outras áreas podem entrar conforme necessário, como por exemplo: Segurança -> para vulnerabilidade; DS/DBA -> problema de dados; Suporte -> impacto reportado por clientes; Jurídico/Compliance -> para casos como o do "BUG-B"; liderança -> decisões críticas/release.

*3. Um QA deve decidir sozinho que um bug não será corrigido? Por quê?*
- **Resposta:** Não. A decisão deve seguir os papéis e responsabilidades definidos pela organização e não torná-la em uma decisão unilateral do QA.

*4. No **BUG-E**, qual o risco de simplesmente marcar como **Closed** dizendo que "agora funciona"?*
- **Resposta:** O bug ressurgir e não ser possível replicar e desenvolver a tratativa para o mesmo de imediato, sendo necessário um esforço com a investigação da causa raiz do problema. Além disso, marcar como "Closed" comunica que a issue foi resolvida, o que não seria verdade.

*5. Qual é a diferença entre não reproduzir um bug e provar que ele foi corrigido?*
- **Resposta:** Quando você não consegue reproduzir um bug você não sabe ou não tem informações suficientes para replicar aquele comportamento, podendo acontecer a qualquer momento (já que a situação é incerta) e gerar problemas de produtividade ou até de perda financeira, dependendo do caso. Já quando você comprova que um bug foi corrigido, você tem conhecimento do fluxo que ocasionava o problema (incluindo evidências) e consegue reexecutar o cenário que anteriormente provocava o defeito, podendo evidenciar que o funcionamento atual corresponde à correção do respectivo bug.
---