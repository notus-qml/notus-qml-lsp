import ASTEngine from "@/core/ast/engine/ASTEngine";
import { ASTNode, ASTTree } from "@/types/ast/ast.types";
import { DocumentBody, DocumentURI } from "@/types/lsp/document.types";
import { AcceptableMethodName, ModuleContext } from "@/types/module.types";

export default class DocumentEngine {

    private astEngine: ASTEngine;
    private documentsByURI: Map<DocumentURI, DocumentBody>;

    constructor(astEngine: ASTEngine) {
        this.astEngine = astEngine;
        this.documentsByURI = new Map();
    }

    getAstEngine(): ASTEngine {
        return this.astEngine;
    }

    getDocument(documentURI: DocumentURI): string | null {
        return this.documentsByURI.get(documentURI) ?? null;
    }

    hasDocument(documentURI: DocumentURI): boolean {
        return this.documentsByURI.has(documentURI);
    }

    setDocument(documentURI: DocumentURI, documentBody: DocumentBody) {
        this.documentsByURI.set(documentURI, documentBody);
        this.astEngine.setTree(documentURI, this.astEngine.parse(documentBody));
    }

    parse(code: string): ASTTree {
        return this.astEngine.parse(code);
    }

    analyze(node: ASTNode) {
        this.astEngine.analyze(node);
    }

    setMethod(methodName: AcceptableMethodName, context: ModuleContext): void {
        this.astEngine.setMethod(methodName, context);
    }

}