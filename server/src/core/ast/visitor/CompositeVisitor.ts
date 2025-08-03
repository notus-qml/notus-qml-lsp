import { ASTNode } from "@/types/ast/ast.types";
import { ASTVisitor } from "./ASTVisitor";
import PluginVisitor from "./PluginVisitor";
import RuleVisitor from "./RuleVisitor";
import { ModuleContext } from "@/types/module.types";
import { LspConfig, LspMethod } from "@/types/core.types";

export default class CompositeVisitor implements ASTVisitor {

    private visitors: ASTVisitor[];

    constructor() {
        this.visitors = [
            new PluginVisitor(),
            new RuleVisitor()
        ];
    }

    visit(node: ASTNode): void {
        this.visitors.forEach((visitor: ASTVisitor) => {
            visitor.visit(node)
        })
    }

    setMethod(methodName: LspMethod, context: ModuleContext) {
        this.visitors.forEach((visitor) => {
            visitor?.setMethod?.(methodName, context);
        })
    }

    setLspConfig(lspConfig: LspConfig) {
        this.visitors.forEach((visitor) => {
            visitor?.setLspConfig?.(lspConfig);
        })
    }

}