import { ASTNode } from "notus-qml-types";

export class ASTNodeFinder {

    /**
     * Encontra um nó filho por tipo
     */
    findChildByType(node: ASTNode, type: string): ASTNode | null {
        return node.children.find(child => child.type === type) || null;
    }

    /**
     * Encontra todos os nós filhos por tipo
     */
    findChildrenByType(node: ASTNode, type: string): ASTNode[] {
        return node.children.filter(child => child.type === type);
    }

    /**
     * Encontra um nó filho por texto
     */
    findChildByText(node: ASTNode, text: string): ASTNode | null {
        return node.children.find(child => child.text === text) || null;
    }

    /**
     * Encontra todos os nós filhos por texto
     */
    findChildrenByText(node: ASTNode, text: string): ASTNode[] {
        return node.children.filter(child => child.text === text);
    }

    /**
     * Encontra um nó filho por nome (para nós nomeados)
     */
    findChildByName(node: ASTNode, name: string): ASTNode | null {
        return node.children.find(child => child.name === name) || null;
    }

    /**
     * Encontra todos os nós filhos por nome
     */
    findChildrenByName(node: ASTNode, name: string): ASTNode[] {
        return node.children.filter(child => child.name === name);
    }

    /**
     * Busca recursivamente por um nó com tipo específico
     */
    findNestedDescendantByType(node: ASTNode, types: string[]): ASTNode | null {

        let currentNode: ASTNode | null = node;

        for (const type of types) {

            if (!currentNode) {
                return null;
            }

            currentNode = this.findDescendantByType(currentNode, type);

            if (!currentNode) {
                return null
            };
        }

        return currentNode;
    }

    /**
     * Busca recursivamente por um nó com tipo específico
     */
    findDescendantByType(node: ASTNode, type: string): ASTNode | null {
        if (node.type === type) {
            return node;
        }

        for (const child of node.children) {
            const result = this.findDescendantByType(child, type);
            if (result) {
                return result;
            }
        }

        return null;
    }

    /**
     * Busca recursivamente por todos os nós com tipo específico
     */
    findDescendantsByType(node: ASTNode, type: string): ASTNode[] {
        const results: ASTNode[] = [];

        if (node.type === type) {
            results.push(node);
        }

        for (const child of node.children) {
            results.push(...this.findDescendantsByType(child, type));
        }

        return results;
    }

    /**
     * Busca recursivamente por um nó com texto específico
     */
    findDescendantByText(node: ASTNode, text: string): ASTNode | null {
        if (node.text === text) {
            return node;
        }

        for (const child of node.children) {
            const result = this.findDescendantByText(child, text);
            if (result) {
                return result;
            }
        }

        return null;
    }

    /**
     * Busca recursivamente por todos os nós com texto específico
     */
    findDescendantsByText(node: ASTNode, text: string): ASTNode[] {
        const results: ASTNode[] = [];

        if (node.text === text) {
            results.push(node);
        }

        for (const child of node.children) {
            results.push(...this.findDescendantsByText(child, text));
        }

        return results;
    }

    /**
     * Encontra um binding específico por nome (ex: "id", "width", etc.)
     */
    findBindingByName(node: ASTNode, bindingName: string): ASTNode | null {
        const bindings = this.findDescendantsByType(node, 'ui_binding');

        for (const binding of bindings) {
            const nameNode = this.findChildByType(binding, 'identifier') || this.findChildByType(binding, 'nested_identifier');

            if (nameNode && nameNode.text === bindingName) {
                return binding;
            }
        }

        return null;
    }

    /**
     * Encontra todos os bindings por nome
     */
    findBindingsByName(node: ASTNode, bindingName: string): ASTNode[] {
        const bindings = this.findDescendantsByType(node, 'ui_binding');
        const results: ASTNode[] = [];

        for (const binding of bindings) {
            const nameNode = this.findChildByType(binding, 'identifier') || this.findChildByType(binding, 'nested_identifier');

            if (nameNode && nameNode.text === bindingName) {
                results.push(binding);
            }
        }

        return results;
    }

    /**
     * Obtém o valor de um binding específico
     */
    getBindingValue(node: ASTNode, bindingName: string): ASTNode | null {
        const binding = this.findBindingByName(node, bindingName);

        if (!binding) {
            return null
        };

        return this.findChildByType(binding, 'ui_object_definition') ||
            this.findChildByType(binding, 'ui_object_array') ||
            this.findChildByType(binding, 'expression_statement');
    }

    /**
     * Encontra uma propriedade específica por nome
     */
    findPropertyByName(node: ASTNode, propertyName: string): ASTNode | null {
        const properties = this.findDescendantsByType(node, 'ui_property');

        for (const property of properties) {
            const nameNode = this.findChildByType(property, 'identifier');

            if (nameNode && nameNode.text === propertyName) {
                return property;
            }
        }

        return null;
    }

    /**
     * Encontra todos os objetos de definição por tipo
     */
    findObjectDefinitionsByType(node: ASTNode, typeName: string): ASTNode[] {
        const definitions = this.findDescendantsByType(node, 'ui_object_definition');
        const results: ASTNode[] = [];

        for (const definition of definitions) {
            const typeNode = this.findChildByType(definition, 'identifier') || this.findChildByType(definition, 'nested_identifier');

            if (typeNode && typeNode.text === typeName) {
                results.push(definition);
            }
        }

        return results;
    }

    /**
     * Verifica se o nó tem um binding específico
     */
    hasBinding(node: ASTNode, bindingName: string): boolean {
        return this.findBindingByName(node, bindingName) !== null;
    }

    /**
     * Verifica se o nó tem uma propriedade específica
     */
    hasProperty(node: ASTNode, propertyName: string): boolean {
        return this.findPropertyByName(node, propertyName) !== null;
    }

    /**
     * Obtém o tipo do objeto (para ui_object_definition)
     */
    getObjectType(node: ASTNode): string | null {
        if (node.type !== 'ui_object_definition') {
            return null;
        }

        const typeNameNode = this.findChildByType(node, 'identifier') || this.findChildByType(node, 'nested_identifier');
        return typeNameNode?.text || null;
    }


} 