## 📄 README: Backloggist - Frontend

Este é o repositório do frontend do **Backloggist**, uma aplicação dedicada a ajudar usuários a **Organizar, Priorizar e Executar** sua lista de itens de consumo pessoal (jogos, filmes, livros, cursos, etc.).


<img style="margin: auto;" width="512" height="512" alt="logo512" src="https://github.com/user-attachments/assets/b5709036-1a8d-441d-8644-8fcf89e7d246" />


O foco deste MVP é fornecer uma interface limpa e eficiente para gerenciar o backlog individual.


## 🚀 Stack de Tecnologia

O frontend foi construído utilizando o seguinte conjunto de tecnologias:

| Categoria | Tecnologia |
| :--- | :--- |
| **Núcleo & Tipagem** | **React & TypeScript (TS)** |
| **Gerenciamento de Dados** | **TanStack Query** |
| **Roteamento & Navegação** | **TanStack Router** |
| **Estilização & UI** | **Tailwind CSS** |
| **Animações & UX** | **Framer Motion** |
| **Formulários** | **React Hook Form & Zod** |
| **UI Global & Ferramentas** | **Zustand** |
| **UX & Usabilidade** | **Nuqs** |
| **Qualidade de Código** | **Biome** |

## 🌟 Funcionalidades Principais (MVP)

O frontend implementa as seguintes capacidades, refletindo os endpoints do backend:

### 1\. Autenticação e Acesso

  * **Login e Cadastro:** Fluxo completo de autenticação e criação de usuário.
  * **Rotas Protegidas:** Utiliza o **TanStack Router** e o **TanStack Query** para verificar a autenticação (*beforeLoad*) antes de carregar o conteúdo do backlog.

### 2\. Gestão do Backlog

  * **Visualização:** Exibição da lista de itens do usuário (`GET /backlog`).
  * **Adição:** Adicionar novos itens ao catálogo e vincular ao backlog.
  * **Atualização de Status:** Funcionalidade para marcar itens como `pending`, `in_progress` ou `completed`.
  * **Priorização:** Funcionalidade de **Drag-and-Drop (D\&D)** para reordenar a lista, implementando *Optimistic Updates* com TanStack Query.

### 3\. Usabilidade

  * **Filtragem Persistente:** Filtragem da lista por *status* e *tipo*, gerenciada pelo **Nuqs** na URL.
  * **Sugestões Inteligentes (MVP):** Componente para exibir recomendações de itens com base nos gêneros mais consumidos pelo usuário (Lógica baseada em regras no backend).

-----

## 🛠️ Instalação e Execução

### Pré-requisitos

  * Node.js (versão LTS recomendada)
  * NPM ou Yarn ou Pnpm
  * O Backloggist **Backend** deve estar rodando e acessível na porta configurada (padrão: `localhost:3333`).

### Passos

1.  **Clone o Repositório:**
    ```bash
    git clone [URL_DO_SEU_REPO]
    cd backloggist-frontend
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz e configure o URL base do seu backend:
    ```
    # .env
    VITE_BASE_URL=http://localhost:3333
    ```
4.  **Inicie a Aplicação:**
    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```
    O aplicativo estará acessível em `http://localhost:3000` (ou porta configurada).

-----

