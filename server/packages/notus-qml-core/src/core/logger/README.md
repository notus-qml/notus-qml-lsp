# Sistema de Logging do LSP

Este sistema de logging foi projetado especificamente para servidores LSP, evitando interferência com a comunicação LSP.

## Características

- ✅ **Não interfere com LSP**: Logs vão para `stderr`, não `stdout`
- ✅ **Níveis configuráveis**: DEBUG, INFO, WARN, ERROR, NONE
- ✅ **Logs estruturados**: Formato consistente com timestamp e categoria
- ✅ **Configuração via ambiente**: Variáveis de ambiente para controle
- ✅ **Singleton**: Uma instância global para toda a aplicação

## Uso Básico

```typescript
import { Logger } from "./core/logger/Logger";

const logger = Logger.getInstance();

logger.debug('Category', 'Debug message', { data: 'extra info' });
logger.info('Category', 'Info message');
logger.warn('Category', 'Warning message');
logger.error('Category', 'Error message', error);
```

## Configuração via Variáveis de Ambiente

### Nível de Log
```bash
# Desenvolvimento - todos os logs
LSP_LOG_LEVEL=DEBUG

# Produção - apenas erros
LSP_LOG_LEVEL=ERROR

# Desabilitar logs
LSP_LOG_LEVEL=NONE
```

### Habilitar/Desabilitar
```bash
# Habilitar logging
LSP_ENABLE_LOGGING=true

# Desabilitar logging
LSP_ENABLE_LOGGING=false
```

### Arquivo de Log
```bash
# Salvar logs em arquivo
LSP_LOG_FILE=/path/to/logs/lsp.log
```

## Exemplo de Saída

```
[2024-01-15T10:30:45.123Z] INFO [Server] Starting LSP server...
[2024-01-15T10:30:45.124Z] DEBUG [MethodDispatcher] Received message | Data: {"method":"initialize","id":0}
[2024-01-15T10:30:45.125Z] INFO [MethodEngine] Handler found for method | Data: {"method":"initialize","handlerType":"InitializeHandler"}
[2024-01-15T10:30:45.126Z] ERROR [MethodDispatcher] Failed to process request | Data: {"message":"Handler not found","stack":"..."}
```

## Vantagens sobre console.log

| Aspecto | console.log | Logger Próprio |
|---------|-------------|----------------|
| **Controle de saída** | ❌ Vai para stdout | ✅ Vai para stderr |
| **Níveis de log** | ❌ Não tem | ✅ Configurável |
| **Formatação** | ❌ Inconsistente | ✅ Padronizada |
| **Filtros** | ❌ Sempre aparece | ✅ Por nível |
| **Produção** | ❌ Difícil de desabilitar | ✅ Fácil controle |
| **Estrutura** | ❌ Texto simples | ✅ JSON estruturado |

## Integração com VS Code

Para ver os logs no VS Code durante o desenvolvimento:

1. Configure o nível de log no `launch.json`:
```json
{
    "env": {
        "LSP_LOG_LEVEL": "DEBUG",
        "LSP_ENABLE_LOGGING": "true"
    }
}
```

2. Os logs aparecerão no console de debug do VS Code 