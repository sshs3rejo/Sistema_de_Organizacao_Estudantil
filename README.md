# 📚 Sistema de Organização Estudantil

> Plataforma centralizada para organizar a rotina acadêmica — aulas, trabalhos, provas e estudos em um só lugar.

🔗 **Deploy:** [sistema-de-organizacao-estudantil.vercel.app](https://sistema-de-organizacao-estudantil.vercel.app/)

---

## ✨ Funcionalidades

- **Dashboard** com grid de atividades, filtro por categoria e busca textual
- **CRUD completo** — criar, editar, excluir e visualizar atividades
- **Controle de status** — marque atividades como *pendente* ou *concluída*
- **Calendário acadêmico** integrado ao semestre 2026.1
- **Formatador de capa ABNT** — gera `.docx` no padrão NBR 14724:2011

---

## 🛠️ Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js (App Router) | 16.2.0 | Framework principal |
| React | 19 | Biblioteca de UI |
| TypeScript | 5.7.3 | Tipagem estática |
| Tailwind CSS | 4.2 | Estilização |
| shadcn/ui + Radix UI | — | Componentes acessíveis |
| Zod + React Hook Form | 3.24 / 7.54 | Validação de formulários |
| Sonner | 1.7 | Notificações toast |
| date-fns | 4.1.0 | Manipulação de datas |
| docx + file-saver | — | Geração de `.docx` (ABNT) |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) `>= 18`
- `npm` ou `pnpm`

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/Sistema_de_Organizacao_Estudantil.git
cd Sistema_de_Organizacao_Estudantil

# 2. Instale as dependências
npm install
# ou
pnpm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: **http://localhost:3000**

---

## 📁 Estrutura de pastas

```
/
├── app/
│   ├── actions/        # Server Actions (CRUD)
│   ├── calendario/     # Página do Calendário Acadêmico
│   ├── formatador/     # Página do Formatador ABNT
│   ├── layout.tsx      # Layout raiz
│   └── page.tsx        # Dashboard principal
├── components/         # Componentes (shadcn/ui + customizados)
├── lib/                # Utilitários e dados do calendário
├── types/
│   └── event.ts        # Interfaces e tipos do modelo Event
└── styles/             # Estilos globais
```

---

## 📦 Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia o build de produção
npm run lint     # Verifica erros de lint
```

---

## 🗂️ Categorias de atividades

| Categoria | Cor |
|---|---|
| 🔵 Aula | Azul |
| 🟠 Trabalho | Laranja |
| 🔴 Prova | Vermelho |
| 🟢 Estudo | Verde |
| ⚫ Outros | Cinza |
