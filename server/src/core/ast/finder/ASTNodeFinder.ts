import { ASTNode } from "@/types/ast/ast.types";

export class ASTNodeFinder {
    private node: ASTNode;

    constructor(node: ASTNode) {
        this.node = node;
    }

    /**
     * Encontra um nó filho por tipo
     */
    findChildByType(type: string): ASTNode | null {
        return this.node.children.find(child => child.type === type) || null;
    }

    /**
     * Encontra todos os nós filhos por tipo
     */
    findChildrenByType(type: string): ASTNode[] {
        return this.node.children.filter(child => child.type === type);
    }

    /**
     * Encontra um nó filho por texto
     */
    findChildByText(text: string): ASTNode | null {
        return this.node.children.find(child => child.text === text) || null;
    }

    /**
     * Encontra todos os nós filhos por texto
     */
    findChildrenByText(text: string): ASTNode[] {
        return this.node.children.filter(child => child.text === text);
    }

    /**
     * Encontra um nó filho por nome (para nós nomeados)
     */
    findChildByName(name: string): ASTNode | null {
        return this.node.children.find(child => child.name === name) || null;
    }

    /**
     * Encontra todos os nós filhos por nome
     */
    findChildrenByName(name: string): ASTNode[] {
        return this.node.children.filter(child => child.name === name);
    }

    /**
     * Busca recursivamente por um nó com tipo específico
     */
    findDescendantByType(type: string): ASTNode | null {
        if (this.node.type === type) {
            return this.node;
        }

        for (const child of this.node.children) {
            const finder = new ASTNodeFinder(child);
            const result = finder.findDescendantByType(type);
            if (result) {
                return result;
            }
        }

        return null;
    }

    /**
     * Busca recursivamente por todos os nós com tipo específico
     */
    findDescendantsByType(type: string): ASTNode[] {
        const results: ASTNode[] = [];

        if (this.node.type === type) {
            results.push(this.node);
        }

        for (const child of this.node.children) {
            const finder = new ASTNodeFinder(child);
            results.push(...finder.findDescendantsByType(type));
        }

        return results;
    }

    /**
     * Busca recursivamente por um nó com texto específico
     */
    findDescendantByText(text: string): ASTNode | null {
        if (this.node.text === text) {
            return this.node;
        }

        for (const child of this.node.children) {
            const finder = new ASTNodeFinder(child);
            const result = finder.findDescendantByText(text);
            if (result) {
                return result;
            }
        }

        return null;
    }

    /**
     * Busca recursivamente por todos os nós com texto específico
     */
    findDescendantsByText(text: string): ASTNode[] {
        const results: ASTNode[] = [];

        if (this.node.text === text) {
            results.push(this.node);
        }

        for (const child of this.node.children) {
            const finder = new ASTNodeFinder(child);
            results.push(...finder.findDescendantsByText(text));
        }

        return results;
    }

    /**
     * Encontra um binding específico por nome (ex: "id", "width", etc.)
     */
    findBindingByName(bindingName: string): ASTNode | null {
        const bindings = this.findDescendantsByType('ui_binding');

        for (const binding of bindings) {
            const finder = new ASTNodeFinder(binding);
            const nameNode = finder.findChildByType('identifier') || finder.findChildByType('nested_identifier');

            if (nameNode && nameNode.text === bindingName) {
                return binding;
            }
        }

        return null;
    }

    /**
     * Encontra todos os bindings por nome
     */
    findBindingsByName(bindingName: string): ASTNode[] {
        const bindings = this.findDescendantsByType('ui_binding');
        const results: ASTNode[] = [];

        for (const binding of bindings) {
            const finder = new ASTNodeFinder(binding);
            const nameNode = finder.findChildByType('identifier') || finder.findChildByType('nested_identifier');

            if (nameNode && nameNode.text === bindingName) {
                results.push(binding);
            }
        }

        return results;
    }

    /**
     * Obtém o valor de um binding específico
     */
    getBindingValue(bindingName: string): ASTNode | null {
        const binding = this.findBindingByName(bindingName);
        if (!binding) return null;

        const finder = new ASTNodeFinder(binding);
        return finder.findChildByType('ui_object_definition') ||
            finder.findChildByType('ui_object_array') ||
            finder.findChildByType('expression_statement');
    }

    /**
     * Encontra uma propriedade específica por nome
     */
    findPropertyByName(propertyName: string): ASTNode | null {
        const properties = this.findDescendantsByType('ui_property');

        for (const property of properties) {
            const finder = new ASTNodeFinder(property);
            const nameNode = finder.findChildByType('identifier');

            if (nameNode && nameNode.text === propertyName) {
                return property;
            }
        }

        return null;
    }

    /**
     * Encontra todos os objetos de definição por tipo
     */
    findObjectDefinitionsByType(typeName: string): ASTNode[] {
        const definitions = this.findDescendantsByType('ui_object_definition');
        const results: ASTNode[] = [];

        for (const definition of definitions) {
            const finder = new ASTNodeFinder(definition);
            const typeNode = finder.findChildByType('identifier') || finder.findChildByType('nested_identifier');

            if (typeNode && typeNode.text === typeName) {
                results.push(definition);
            }
        }

        return results;
    }

    /**
     * Verifica se o nó tem um binding específico
     */
    hasBinding(bindingName: string): boolean {
        return this.findBindingByName(bindingName) !== null;
    }

    /**
     * Verifica se o nó tem uma propriedade específica
     */
    hasProperty(propertyName: string): boolean {
        return this.findPropertyByName(propertyName) !== null;
    }

    /**
     * Obtém o tipo do objeto (para ui_object_definition)
     */
    getObjectType(): string | null {
        if (this.node.type !== 'ui_object_definition') {
            return null;
        }

        const typeNameNode = this.findChildByType('identifier') || this.findChildByType('nested_identifier');
        return typeNameNode?.text || null;
    }

    /**
     * Obtém o nó original
     */
    getNode(): ASTNode {
        return this.node;
    }
} 