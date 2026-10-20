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