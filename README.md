# onFly n8n Custom Node - Random Number Generator

Este projeto contém um custom node para n8n que gera números aleatórios verdadeiros utilizando a API do Random.org.

## 📋 Descrição

O **Random Node** é um conector personalizado (custom node) desenvolvido para o n8n que permite gerar números aleatórios verdadeiros através da integração com a API do [Random.org](https://www.random.org/). 

### Características Principais:
- ✅ Geração de números aleatórios verdadeiros (não pseudo-aleatórios)
- ✅ Configuração de valores mínimo e máximo
- ✅ Validação de parâmetros de entrada
- ✅ Tratamento de erros robusto
- ✅ Ícone SVG customizado
- ✅ Interface amigável
- ✅ Metadados incluindo timestamp e fonte

## 🏗️ Arquitetura

### Infraestrutura
- **n8n**: v1.85.4 (Docker)
- **PostgreSQL**: 15
- **Node.js**: v22 LTS
- **TypeScript**: ^4.9.5

### Estrutura do Projeto
```
onFly-n8n/
├── docker-compose.yml          # Configuração dos containers
├── init-data.sh               # Script de inicialização do PostgreSQL
├── .env                       # Variáveis de ambiente
├── custom-nodes/              # Diretório do custom node
│   ├── package.json           # Configuração do pacote npm
│   ├── tsconfig.json         # Configuração TypeScript
│   ├── gulpfile.js           # Build tasks
│   ├── .eslintrc.json        # Configuração ESLint
│   ├── nodes/                # Diretório dos nodes
│   │   └── Random/           # Node Random
│   │       ├── Random.node.ts      # Implementação principal
│   │       ├── Random.node.json    # Metadados do node
│   │       └── random.svg          # Ícone customizado
│   └── dist/                 # Arquivos compilados
```

## 🚀 Instalação e Configuração

### Pré-requisitos

**Para todos os sistemas operacionais:**
- Docker e Docker Compose
- Git

**Instalação específica por SO:**

#### 🐧 **Linux (Ubuntu/Debian)**
```bash
# Docker
sudo apt update
sudo apt install docker.io docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker

# Adicionar usuário ao grupo docker (opcional, evita usar sudo)
sudo usermod -aG docker $USER
newgrp docker

# Git (se não tiver)
sudo apt install git
```

#### 🪟 **Windows**
1. **Docker Desktop**: Baixe e instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. **Git**: Baixe e instale o [Git for Windows](https://git-scm.com/download/win)
3. **PowerShell ou Command Prompt**: Use qualquer um
4. **WSL2** (Recomendado): Habilite o WSL2 para melhor performance

### 1. Clone o Repositório

#### 🐧 **Linux**
```bash
git clone https://github.com/PedroHeinrichSP/onFly-n8n.git
cd onFly-n8n
```

#### 🪟 **Windows (PowerShell/CMD)**
```cmd
git clone https://github.com/PedroHeinrichSP/onFly-n8n.git
cd onFly-n8n
```

### 2. Configure as Variáveis de Ambiente

#### 🐧 **Linux**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env
nano .env
# ou use seu editor preferido: vim, gedit, vscode, etc.
```

#### 🪟 **Windows**
```cmd
# Copie o arquivo de exemplo
copy .env.example .env

# Edite o arquivo .env
notepad .env
# ou use VS Code: code .env
```

Ou configure diretamente as seguintes variáveis:

```bash
# PostgreSQL Configuration
POSTGRES_USER=n8n_admin
POSTGRES_PASSWORD=secure_admin_password_2025
POSTGRES_DB=n8n_database
POSTGRES_NON_ROOT_USER=n8n_user
POSTGRES_NON_ROOT_PASSWORD=secure_user_password_2025

# n8n Configuration
N8N_PORT=5678
N8N_IMAGE=docker.n8n.io/n8nio/n8n:1.85.4
N8N_ENCRYPTION_KEY=your-super-secure-encryption-key-here

# Timezone
GENERIC_TIMEZONE=America/Sao_Paulo
TZ=America/Sao_Paulo
```

### 3. Inicie a Infraestrutura

#### 🐧 **Linux** 
```bash
# Método 1: Com permissões Docker configuradas
docker compose up -d

# Método 2: Usando sudo (se necessário)
sudo docker compose up -d

# Verifica se os containers estão funcionando
docker compose ps
# ou: sudo docker compose ps
```

#### 🪟 **Windows**
```cmd
# Inicia PostgreSQL e n8n
docker compose up -d

# Verifica se os containers estão funcionando
docker compose ps
```

**Aguarde alguns minutos** para que o PostgreSQL inicialize completamente antes do n8n.

### 4. Configure o Custom Node

#### Método 1: Automático (Recomendado)

O custom node será instalado automaticamente no diretório `/home/node/.n8n/custom/` do container.

#### Método 2: Manual (se necessário)

#### 🐧 **Linux**
```bash
# Entre no diretório do custom node
cd custom-nodes

# Compile o projeto
npm run build

# Copie os arquivos para o container
docker cp package.json n8n:/home/node/.n8n/custom/
# ou: sudo docker cp package.json n8n:/home/node/.n8n/custom/

docker cp dist/. n8n:/home/node/.n8n/custom/dist/
# ou: sudo docker cp dist/. n8n:/home/node/.n8n/custom/dist/

# Instale as dependências no container
docker exec n8n sh -c "cd /home/node/.n8n/custom && npm install"
# ou: sudo docker exec n8n sh -c "cd /home/node/.n8n/custom && npm install"

# Reinicie o n8n
docker compose restart n8n
# ou: sudo docker compose restart n8n
```

#### 🪟 **Windows**
```cmd
# Entre no diretório do custom node
cd custom-nodes

# Compile o projeto
npm run build

# Copie os arquivos para o container
docker cp package.json n8n:/home/node/.n8n/custom/
docker cp dist/. n8n:/home/node/.n8n/custom/dist/

# Instale as dependências no container
docker exec n8n sh -c "cd /home/node/.n8n/custom && npm install"

# Reinicie o n8n
docker compose restart n8n
```

### 5. Acesse o n8n

Abra seu navegador e vá para: http://localhost:5678

## 🎯 Como Usar o Random Node

1. **Crie um novo workflow** no n8n
2. **Procure por "Random"** no painel de nodes
3. **Configure os parâmetros:**
   - **Min**: Valor mínimo (padrão: 1)
   - **Max**: Valor máximo (padrão: 100)
4. **Execute o workflow**

### Exemplo de Saída:

```json
{
  "randomNumber": 42,
  "min": 1,
  "max": 100,
  "timestamp": "2024-09-24T16:15:30.123Z",
  "source": "random.org",
  "operation": "trueRandomNumber"
}
```

## 🔧 Desenvolvimento

### Estrutura do Custom Node

O node segue as melhores práticas da documentação oficial do n8n:

#### Random.node.ts
```typescript
export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    group: ['utility'],
    version: 1,
    description: 'Generate true random numbers using Random.org',
    // ... configurações
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Implementação da lógica
  }
}
```

#### Principais Características Técnicas:

- **Validação de entrada**: Verifica se Min ≤ Max
- **Tratamento de erros**: Usa `ApplicationError` e `NodeOperationError`
- **HTTP Request**: Utiliza `this.helpers.httpRequest`
- **Type Safety**: Completamente tipado com TypeScript
- **ESLint Compliant**: Sem erros de linting

### Scripts Disponíveis

```bash
# Compilar o projeto
npm run build

# Modo desenvolvimento (watch)
npm run dev

# Verificar linting
npm run lint

# Corrigir problemas de linting
npm run lintfix

# Formatar código
npm run format
```

### Testes

Para testar manualmente:

```bash
# Teste direto da API Random.org
curl "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
```

## 🐛 Troubleshooting

### 🚫 Erro "unauthorized: authentication required"

**Problema**: Erro de autenticação ao baixar imagens do Docker Registry

Este erro geralmente aparece ao tentar baixar imagens Docker (postgres, n8n) e pode ter várias causas:

#### ✅ **Solução 1: Fazer login no Docker Hub (Recomendada)**
```bash
# Fazer login no Docker Hub
docker login

# Ou especificar o registry
docker login docker.io

# Digite seu username e password do Docker Hub
```

#### 🔄 **Solução 2: Limpar cache e tentar novamente**
```bash
# Limpar todas as imagens e containers
docker system prune -a

# Ou apenas limpar o cache
docker builder prune

# Tentar novamente
docker compose up -d
```

#### 🌐 **Solução 3: Verificar conectividade**
```bash
# Testar conectividade com Docker Hub
ping docker.io

# Testar download manual da imagem
docker pull postgres:15
docker pull n8nio/n8n:1.85.4
```

#### ⚡ **Solução 4: Usar sudo (se problema de permissão local)**
Se o erro persiste, pode ser permissão local:
```bash
# Adicionar seu usuário ao grupo docker
sudo usermod -aG docker $USER

# Aplicar as mudanças (escolha uma opção):
# Opção A: Reiniciar a sessão (logout/login)
# Opção B: Executar o comando abaixo
newgrp docker

# Ou usar sudo temporariamente
sudo docker compose up -d
```

#### 🔍 **Solução 5: Verificar se Docker está rodando**
```bash
# Verificar status do Docker
sudo systemctl status docker

# Se não estiver rodando, iniciar:
sudo systemctl start docker

# Habilitar auto-start no boot:
sudo systemctl enable docker
```

### 🔧 Container não inicia

#### 🐧 **Linux**
```bash
# Verifique os logs
docker compose logs n8n
docker compose logs postgres
# ou com sudo: sudo docker compose logs n8n

# Verifique se as portas estão livres
sudo netstat -tlnp | grep 5678
sudo netstat -tlnp | grep 5432

# Verifique se o Docker está funcionando
docker --version
sudo systemctl status docker
```

#### 🪟 **Windows**
```cmd
# Verifique os logs
docker compose logs n8n
docker compose logs postgres

# Verifique se o Docker Desktop está rodando
docker --version

# Verificar portas (PowerShell)
netstat -ano | findstr 5678
netstat -ano | findstr 5432
```

### 🎯 Custom node não aparece

#### 🐧 **Linux**
```bash
# Verifique se os arquivos estão no local correto
docker exec n8n ls -la /home/node/.n8n/custom/
# ou: sudo docker exec n8n ls -la /home/node/.n8n/custom/

# Verifique os logs do n8n
docker logs n8n
# ou: sudo docker logs n8n

# Reinicie o container
docker compose restart n8n
# ou: sudo docker compose restart n8n

# Limpe e reconstrua (se necessário)
docker compose down
docker compose up -d
```

#### 🪟 **Windows**
```cmd
# Verifique se os arquivos estão no local correto
docker exec n8n ls -la /home/node/.n8n/custom/

# Verifique os logs do n8n
docker logs n8n

# Reinicie o container
docker compose restart n8n

# Limpe e reconstrua (se necessário)
docker compose down
docker compose up -d
```

### 🔒 Erros de permissão de arquivos (Linux)

```bash
# Ajuste permissões se necessário
sudo chown -R $USER:$USER custom-nodes/

# Ou ajuste permissões específicas
chmod +x init-data.sh
```

### Erros de permissão

```bash
# Ajuste permissões se necessário
sudo chown -R $USER:$USER custom-nodes/
```

## 📚 Documentação Técnica

### API Random.org

O node utiliza a API pública do Random.org:

- **Endpoint**: `https://www.random.org/integers/`
- **Parâmetros**:
  - `num=1`: Quantidade de números
  - `min`: Valor mínimo
  - `max`: Valor máximo
  - `col=1`: Uma coluna
  - `base=10`: Base decimal
  - `format=plain`: Formato texto simples
  - `rnd=new`: Novo conjunto aleatório

### Configurações do n8n

- **N8N_CUSTOM_EXTENSIONS**: Diretório dos custom nodes
- **DB_TYPE**: postgresdb
- **N8N_ENCRYPTION_KEY**: Chave de criptografia obrigatória

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.