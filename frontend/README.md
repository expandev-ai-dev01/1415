# Ensina Dino - Frontend

Plataforma educativa interativa sobre dinossauros.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Tailwind CSS 3.4.14
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── router.tsx         # Configuração de rotas
│   └── providers.tsx      # Providers globais
├── core/                   # Componentes e lógica compartilhada
│   ├── components/        # Componentes UI genéricos
│   ├── lib/               # Configurações de bibliotecas
│   ├── types/             # Tipos globais
│   └── utils/             # Funções utilitárias
├── domain/                 # Domínios de negócio
├── pages/                  # Páginas da aplicação
└── assets/                 # Recursos estáticos
    └── styles/            # Estilos globais
```

## Comandos

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Convenções

- Componentes em PascalCase
- Hooks com prefixo `use`
- Arquivos de tipos com sufixo `.types.ts`
- Estilos com Tailwind CSS
- Imports com alias `@/` para `src/`

## Arquitetura

- **Domain-Driven**: Organização por domínios de negócio
- **Component-Based**: Componentes reutilizáveis e modulares
- **Type-Safe**: TypeScript em modo strict
- **API Integration**: Axios com clientes separados (público/autenticado)
- **State Management**: TanStack Query para server state, Zustand para client state
- **Form Handling**: React Hook Form com validação Zod