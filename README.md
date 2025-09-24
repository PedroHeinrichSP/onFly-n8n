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

- Docker e Docker Compose
- Git

### 1. Clone o Repositório

```bash
git clone https://github.com/PedroHeinrichSP/onFly-n8n.git
cd onFly-n8n
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` baseado no exemplo:

```bash
# PostgreSQL Configuration
POSTGRES_USER=n8n_admin
POSTGRES_PASSWORD=secure_admin_password_2024
POSTGRES_DB=n8n_database
POSTGRES_NON_ROOT_USER=n8n_user
POSTGRES_NON_ROOT_PASSWORD=secure_user_password_2024

# n8n Configuration
N8N_PORT=5678
N8N_IMAGE=docker.n8n.io/n8nio/n8n:1.85.4
N8N_ENCRYPTION_KEY=your-super-secure-encryption-key-here

# Timezone
GENERIC_TIMEZONE=America/Sao_Paulo
TZ=America/Sao_Paulo
```

### 3. Inicie a Infraestrutura

```bash
# Inicia PostgreSQL e n8n
sudo docker compose up -d

# Verifica se os containers estão funcionando
sudo docker compose ps
```

### 4. Configure o Custom Node

#### Método 1: Automático (Recomendado)

O custom node será instalado automaticamente no diretório `/home/node/.n8n/custom/` do container.

#### Método 2: Manual

```bash
# Entre no diretório do custom node
cd custom-nodes

# Compile o projeto
npm run build

# Copie os arquivos para o container
sudo docker cp package.json n8n:/home/node/.n8n/custom/
sudo docker cp dist/. n8n:/home/node/.n8n/custom/dist/

# Instale as dependências no container
sudo docker exec n8n sh -c "cd /home/node/.n8n/custom && npm install"

# Reinicie o n8n
sudo docker compose restart n8n
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

### Container não inicia

```bash
# Verifique os logs
sudo docker compose logs n8n
sudo docker compose logs postgres

# Verifique se as portas estão livres
sudo netstat -tlnp | grep 5678
```

### Custom node não aparece

```bash
# Verifique se os arquivos estão no local correto
sudo docker exec n8n ls -la /home/node/.n8n/custom/

# Verifique os logs do n8n
sudo docker logs n8n

# Reinicie o container
sudo docker compose restart n8n
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

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Email: dev@onfly.com

---

**Desenvolvido por**: onFly Team  
**Versão**: 0.1.0  
**Data**: Setembro 2024