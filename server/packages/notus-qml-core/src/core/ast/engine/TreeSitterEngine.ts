import ASTEngine from "@core/ast/engine/ASTEngine";

import QML from "tree-sitter-qmljs";
import { ASTTraverser } from "../traverser/ASTTraverser";
import CompositeVisitor from "../visitor/CompositeVisitor";
import { ASTVisitor } from "../visitor/ASTVisitor";
import { TextUpdated } from "@/core/document/engine/DocumentEngine";
import { RuleEngine } from "@/core/engine/module/RuleEngine";
import { PluginEngine } from "@/core/engine/module/PluginEngine";
import { ASTNode, ASTQueryMatch, ASTTree, ModuleContext, DocumentURI, TextDocumentContentChangedEvent, LspConfig, LspMethod } from "notus-qml-types";
import { CodeAnalyzer } from "@/core/utils/CodeAnalyzer";
import { ModuleBuilder } from "@/core/builder/ModuleBuilder";

import Parser = require("tree-sitter");
import Query = Parser.Query;

export default class TreeSitterEngine extends ASTEngine {

    private parser: any;
    private visitor: ASTVisitor;
    private ruleEngine: RuleEngine;
    private pluginEngine: PluginEngine;
    private codeAnalyzer: CodeAnalyzer;

    constructor() {
        super(new ASTTraverser);
        this.parser = new Parser();

        this.codeAnalyzer = new CodeAnalyzer();

        this.pluginEngine = new PluginEngine(ModuleBuilder.context());
        this.ruleEngine = new RuleEngine(ModuleBuilder.context());

        this.visitor = new CompositeVisitor(this.pluginEngine, this.ruleEngine);

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

        // TODO Only exec this, if runByCode has some  rule
        this.codeAnalyzer.process(node.text);

        this.pluginEngine.runByCode(this.codeAnalyzer);
        this.ruleEngine.runByCode(this.codeAnalyzer);

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