import ASTEngine from "@core/ast/engine/ASTEngine";

import QML from "../../../../tree-sitter-qmljs";
import { ASTTraverser } from "../traverser/ASTTraverser";
import CompositeVisitor from "../visitor/CompositeVisitor";
import { ASTNode, ASTQueryMatch, ASTTree } from "@/types/ast/ast.types";
import { ModuleContext } from "@/types/module.types";
import { ASTVisitor } from "../visitor/ASTVisitor";
import { DocumentURI, TextDocumentContentChangedEvent } from "@/types/lsp/document.types";
import { TextUpdated } from "@/core/document/engine/DocumentEngine";
import { LspConfig, LspMethod } from "@/types/core.types";
import Parser = require("tree-sitter");
import Query = Parser.Query;

export default class TreeSitterEngine extends ASTEngine {

    private parser: any;
    private visitor: ASTVisitor;

    constructor() {
        super(new ASTTraverser);
        this.parser = new Parser();
        this.visitor = new CompositeVisitor();
        this.initialize();
    }

    initialize(): void {
        this.parser.setLanguage(QML)
    }

    parse(code: string): ASTTree {
        return this.parser.parse(code);
    }

    analyze(node: ASTNode): void {
        this.traverser.preOrder(node, this.visitor);
    }

    setMethod(methodName: LspMethod, context: ModuleContext): void {
        this.visitor.setMethod?.(methodName, context);
    }

    updateTree(documentURI: DocumentURI, change: TextDocumentContentChangedEvent, textUpdated: TextUpdated): void {

        const oldTree = this.getTree(documentURI)

        const parserEdit = {
            startIndex: textUpdated.startOffset,
            oldEndIndex: textUpdated.endOffset,
            newEndIndex: textUpdated.startOffset + change.text.length,
            startPosition: { row: change.range.start.line, column: change.range.start.character },
            oldEndPosition: { row: change.range.end.line, column: change.range.end.character },
            newEndPosition: this.newEndPosition(change.range.start, change.text),
        };

        oldTree?.edit(parserEdit);

        var newTree = this.parser.parse(textUpdated.text, oldTree);

        this.setTree(documentURI, newTree)

    };

    newEndPosition(start: { line: number; character: number }, insertedText: string) {

        const lines = insertedText.split(/\r?\n/);

        if (lines.length === 1) {
            return {
                row: start.line,
                column: start.character + insertedText.length
            };
        }

        return {
            row: start.line + lines.length - 1,
            column: lines[lines.length - 1].length
        };

    }

    query(node: ASTNode, queryCommand: string): ASTQueryMatch[] {
        const query = new Query(QML as Parser.Language, queryCommand);
        const syntaxNode = node as unknown as Parser.SyntaxNode;
        const matches = query.matches(syntaxNode);
        return matches as unknown as ASTQueryMatch[];
    };

    setLspConfig(lspConfig: LspConfig) {
        this.visitor.setLspConfig?.(lspConfig);
    };

}