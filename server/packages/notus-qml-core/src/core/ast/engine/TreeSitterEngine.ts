import ASTEngine from "@core/ast/engine/ASTEngine";

import QML from "tree-sitter-qmljs";
import { ASTTraverser } from "../traverser/ASTTraverser";
import { ASTVisitor } from "../visitor/ASTVisitor";
import { TextUpdated } from "@/core/document/engine/DocumentEngine";
import { ASTNode, ASTQueryMatch, ASTTree, DocumentURI, TextDocumentContentChangedEvent } from "notus-qml-types";
import { CodeAnalyzer } from "@/core/utils/CodeAnalyzer";

import Parser = require("tree-sitter");
import Query = Parser.Query;

export default class TreeSitterEngine extends ASTEngine {

    private parser: any;

    private codeAnalyzer: CodeAnalyzer;

    constructor() {
        super(new ASTTraverser);
        this.parser = new Parser();

        this.codeAnalyzer = new CodeAnalyzer();

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

        this.codeAnalyzer.process(node.text);

        this.visitor.runByCode?.(this.codeAnalyzer)

    }

    addVisitor(visitor: ASTVisitor) {
        this.visitor.addVisitor(visitor);
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

}