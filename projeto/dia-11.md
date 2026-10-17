# Dia 11 — Análise de requisitos e criação de cenários de teste

## Exercício 1 — Requisito funcional e regras de negócio
Considere esta história:
Como cliente de uma conta digital, quero realizar transferências via PIX para poder enviar dinheiro para outras pessoas.
A transferência deve possuir valor mínimo de R$1,00 e máximo de R$5.000,00.
O cliente deve possuir saldo suficiente.
Contas bloqueadas não podem realizar transferências.
### Questões:
*1. Qual é o requisito funcional principal?*
- **Resposta:** "Realizar transferências via PIX para poder enviar dinheiro para outras pessoas."

*2. Quais são as regras de negócio presentes?*
- **Resposta:** 1 - "A transferência deve possuir valor mínimo de R$1,00 e máximo de R$5.000,00."; 2 - "O cliente deve possuir saldo suficiente."; 3 - "Contas bloqueadas não podem realizar transferências."

*3. Há alguma informação que você considera importante para testar PIX e que não está definida nessa história? Cite pelo menos 3.*
- **Resposta:** Sim. 1 - O limite de R$5.000,00 é por transferência ou também existe um limite diário?; 2 - Como o sistema deve se comportar caso a chave PIX informada seja inválida ou inexistente?; 3 - O que deve acontecer se ocorrer timeout ou indisponibilidade durante o processamento da transferência?

*4. Por que identificar essas lacunas antes da execução dos testes é importante para o QA?*
- **Resposta:** Pois dessa forma é possível minimizar erros antes da implementação de um requisito funcional/regra de negócio, levando essas lacunas para o Produto/PO melhor esclarecimento. A partir das definições realizadas, novos casos de teste podem ser gerados caso o requisito/regra venha a ser atualizada.
---
## Exercício 2 — Ambiguidades e inconsistências
Considere este requisito:
O usuário poderá redefinir sua senha caso esqueça a senha atual.
O sistema deverá enviar um código de recuperação por e-mail.
O código deve expirar rapidamente.
O usuário poderá solicitar novos códigos quando necessário.
Após algumas tentativas inválidas, novas validações deverão ser bloqueadas temporariamente.
### Questões:
1. Identifique pelo menos 4 trechos ambíguos ou incompletos.
2. Para cada um deles, explique por que não é possível testá-lo de forma objetiva como está escrito.
3. Transforme cada lacuna em uma pergunta para Produto/PO.
4. Existe alguma possível inconsistência ou risco de regra conflitante nesse requisito? Se sim, explique.

| Trecho | Problema identificado | Pergunta para Produto/PO | É possivel testar? - Justificativa | Possível inconsistência / risco de regra conflitante? |
| --- | --- | --- | --- | --- |
| "O código deve expirar rapidamente" | "rapidamente" = quanto tempo? | Qual deve ser o tempo exato para expiração do código? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Não. |
| "Após algumas tentativas inválidas, novas validações deverão ser bloqueadas temporariamente" | "temporariamente" = quanto tempo? | Qual deve ser o tempo exato de bloqueio para novas validações? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Sim, pode conflitar com a regra "o usuário poderá solicitar novos códigos quando necessário" pois não está definido se o bloqueio também impede novas solicitações ou apenas novas validações. |
| "O sistema deverá enviar um código de recuperação por e-mail" | "deverá enviar um código de recuperação por e-mail" = em que ação? | Qual é o fluxo/ação que o usuário deve realizar para receber o código de recuperação? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Não foi identificado conflito direto, mas o fluxo está incompleto e existe dependência entre a solicitação de recuperação e o envio do código. |
| "Após algumas tentativas inválidas, novas validações deverão ser bloqueadas temporariamente" | "Após algumas tentativas inválidas..." = quantas tentativas? | O usuário pode realizar quantas tentativas inválidas para que aconteça o bloqueio? | É possível executar testes, mas não é possível determinar objetivamente aprovação ou reprovação sem a definição da regra. | Não. |
---
## Exercício 3 — Derivação de cenários de teste
Considere que, após alinhamento com Produto/PO, o requisito de recuperação de senha ficou definido assim:
O usuário pode solicitar a recuperação de senha informando o e-mail cadastrado.
O sistema deve enviar um código de 6 dígitos para esse e-mail.
O código expira após 5 minutos.
Apenas o código mais recentemente solicitado permanece válido.
Após 3 tentativas consecutivas de código inválido, novas validações ficam bloqueadas por 15 minutos.
Após o período de bloqueio, o usuário pode voltar a validar códigos normalmente.
### Questões:
*1. Quais são as principais regras de negócio presentes agora?*
- **Resposta:** A recuperação deve ser solicitada informando o e-mail cadastrado; O sistema deve enviar um código de 6 dígitos para esse e-mail; O código expira após 5 minutos; Apenas o código mais recentemente solicitado permanece válido; Após 3 tentativas consecutivas de código inválido, novas validações ficam bloqueadas por 15 minutos; Após o período de bloqueio, o usuário pode voltar a validar códigos normalmente.

*2. Quais técnicas de Test Design estudadas no Dia 10 você aplicaria nesse requisito? Explique onde cada uma seria útil.*
- **Resposta:** Transição de estados seria bem útil pois existe ações realizadas (como "após 3 tentativas consecutivas de código inválido, novas validações ficam bloqueadas por 15 minutos") onde há transição de estado de validação disponível para validação bloqueada. Tabela de decisão também seria uma boa técnica visto que podemos ter várias combinações de condições que geram um resultado específico, como por exemplo: 1. Código expirado? - Não; 2. Existe bloqueio para validações? - Não; 3 - Código mais recentemente solicitado? - Sim; 4. Resultado esperado: Código válido para recuperação de senha. Análise de Valor Limite para os 5 minutos de validade, 3 tentativas inválidas e 15 minutos de bloqueio e Particionamento de Equivalência, para definir partições para código válido / inválido / expirado e formato de 6 dígitos válido / inválido.
*3. Derive pelo menos 8 cenários de teste a partir dessas regras. Use apenas esse formato: Cenário: / Resultado esperado:*
- **Resposta:**

| Cenário | Resultado esperado |
| --- | --- |
| Solicitação de recuperação de senha informando o e-mail cadastrado | Usuário consegue solicitar a recuperação de senha com sucesso. Sistema deve enviar e-mail com o código de recuperação de senha |
| Solicitação de recuperação de senha sem informar o e-mail cadastrado | Solicitação de recuperação não deve prosseguir |
| Duas solicitações de recuperação consecutivas | Sistema deve enviar os códigos para o e-mail do usuário e apenas o mais recente deve ser válido |
| Tentativa de recuperação de senha com código expirado | Código não deve ser aceito para a recuperação de senha |
| Bloqueio após três tentativas inválidas consecutivas | Sistema deve bloquear novas validações de código durante os 15 minutos de bloqueio |
| Nova tentativa de validação após o período de bloqueio | Novas validações voltam a ser permitidas |
| Solicitar segundo código e tentar usar o primeiro | Sistema deve rejeitar o primeiro código e o segundo deve ser o único válido |
| Expiração de código de recuperação de senha | Sistema deve invalidar o código de recuperação caso o mesmo não tenha sido utilizado e 5 minutos tenham se passado |

*4. Como você sabe que os cenários criados cobrem as regras principais?*
- **Resposta:** Garantindo que exista pelo menos um cenário para cada regra de negócio principal. Após a definição dos cenários principais que atendem ao "caminho feliz" de cada regra de negócio é possível criar cenários alternativos e de exceção. Além disso, também é possível testar limites, transições e combinações quando existirem/fizerem sentido. 

*5. Qual risco existiria em criar apenas o cenário "código válido redefine a senha com sucesso"?*
- **Resposta:** A negligência de um possível bug no comportamento caso o usuário acesse um código inválido. Por exemplo, o código foi recebido a 10 minutos, usuário acessa esse código e consegue realizar a alteração da senha -> esse fluxo corresponderia a um fluxo incorreto que só pode ser identificado caso não seja criado apenas o "cenário feliz" de código válido redefinindo a senha com sucesso.
---
## Exercício 4 — Rastreabilidade entre requisitos e cenários
Considere este requisito de checkout:
O cliente pode finalizar uma compra utilizando cartão de crédito.
O cartão deve estar dentro da validade.
O limite disponível deve ser igual ou superior ao valor da compra.
Compras acima de R$ 2.000 exigem confirmação adicional do cliente.
Após 3 tentativas consecutivas de pagamento recusado, novas tentativas ficam bloqueadas por 30 minutos.
### Questões:
*1. Identifique as regras e numere-as: R1, R2, R3...*
- **Resposta:** R1 -> Cliente pode finalizar uma compra utilizando cartão de crédito; R2 -> O cartão deve estar dentro da validade; R3 -> O limite disponível deve ser igual ou superior ao valor da compra; R4 -> Compras acima de R$2.000 exigem confirmação adicional do cliente; R5 -> Após 3 tentativas consecutivas de pagamento recusado, novas tentativas ficam bloqueadas por 30 minutos.

*2. Crie pelo menos 7 cenários de teste, identificando-os como: CT01, CT02, CT03...*

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CT01 | Finalizar compra com cartão de crédito dentro da validade e limite suficiente | Compra efetuada com sucesso |
| CT02 | Finalizar compra com cartão de crédito com data vencida | Pagamento recusado e compra não efetuada |
| CT03 | Finalizar compra com cartão de crédito dentro da validade e limite insuficiente para o valor da compra | Pagamento recusado e compra não efetuada |
| CT04 | Confirmação adicional para compras de R$2.000 | Compra igual ou abaixo do valor de R$2.000 não deve exigir confirmação adicional antes de prosseguir com o pagamento |
| CT05 | Confirmação adicional para compras acima de R$2.000 | Compra acima de R$2.000 deve exigir confirmação adicional antes de prosseguir com o pagamento |
| CT06 | Pagamento com cartão de crédito válido recusado 3 vezes consecutivas | Novas tentativas de pagamento bloqueadas por 30 minutos |
| CT07 | Nova tentativa de pagamento com cartão de crédito válido e limite suficiente após fim do bloqueio | Compra efetuada com sucesso |

*3. Rastreabilidade*

| Regra | Cenários que cobrem a regra |
| --- | --- |
| R1 | CT01 |
| R2 | CT01, CT02 |
| R3 | CT01, CT03 |
| R4 | CT04, CT05 |
| R5 | CT06, CT07 |

*4. Análise*

1. Como a rastreabilidade ajuda a identificar lacunas na cobertura?
    - **Resposta:** Usando a rastreabilidade é possível visualizar quais regras estão sendo abordadas nos cenários de teste e se alguma regra não possui cenário de teste vinculado.
2. Se Produto alterar o limite de confirmação adicional de R$2.000 para R$3.000, como essa tabela ajuda o QA?
    - **Resposta:** O QA consegue acessar o teste vinculado a regra sem perder muito tempo procurando ou tentando lembrar qual teste equivale à regra específica, alterando apenas o(s) teste(s) condizentes aquela regra. É possível, também, visualizar todos os testes que podem ser impactados com a alteração da respectiva regra.
3. Uma regra possuir apenas um cenário associado significa necessariamente que ela está bem testada? Por quê?
    - **Resposta:** Depende da regra. Uma regra pode ter 1 cenário como também pode ter 10 cenários, o que manda é a própria regra: se for uma regra direta onde não há cenários alternativos/exceção para a mesma apenas 1 cenário pode fazer sentido. Já uma regra como "O limite disponível deve ser igual ou superior ao valor da compra" abre possibilidade para um cenário principal e um alternativo: limite de crédito suficiente e limite de crédito insuficiente.
---