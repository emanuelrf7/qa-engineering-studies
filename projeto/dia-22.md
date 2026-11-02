# Dia 22 — Hooks de teste no Playwright

## Exercício 4 — Grupos aninhados e ordem dos Hooks
Responda:

*1. O primeiro teste recebe os Hooks dos três níveis?*
- **Resposta:** Sim, recebe os Hooks globais, os hooks do grupo "Página Example" e os hooks do grupo "Validação de título".

*2. O segundo teste recebe os Hooks globais e do grupo, mas não os do subgrupo?*
- **Resposta:** Sim.

*3. O terceiro teste recebe somente os Hooks globais?*
- **Resposta:** Sim.

*4. Os Hooks de encerramento respeitam a hierarquia inversa?*
- **Resposta:** Sim, do mais interno para o mais externo.
---