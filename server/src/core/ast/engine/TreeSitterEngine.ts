import ASTEngine from "@core/ast/engine/ASTEngine";

import QML from "../../../../tree-sitter-qmljs";
import { ASTTraverser } from "../traverser/ASTTraverser";
import CompositeVisitor from "../visitor/CompositeVisitor";
import { ASTNode, ASTTree } from "@/types/ast/ast.types";
import { AcceptableMethodName, ModuleContext } from "@/types/module.types";
import { ASTVisitor } from "../visitor/ASTVisitor";
const Parser = require("tree-sitter");

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

    setMethod(methodName: AcceptableMethodName, context: ModuleContext): void {
        this.visitor.setMethod?.(methodName, context);
    }
}