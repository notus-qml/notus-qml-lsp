# ASTNodeFinder

O `ASTNodeFinder` é uma classe utilitária que fornece métodos para encontrar nós específicos no AST (Abstract Syntax Tree) de forma mais fácil e legível.

## Importação

```typescript
import { ASTNodeFinder } from "@/core/ast/finder";
```

## Uso Básico

```typescript
const finder = new ASTNodeFinder(node);

// Encontrar um binding específico
const idBinding = finder.findBindingByName("id");
if (idBinding) {
    console.log("Encontrou binding 'id':", idBinding.text);
}

// Obter o valor de um binding
const idValue = finder.getBindingValue("id");
if (idValue) {
    console.log("Valor do id:", idValue.text);
}
```

## Métodos Disponíveis

### Busca por Tipo

- `findChildByType(type: string)`: Encontra um filho direto por tipo
- `findChildrenByType(type: string)`: Encontra todos os filhos diretos por tipo
- `findDescendantByType(type: string)`: Busca recursivamente por um nó com tipo específico
- `findDescendantsByType(type: string)`: Busca recursivamente por todos os nós com tipo específico

### Busca por Texto

- `findChildByText(text: string)`: Encontra um filho direto por texto
- `findChildrenByText(text: string)`: Encontra todos os filhos diretos por texto
- `findDescendantByText(text: string)`: Busca recursivamente por um nó com texto específico
- `findDescendantsByText(text: string)`: Busca recursivamente por todos os nós com texto específico

### Busca por Nome (para nós nomeados)

- `findChildByName(name: string)`: Encontra um filho direto por nome
- `findChildrenByName(name: string)`: Encontra todos os filhos diretos por nome

### Métodos Específicos para QML

- `findBindingByName(bindingName: string)`: Encontra um binding específico por nome
- `findBindingsByName(bindingName: string)`: Encontra todos os bindings por nome
- `getBindingValue(bindingName: string)`: Obtém o valor de um binding específico
- `findPropertyByName(propertyName: string)`: Encontra uma propriedade específica por nome
- `findObjectDefinitionsByType(typeName: string)`: Encontra objetos de definição por tipo
- `getObjectType()`: Obtém o tipo do objeto (para ui_object_definition)

### Métodos de Verificação

- `hasBinding(bindingName: string)`: Verifica se o nó tem um binding específico
- `hasProperty(propertyName: string)`: Verifica se o nó tem uma propriedade específica

## Exemplos Práticos

### Exemplo 1: Encontrar Binding "id"

```typescript
const finder = new ASTNodeFinder(node);
const idBinding = finder.findBindingByName("id");

if (idBinding) {
    const idValue = finder.getBindingValue("id");
    if (idValue) {
        console.log("ID encontrado:", idValue.text);
    }
}
```

### Exemplo 2: Verificar Bindings

```typescript
const finder = new ASTNodeFinder(node);

if (finder.hasBinding("width")) {
    console.log("Objeto tem binding 'width'");
}

if (finder.hasBinding("height")) {
    console.log("Objeto tem binding 'height'");
}
```

### Exemplo 3: Encontrar Propriedades

```typescript
const finder = new ASTNodeFinder(node);
const properties = finder.findDescendantsByType('ui_property');

for (const property of properties) {
    const propertyFinder = new ASTNodeFinder(property);
    const nameNode = propertyFinder.findChildByType('identifier');
    if (nameNode) {
        console.log("Propriedade:", nameNode.text);
    }
}
```

### Exemplo 4: Encontrar Objetos por Tipo

```typescript
const finder = new ASTNodeFinder(node);
const buttonDefinitions = finder.findObjectDefinitionsByType("Button");
console.log("Botões encontrados:", buttonDefinitions.length);
```

### Exemplo 5: Obter Tipo do Objeto

```typescript
const finder = new ASTNodeFinder(node);
const objectType = finder.getObjectType();
console.log("Tipo do objeto:", objectType); // "Button", "Item", "Rectangle", etc.
```

### Exemplo 6: Busca Recursiva

```typescript
const finder = new ASTNodeFinder(node);

// Encontrar todos os bindings
const allBindings = finder.findDescendantsByType('ui_binding');
console.log("Total de bindings:", allBindings.length);

// Encontrar texto específico
const textNodes = finder.findDescendantsByText("Hello World");
if (textNodes.length > 0) {
    console.log("Texto encontrado em", textNodes.length, "nós");
}
```

## Vantagens

1. **Legibilidade**: Código mais limpo e fácil de entender
2. **Manutenibilidade**: Não depende de índices hardcoded
3. **Flexibilidade**: Métodos específicos para diferentes tipos de busca
4. **Reutilização**: Pode ser usado em qualquer plugin ou rule
5. **Type Safety**: Totalmente tipado com TypeScript

## Comparação: Antes vs Depois

### Antes (usando índices hardcoded)
```typescript
// Frágil e difícil de manter
const IDENTIFIER_INDEX = 2;
const identifierNode = node.children[IDENTIFIER_INDEX];
```

### Depois (usando ASTNodeFinder)
```typescript
// Limpo e expressivo
const finder = new ASTNodeFinder(node);
const idBinding = finder.findBindingByName("id");
const idValue = finder.getBindingValue("id");
```

## Integração com Plugins

O `ASTNodeFinder` pode ser facilmente integrado em plugins existentes:

```typescript
module.exports = {
    handlers: {
        'my-plugin': {
            create: (context: DiagnosticReportContext) => ({
                ui_object_definition: (node: ASTNode) => {
                    const finder = new ASTNodeFinder(node);
                    
                    // Seu código aqui usando os métodos do finder
                    if (finder.hasBinding("id")) {
                        // Lógica do plugin
                    }
                }
            })
        }
    }
};
``` 