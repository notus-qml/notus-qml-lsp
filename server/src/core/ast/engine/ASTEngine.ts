import { ASTNode, ASTTree } from "@/types/ast/ast.types";
import { ASTTraverser } from "../traverser/ASTTraverser";
import { ModuleContext } from "@/types/module.types";
import { DocumentURI, TextDocumentContentChangedEvent } from "@/types/lsp/document.types";
import { TextUpdated } from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";

export default abstract class ASTEngine {

    protected traverser: ASTTraverser;
    protected trees: Map<DocumentURI, ASTTree>;

    constructor(traverser: ASTTraverser) {
        this.traverser = traverser;
        this.trees = new Map();
    }

    hasTree(documentURI: DocumentURI): boolean {
        return this.trees.has(documentURI);
    }

    getTree(documentURI: DocumentURI): ASTTree | null {
        return this.trees.get(documentURI) ?? null;
    }

    setTree(documentURI: DocumentURI, tree: ASTTree) {
        this.trees.set(documentURI, tree);
    }

    abstract updateTree(documentURI: DocumentURI, change: TextDocumentContentChangedEvent, textUpdated: TextUpdated): void;
    abstract initialize(): void;
    abstract parse(code: string): ASTTree;
    abstract analyze(node: ASTNode): void
    abstract setMethod(methodName: LspMethod, context: ModuleContext): void;
}