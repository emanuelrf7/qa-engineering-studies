# QA Engineering Studies

Repositório dedicado ao registro da minha evolução técnica em **QA Engineering**, partindo dos fundamentos de programação aplicados à qualidade de software e avançando progressivamente para automação de testes, arquitetura de testes e práticas mais próximas de projetos reais.

O objetivo não é apenas armazenar exercícios, mas documentar de forma prática a construção das competências necessárias para atuar com maior autonomia em **Software Testing e Test Automation**.

---

## Objetivo

Esta trilha de estudos busca fortalecer principalmente:

- lógica de programação aplicada a QA;
- JavaScript e, posteriormente, TypeScript;
- manipulação e validação de dados;
- tratamento de erros;
- organização e modularização de código;
- automação de testes;
- Playwright;
- API Testing;
- integração com banco de dados;
- Git;
- Docker;
- CI/CD;
- boas práticas de engenharia aplicadas à automação.

A evolução do repositório será gradual, começando pelos fundamentos e aumentando progressivamente a complexidade dos exercícios e projetos.

---

## Metodologia de estudo

Os estudos são conduzidos com apoio do **ChatGPT como ferramenta de mentoria e suporte técnico**.

A IA não é utilizada para simplesmente gerar as soluções dos exercícios.

O processo adotado é, prioritariamente:

1. estudo do conceito;
2. proposição de um exercício;
3. tentativa de implementação independente;
4. execução e análise do resultado;
5. revisão do código;
6. identificação de problemas ou possibilidades de melhoria;
7. refatoração;
8. consolidação do aprendizado.

Quando encontro dificuldades, procuro primeiro trabalhar com **dicas e explicações conceituais**, evitando receber diretamente a implementação completa.

A intenção é utilizar IA como uma ferramenta para acelerar feedback, revisão e aprendizado, sem substituir o desenvolvimento do raciocínio e da autonomia técnica.

---

## Estrutura dos estudos

Os exercícios evoluem de conceitos isolados para pequenos fluxos que simulam situações encontradas em projetos de QA.

Entre os assuntos praticados até o momento estão:

- variáveis e tipos;
- condicionais;
- loops;
- funções;
- arrays e objetos;
- `filter()`;
- `map()`;
- `find()`;
- `some()`;
- `every()`;
- `reduce()`;
- destructuring;
- spread operator;
- tratamento de erros com `try/catch`;
- `throw`;
- módulos ES;
- `import` e `export`;
- leitura e escrita de arquivos;
- JSON;
- validação de dados;
- separação de responsabilidades;
- organização de utilitários;
- geração de métricas de execução de testes.

Novos conteúdos serão adicionados conforme a evolução da trilha.

---

## Organização do código

Parte dos exercícios utiliza uma estrutura semelhante a:

```text
projeto/
├── data/
│   ├── usuarios.json
│   ├── resultados.json
│   ├── testesAprovados.json
│   └── resumoTestes.json
│
├── utils/
│   ├── fileUtils.js
│   ├── resultadoUtils.js
│   ├── usuarioUtils.js
│   ├── statusUtils.js
│   └── calcularMedia.js
│
├── dia-05.js
└── package.json
```

A estrutura continuará evoluindo conforme novos conceitos forem incorporados.

---

## Sobre os primeiros dias

A decisão de publicar este repositório no GitHub aconteceu **no quinto dia da trilha de estudos**.

Por esse motivo, os primeiros exercícios foram desenvolvidos principalmente no mesmo arquivo de treino e **não existe um arquivo de código individual para cada um dos primeiros dias**.

A partir da decisão de versionar publicamente a evolução, a organização do repositório passa a acompanhar de forma mais clara o progresso dos estudos.

O histórico conceitual dos dias anteriores continua registrado nas anotações da trilha.

---

## Anotações e resumos

Além do código disponível neste repositório, mantenho uma página no Notion com os resumos dos conteúdos estudados, conceitos importantes, observações e aprendizados de cada sessão.

### Notion

1. [QA Engineering — Estudos, Automação e Evolução Técnica - JavaScript](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-058eda02b158836bbd8381df9a5cdd79?source=copy_link)
2. [QA Engineering — Estudos, Automação e Evolução Técnica - TypeScript](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-TypeScript-3f9eda02b158807a8b3cda0a8afca8eb?source=copy_link)
3. [QA Engineering — Estudos, Automação e Evolução Técnica - Test Design](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-Test-Design-3fbeda02b1588031969fcdb7c3a19eb6?source=copy_link)
4. [QA Engineering — Estudos, Automação e Evolução Técnica - Análise de requisitos e criação de cenários de teste](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-An-lise-de-requisitos-e-cria-o-de-cen-rios-3fceda02b15880b8ac16f30d34499b75?source=copy_link)
5. [QA Engineering — Estudos, Automação e Evolução Técnica - Bug Reporting e documentação de defeitos](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-Bug-Reporting-e-documenta-o-de-defeitos-3feeda02b1588015affacb01d4848601?source=copy_link)
6. [QA Engineering — Estudos, Automação e Evolução Técnica - Jira e ciclo de vida de defeitos](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-Jira-e-ciclo-de-vida-de-defeitos-3ffeda02b158809cad69f348344af71c?source=copy_link)
7. [QA Engineering — Estudos, Automação e Evolução Técnica - Introdução ao Playwright e primeiros testes E2E](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-Introdu-o-ao-Playwright-e-primeiros-testes-400eda02b15880ac9500c6e1bc115ee8?source=copy_link)
8. [QA Engineering — Estudos, Automação e Evolução Técnica - Inputs, ações e assertions com Playwright](https://app.notion.com/p/QA-Engineering-Estudos-Automa-o-e-Evolu-o-T-cnica-Inputs-a-es-e-assertions-com-Playwright-402eda02b158806ea5e0df9ac66c6e43?source=copy_link)

---

## Direção da trilha

A evolução planejada segue aproximadamente o caminho:

```text
Fundamentos de programação
        ↓
JavaScript aplicado a QA
        ↓
TypeScript
        ↓
Test Design
        ↓
Playwright
        ↓
Automation Engineering
        ↓
API Testing
        ↓
SQL aplicado a QA
        ↓
Git
        ↓
Docker
        ↓
CI/CD
        ↓
Automação integrada a projetos reais
```

O objetivo final é desenvolver autonomia para analisar uma aplicação, definir uma estratégia de testes e construir uma solução de automação organizada, reutilizável e integrada ao fluxo de desenvolvimento.

---

## Status

🚧 **Em desenvolvimento**

Este repositório representa uma trilha contínua de aprendizado e será atualizado conforme novos conteúdos forem estudados e praticados.
