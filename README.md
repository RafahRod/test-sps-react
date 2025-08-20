# Test SPS React

Sistema de gerenciamento de usuários com histórico de operações.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm

## Instalação e Execução

### Frontend (React)

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto:
```bash
npm start
```

O frontend estará disponível em `http://localhost:3000`

### Backend (Node.js/Express)

1. Navegue para a pasta do servidor:
```bash
cd ../test-sps-server
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor:
```bash
npm start
```

O backend estará disponível em `http://localhost:3001`

## Funcionalidades

- Autenticação de usuários
- CRUD de usuários (criar, editar, excluir)
- Histórico de operações (apenas para administradores)
- Interface responsiva com Material-UI

## Usuário Padrão

- **Email**: admin@test.com
- **Senha**: admin123
- **Tipo**: admin
