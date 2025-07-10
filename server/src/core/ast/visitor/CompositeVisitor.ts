import { ASTNode } from "@/types/ast/ast.types";
import { ASTVisitor } from "./ASTVisitor";
import PluginVisitor from "./PluginVisitor";
import RuleVisitor from "./RuleVisitor";
import { AcceptableMethodName, ModuleContext } from "@/types/module.types";

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

    setMethod(methodName: AcceptableMethodName, context: ModuleContext) {
        this.visitors.forEach((visitor) => {
            visitor?.setMethod?.(methodName, context);
        })
    }

}