# Documentação Completa do Projeto RemoteOps SaaS

## Estrutura Geral do Projeto
```
rustdesk-saas/
├── api/                    # Backend Node.js (Express + PostgreSQL)
├── frontend/               # Frontend React (Vite)
├── data/                   # Dados do servidor RustDesk (chaves, configs)
├── pgdata/                 # Dados persistentes do PostgreSQL (volume)
├── docker-compose.yml       # Arquivo de orquestração Docker
├── README.md                # Documentação original do projeto
└── DOCUMENTACAO.md          # Este arquivo!
```

---

## 1. Pasta `api/` - Backend
Esta é a pasta do servidor backend, desenvolvida em **Node.js** com o framework **Express**, e se conecta a um banco de dados **PostgreSQL 15**.

### Estrutura da Pasta `api/`
```
api/
├── src/
│   ├── controllers/         # Lógica de negócio das rotas
│   │   ├── auth.js          # Controlador de autenticação (login)
│   │   ├── groups.js        # Controlador de grupos/departamentos
│   │   ├── rustdesk.js      # Controlador principal (dispositivos, relatórios, etc.)
│   │   ├── serviceCategories.js  # Controlador de tipos de serviço
│   │   └── users.js         # Controlador de usuários do painel
│   ├── middleware/
│   │   └── auth.js          # Middleware de autenticação (verifica token JWT)
│   ├── routes/              # Definição das rotas HTTP
│   │   ├── auth.js
│   │   ├── groups.js
│   │   ├── rustdesk.js
│   │   ├── serviceCategories.js
│   │   └── users.js
│   ├── db.js                # Conexão com o banco de dados PostgreSQL
│   └── index.js             # Arquivo principal do servidor (inicialização)
├── Dockerfile               # Dockerfile para buildar a imagem do backend
└── package.json             # Dependências do Node.js
```

### Arquivos Principais do Backend e Conexões

#### `api/src/index.js`
Este é o arquivo que inicializa o servidor Express. Ele:
1. Carrega as variáveis de ambiente
2. Configura o CORS (para permitir requisições do frontend na porta 8080)
3. Define as rotas da API (importa os arquivos de rotas da pasta `routes/`)
4. Inicializa o banco de dados (cria as tabelas se não existirem, usando `TIMESTAMPTZ` para todas as colunas de data/hora)
5. Inicia o servidor na porta 3000

**Conexões**:
- Importa `db.js` para conectar ao PostgreSQL
- Importa os arquivos de rotas da pasta `routes/`
- As rotas usam os controladores da pasta `controllers/`

#### `api/src/db.js`
Arquivo responsável por criar a conexão com o banco de dados PostgreSQL usando a biblioteca `pg`.
- Usa a variável de ambiente `DATABASE_URL` para se conectar
- Exporta um objeto `query` para executar consultas SQL

**Conexões**:
- Usado por **todos os controladores** da pasta `controllers/` para acessar o banco de dados

#### `api/src/middleware/auth.js`
Contém 2 middlewares:
- `authenticate`: Verifica se o token JWT é válido (usando a variável `JWT_SECRET`) e atribui o usuário à requisição
- `adminOnly`: Verifica se o usuário tem role `admin`

**Conexões**:
- Usado nas rotas da pasta `routes/` para proteger endpoints que exigem autenticação ou permissão de administrador

#### `api/src/controllers/rustdesk.js`
O controlador mais completo, com funções para:
- `getServerInfo`: Retorna as configurações do servidor RustDesk (ID Server, Relay Server, Key)
- `updateServerInfo`: Atualiza as configurações do servidor
- `heartbeat`: Recebe o heartbeat dos clientes RustDesk e atualiza o status dos dispositivos na tabela `devices`
- `getDevices`: Lista todos os dispositivos conectados (da tabela `devices`)
- `saveAlias`: Salva ou atualiza o apelido e grupo de um dispositivo na tabela `address_book`
- `logConnection`: Registra logs de conexão dos dispositivos na tabela `connection_logs`
- `getReports`: Lista os relatórios de conexão (ordena por `cl.id DESC` para evitar problemas de timezone)
- `updateLogCategory`: Atualiza a categoria de um log na tabela `connection_logs`
- `exportXLS`: Exporta relatórios para arquivo Excel (XLSX)
- `sysinfo`: Endpoint para o cliente RustDesk enviar informações do sistema
- `getAb`: Retorna o livro de endereços para o cliente RustDesk
- `ingestHbbrLogs`: Recebe logs do HBBR

**Conexões**:
- Usa `db.js` para acessar o banco de dados
- É usado pelo arquivo de rotas `routes/rustdesk.js`

---

## 2. Pasta `frontend/` - Frontend
Esta é a pasta da interface web, desenvolvida em **React** com o bundler **Vite**.

### Estrutura da Pasta `frontend/`
```
frontend/
├── src/
│   ├── services/
│   │   └── api.js           # Configuração do Axios (cliente HTTP)
│   ├── App.jsx              # Componente principal da interface
│   └── main.jsx             # Arquivo de entrada do React
├── index.html               # HTML base
├── Dockerfile               # Dockerfile para buildar a imagem do frontend (usa Nginx)
├── nginx.conf               # Configuração do Nginx (desativa cache para evitar problemas)
├── vite.config.js           # Configuração do Vite
└── package.json             # Dependências do React
```

### Arquivos Principais do Frontend e Conexões

#### `frontend/src/services/api.js`
Configura o Axios para fazer requisições à API:
- Define a URL base da API (ex: `http://localhost:3000` ou IP da VPS)
- Adiciona um interceptor que inclui automaticamente o token JWT no header `Authorization` de todas as requisições

**Conexões**:
- Usado pelo componente `App.jsx` para fazer requisições à API na pasta `api/`

#### `frontend/src/App.jsx`
Componente principal da aplicação, com:
- Sistema de login/logout (armazena token e usuário no `localStorage`)
- Abas: Dispositivos, Grupos, Relatórios, Tipos de Serviço, Usuários
- Funções para gerenciar cada entidade (criar, editar, excluir)
- Formatação de datas usando o timezone `America/Cuiaba`

**Conexões**:
- Importa `api.js` para fazer requisições à API
- Usa o `localStorage` para armazenar o token JWT e as informações do usuário

---

## 3. Pasta `data/` - Dados do RustDesk Server
Contém os dados do servidor RustDesk (HBBS/HBBR):
- Arquivos de chave pública e privada (`id_ed25519`, `id_ed25519.pub`)
- Outros arquivos de configuração do RustDesk

**Aviso**: Esta pasta é montada como volume no container da API em modo somente leitura (`ro`).

---

## 4. Pasta `pgdata/` - Dados Persistentes do PostgreSQL
Esta é a pasta do volume do Docker para persistir os dados do PostgreSQL 15.
- Não edite manualmente os arquivos desta pasta!

---

## 5. Arquivo `docker-compose.yml` - Orquestração Docker
Arquivo de orquestração Docker que define e gerencia todos os containers do projeto.

### Serviços Definidos
1. **`postgres`**: Banco de dados PostgreSQL 15
   - Usuário: `rustdesk`
   - Senha: `rustdesk123`
   - Banco: `rustdesk`
   - Volume: `./pgdata:/var/lib/postgresql/data`

2. **`api`**: Backend Node.js
   - Builda a partir da pasta `./api`
   - Porta: 3000
   - Variáveis de ambiente importantes:
     - `DATABASE_URL`: URL de conexão com o PostgreSQL
     - `JWT_SECRET`: Chave secreta para assinar tokens JWT
     - `ID_SERVER`, `RELAY_SERVER`: IP do servidor RustDesk
     - `RUSTDESK_KEY`: Chave pública do RustDesk (deve corresponder ao arquivo `id_ed25519.pub` na pasta `data/`)
     - `ADMIN_EMAIL`, `ADMIN_PASSWORD`: Credenciais do usuário administrador

3. **`frontend`**: Frontend React
   - Builda a partir da pasta `./frontend`
   - Porta: 8080 (servido por Nginx)
   - Usa o arquivo `nginx.conf` para desativar cache

4. **`hbbs` e `hbbr`**: Servidores RustDesk
   - Imagem oficial: `rustdesk/rustdesk-server:latest`
   - Usam `network_mode: host` na VPS para acessar diretamente as portas do host (21115-21119)

---

## 6. Banco de Dados - Configuração Correta (Importante!)
O banco de dados **PostgreSQL 15** utiliza **`TIMESTAMPTZ` (timestamp with time zone)** para TODAS as colunas de data/hora. Isso é **essencial** para evitar bugs de timezone!

---

## 6.1. Arquivos de Configuração (IMPORTANTE!)
Os arquivos de configuração sensíveis **NÃO ESTÃO NO REPOSITÓRIO GITHUB** (para proteger dados como IP do servidor, chave do RustDesk e senhas). Em vez disso, temos **arquivos de exemplo** que você deve copiar e preencher com seus dados!

### Arquivos de Exemplo
1. **`.env.example`**: Exemplo de arquivo de variáveis de ambiente
2. **`docker-compose.yml.example`**: Exemplo de arquivo de orquestração Docker

### Como Configurar (Primeira Vez)
1. Clone o repositório:
   ```bash
   git clone https://github.com/davi-ricardo/rustdesk-saas.git
   cd rustdesk-saas
   ```
2. Copie os arquivos de exemplo para os arquivos reais:
   ```bash
   cp .env.example .env
   cp docker-compose.yml.example docker-compose.yml
   ```
3. Abra os arquivos `.env` e `docker-compose.yml` e preencha com seus dados:
   - **IP_SERVER**: IP/domínio do seu servidor
   - **RELAY_SERVER**: IP/domínio do seu servidor (igual ao IP_SERVER)
   - **RUSTDESK_KEY**: Chave pública do RustDesk (conteúdo do arquivo `data/id_ed25519.pub`)
   - Outras variáveis: senhas, credenciais do usuário administrador, etc.
4. Prossiga com a instalação!

---

### Por que `TIMESTAMPTZ` e não `TIMESTAMP`?
- **`TIMESTAMP`**: Não armazena informação de timezone. Quando o Node.js lê um `TIMESTAMP`, ele interpreta como sendo do timezone do servidor Node.js, o que causava bugs de desalinhamento de horário (4 horas de adiantamento/atraso).
- **`TIMESTAMPTZ`**: Armazena a data/hora em UTC (horário universal) e converte para o timezone do cliente quando consultado. Isso garante que o horário seja exibido corretamente em qualquer lugar do mundo!

### Tabelas do Banco de Dados
O banco de dados PostgreSQL possui 8 tabelas, **todas com colunas de data/hora como `TIMESTAMPTZ`**:

1. **`users`**: Usuários do painel administrativo
   - `created_at`: TIMESTAMPTZ

2. **`app_settings`**: Configurações do aplicativo
   - `updated_at`: TIMESTAMPTZ

3. **`hbbr_sessions`**: Sessões do HBBR
   - `started_at`: TIMESTAMPTZ
   - `paired_at`: TIMESTAMPTZ
   - `ended_at`: TIMESTAMPTZ
   - `a_closed_at`: TIMESTAMPTZ
   - `b_closed_at`: TIMESTAMPTZ

4. **`devices`**: Dispositivos conectados ao RustDesk
   - `last_seen`: TIMESTAMPTZ

5. **`address_book`**: Livro de endereços (apelidos e grupos dos dispositivos)
   - `created_at`: TIMESTAMPTZ

6. **`groups`**: Grupos/departamentos
   - `created_at`: TIMESTAMPTZ

7. **`service_categories`**: Tipos de serviço para classificar relatórios
   - `created_at`: TIMESTAMPTZ

8. **`connection_logs`**: Logs de conexão entre dispositivos (essa é a tabela mais importante!)
   - `timestamp`: TIMESTAMPTZ

### Como Garantir que o Banco Está Correto?
Para verificar a estrutura das tabelas (e confirmar que as colunas são `TIMESTAMPTZ`), execute esses comandos no PostgreSQL:
1. Acesse o container do PostgreSQL:
   ```bash
   cd /opt/rustdesk-saas
   docker-compose exec postgres psql -U rustdesk -d rustdesk
   ```
2. Verifique a estrutura da tabela `connection_logs`:
   ```sql
   \d connection_logs
   ```
3. Verifique os últimos logs (ordene por `id DESC` para evitar problemas de timezone):
   ```sql
   SELECT id, from_device_id, to_device_id, action, timestamp 
   FROM connection_logs 
   ORDER BY id DESC 
   LIMIT 10;
   ```
4. Saia do psql:
   ```sql
   \q
   ```

---

## 7. Como Configurar a Chave do RustDesk
A chave do RustDesk é essencial para que os clientes RustDesk se conectem ao seu servidor! Segue o passo a passo:

### Pré-requisitos
- Você deve ter os arquivos de chave do RustDesk na pasta `data/`:
  - `id_ed25519`: Chave privada
  - `id_ed25519.pub`: Chave pública
- Se você não tem esses arquivos, o RustDesk Server os gerará automaticamente na primeira vez que você rodar os containers!

### Passo 1: Obter a Chave Pública
A chave pública é o conteúdo do arquivo `data/id_ed25519.pub`.
- Para visualizá-la, execute:
  ```bash
  cat /opt/rustdesk-saas/data/id_ed25519.pub
  ```

### Passo 2: Configurar a Chave no `docker-compose.yml`
Abra o arquivo `docker-compose.yml` e localize a variável `RUSTDESK_KEY` no serviço `api`. Cole o conteúdo da chave pública (do arquivo `id_ed25519.pub`) como valor dessa variável!

Exemplo de configuração:
```yaml
services:
  api:
    # ... outras configurações
    environment:
      # ... outras variáveis de ambiente
      RUSTDESK_KEY: "sua-chave-publica-aqui"
```

### Passo 3: Configurar o RustDesk Client (nos dispositivos)
Para que os clientes RustDesk se conectem ao seu servidor, você precisa configurar:
1. **ID Server**: O IP/domínio do seu servidor (ex: `76.13.174.204`)
2. **Relay Server**: O IP/domínio do seu servidor (ex: `76.13.174.204`)
3. **Key**: A chave pública (mesmo valor que você colocou na variável `RUSTDESK_KEY` no `docker-compose.yml`)

Para configurar o RustDesk Client:
1. Abra o RustDesk Client
2. Clique em **Configurações** → **Rede**
3. Preencha os campos:
   - **ID Server**: Seu IP/domínio
   - **Relay Server**: Seu IP/domínio
   - **Key**: Sua chave pública
4. Clique em **Aplicar**

---

## 8. Fluxo de Autenticação
1. O usuário faz login no painel com e-mail/username e senha
2. A API verifica as credenciais e retorna um token JWT
3. O frontend armazena o token e as informações do usuário no `localStorage`
4. Em todas as requisições subsequentes, o frontend envia o token no header `Authorization`
5. O middleware `authenticate` verifica o token e permite (ou não) o acesso à rota

---

## 9. Como Rodar o Projeto
### Local (Desenvolvimento)
```bash
# Clone o repositório
git clone https://github.com/davi-ricardo/rustdesk-saas.git
cd rustdesk-saas

# Suba os containers
docker-compose up -d --build

# Acesse o painel
# Frontend: http://localhost:8080
# API: http://localhost:3000
```

### Produção (VPS)
1. Acesse a VPS via SSH
2. Navegue até o diretório do projeto (ex: `/opt/rustdesk-saas`)
3. Atualize o código:
   ```bash
   git pull origin main
   ```
4. Redeploy os containers:
   ```bash
   docker-compose up -d --build
   ```
5. Certifique-se de que as portas estão abertas no firewall:
   - 8080 (TCP): Frontend
   - 3000 (TCP): API
   - 21115-21119 (TCP/UDP): RustDesk nativo

---

## 10. Credenciais Padrão
- **E-mail/Username**: `administrador`
- **Senha**: `tipref#2026` (ou a que você configurou no `docker-compose.yml` na variável `ADMIN_PASSWORD`)

---

## 11. Tecnologias Utilizadas
| Camada | Tecnologias |
|--------|--------------|
| Frontend | React, Axios, Vite, Nginx |
| Backend | Node.js, Express, JWT, pg (PostgreSQL) |
| Banco de Dados | PostgreSQL 15 |
| Infraestrutura | Docker, Docker Compose |
| Servidor RustDesk | HBBS/HBBR (imagem oficial) |

---

## 12. Problemas Comuns e Soluções
### Problema 1: Horário no painel está com 4 horas de adiantamento/atraso
**Causa**: A coluna `timestamp` na tabela `connection_logs` é `TIMESTAMP` (sem timezone) em vez de `TIMESTAMPTZ` (com timezone).

**Solução**:
1. Acesse o container do PostgreSQL:
   ```bash
   cd /opt/rustdesk-saas
   docker-compose exec postgres psql -U rustdesk -d rustdesk
   ```
2. Altere a coluna para `TIMESTAMPTZ`:
   ```sql
   ALTER TABLE connection_logs ALTER COLUMN timestamp TYPE TIMESTAMPTZ;
   ```
3. Verifique se as outras tabelas também estão com colunas de data como `TIMESTAMPTZ`:
   ```sql
   \d users
   \d devices
   -- ... etc., para todas as tabelas
   ```
4. Saia do psql:
   ```sql
   \q
   ```

### Problema 2: Logs novos não aparecem no painel
**Causa**: A query na função `getReports` usa `ORDER BY cl.timestamp DESC`, e os timestamps dos logs novos são menores que os dos logs antigos (problema de timezone).

**Solução**: Altere o ORDER BY para `cl.id DESC` na função `getReports` no arquivo `api/src/controllers/rustdesk.js` (isso já foi feito no projeto!).

### Problema 3: Origem/destino invertidos no relatório
**Causa**: O RustDesk Client está invertendo os valores do array `peer` nas requisições de conexão.

**Solução**: Inverta os valores de `final_from` e `final_to` no arquivo `api/src/controllers/rustdesk.js` na seção onde há o array `peer` (isso já foi feito no projeto!).

---

Desenvolvido por Davi Ricardo
