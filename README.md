# Site Seguro de Crédito Empresarial

Este é o repositório do projeto **Site Seguro de Crédito Empresarial** (`credit-shield-buddy`), uma aplicação desenvolvida com o objetivo de oferecer uma solução digital para a proteção do fluxo de caixa de empresas.

O projeto visa a **Blindagem do fluxo de caixa** para companhias que realizam vendas a prazo, focando na cobertura contra inadimplência. O site destaca a parceria oficial com a **Coface**, líder mundial em seguro de crédito, prometendo até 90% de cobertura.

---

## Tecnologias Utilizadas

O projeto é construído com um stack de desenvolvimento moderno e eficiente:

* **Vite**: Ferramenta de build rápida e moderna.
* **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript.
* **React**: Biblioteca para construção da interface de usuário.
* **shadcn-ui**: Conjunto de componentes de UI acessíveis e reutilizáveis.
* **Tailwind CSS**: Framework de CSS utility-first para estilização rápida.

---

## Configuração e Desenvolvimento Local

Para configurar e executar o projeto na sua máquina local, siga as instruções abaixo.

### ⚙️ Pré-requisitos

Você precisará ter o **Node.js** (versão LTS recomendada) e o gerenciador de pacotes **npm** instalados.

### 🚀 Instruções de Setup

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/BrandspKauann/credit-shield-buddy.git](https://github.com/BrandspKauann/credit-shield-buddy.git)
    ```

2.  **Acesse o diretório do projeto:**
    ```sh
    cd credit-shield-buddy
    ```

3.  **Instale as dependências:**
    ```sh
    npm install
    # Alternativamente, se preferir usar Bun:
    # bun install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    O servidor será iniciado com *hot-reloading* e uma prévia instantânea.
    ```sh
    npm run dev
    ```
    O projeto estará acessível em `http://localhost:3000`.
    - Site principal: `http://localhost:3000`
    - Área administrativa: `http://localhost:3000/admin`

---

## Build para Produção

Para gerar uma versão otimizada e pronta para *deploy* (publicação):

```sh
npm run build
