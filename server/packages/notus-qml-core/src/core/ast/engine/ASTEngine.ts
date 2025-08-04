import { ASTNode, ASTQueryMatch, ASTTree } from "notus-qml-types";
import { ASTTraverser } from "../traverser/ASTTraverser";
import { ModuleContext } from "notus-qml-types";
import { DocumentURI, TextDocumentContentChangedEvent } from "notus-qml-types";
import { TextUpdated } from "@/core/document/engine/DocumentEngine";
import { LspConfig, LspMethod } from "notus-qml-types";

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
    abstract setLspConfig(lspConfig: LspConfig): void;
    abstract query(node: ASTNode, queryCommand: string): ASTQueryMatch[];

}