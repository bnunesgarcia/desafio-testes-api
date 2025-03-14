# desafio-testes-api
Testes automatizados CRUD em API

Aqui está um exemplo de README para o seu projeto de automação de API testes utilizando Playwright e TypeScript:

**Projeto de Automação de API Testes**

**Resumo**

Este projeto utiliza o framework Playwright para automatizar testes de API backend utilizando TypeScript. O objetivo é garantir a qualidade e a confiabilidade da API ao executar testes automatizados para as operações GET, POST, DELETE e PATCH.

**Requisitos**

* Node.js 20 ou superior
* Playwright Core
* TypeScript

**Configuração**

O arquivo de configuração utilizado é o `playwright.config.ts`. Nele, são definidas as configurações básicas para a execução dos testes, incluindo a URL da API e as credenciais de autenticação.

**Arquivo de Configuração (playwright.config.ts)**
```typescript
import { PlaywrightConfig } from '@playwright/test';

const config: PlaywrightConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  webServer: {
    command: 'npm run start',
    port: 3000,
  },
};

export default config;
```
**Arquivo YAML para Execução em Esteira de Integração Contínua**

O arquivo `buildspec.yml` é utilizado para definir as etapas de execução dos testes em uma esteira de integação contínua. Nele, são definidas as etapas de instalação, execução dos testes e geração de relatórios.

**Arquivo YAML (buildspec.yml)**
```yaml
version: 0.2

phases:
  install:
    runtime-version:
      nodejs: 20

    build:
      commands:
        - cd tests/
        - npm config set strict-ssl false
        - npm install
        - npm i playwright-core
        - npm run e2e:env

artifacts:
  files:
    - "results.xml"

  base-directory: tests/reports

  file-format: JunitXml
```
**Execução dos Testes**

Para executar os testes, basta executar o comando `npm run e2e` no diretório `tests`. Isso irá executar os testes e gerar um relatório em formato JUnit XML no diretório `tests/reports`.

**Relatórios**

Os relatórios de teste são gerados em formato JUnit XML e armazenados no diretório `tests/reports`. Esses relatórios podem ser utilizados para visualizar o resultado dos testes e identificar possíveis problemas na API.

**Conclusão**

Este projeto de automação de API testes utilizando Playwright e TypeScript é uma ferramenta poderosa para garantir a qualidade e a confiabilidade da API. Com a configuração e execução corretas, é possível automatizar testes para as operações GET, POST, DELETE e PATCH e gerar relatórios de teste em formato JUnit XML.
