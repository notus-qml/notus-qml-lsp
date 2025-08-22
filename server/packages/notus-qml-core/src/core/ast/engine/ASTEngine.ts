import { ASTNode, ASTQueryMatch, ASTTree } from "notus-qml-types";
import { ASTTraverser } from "../traverser/ASTTraverser";
import { DocumentURI, TextDocumentContentChangedEvent } from "notus-qml-types";
import { TextUpdated } from "@/core/document/engine/DocumentEngine";
import { ASTVisitor } from "../visitor/ASTVisitor";
import CompositeVisitor from "../visitor/CompositeVisitor";

export default abstract class ASTEngine {

    protected traverser: ASTTraverser;
    protected trees: Map<DocumentURI, ASTTree>;

    protected visitor: CompositeVisitor;

    constructor(traverser: ASTTraverser) {
        this.traverser = traverser;
        this.trees = new Map();
        this.visitor = new CompositeVisitor();
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

    addVisitor(visitor: ASTVisitor) {
        this.visitor.addVisitor(visitor);
    }

    abstract updateTree(documentURI: DocumentURI, change: TextDocumentContentChangedEvent, textUpdated: TextUpdated): void;
    abstract initialize(): void;
    abstract parse(code: string): ASTTree;
    abstract analyze(node: ASTNode): void
    abstract query(node: ASTNode, queryCommand: string): ASTQueryMatch[];

}