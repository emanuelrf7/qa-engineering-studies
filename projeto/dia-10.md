# Dia 10 - Test Design

## Exercício 1 - Particionamento de equivalência

Uma aplicação permite cadastrar uma quantidade de parcelas.
Regra:
- O número de parcelas deve estar entre 1 e 2, inclusive.
Considere apenas números inteiros.

### Questões:
1. *Quantas partições de equivalência existem?*
- **Resposta:** 3.
2. *Quais são as partições válidas e inválidas?*
- **Resposta:** parcelas < 1 -> Inválido; 1 <= idade <= 12 -> Válido; idade > 12 -> Inválido.
3. *Escolha um valor representativo para cada partição.*
- **Resposta:** Partição 1 -> 0; Partição 2 -> 7; Partição 3 -> 20.
4. Escreva os casos no formato:
Entrada:
Partição:
Resultado esperado:

| Entrada | Partição | Resultado esperado |
| --- | --- | --- |
| parcelas < 1 | 0 | Inválido |
| 1 <= parcelas <= 12 | 7 | Válido |
| parcelas > 12 | 20 | Inválido |
---