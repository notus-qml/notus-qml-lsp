import { ASTNode } from "@/types/ast/ast.types";
import { ASTVisitor } from "./ASTVisitor";
import { RuleEngine } from "@/core/engine/module/RuleEngine";
import { AcceptableMethodName, ModuleContext } from "@/types/module.types";

export default class RuleVisitor implements ASTVisitor {

    private ruleEngine: RuleEngine;

    constructor() {
        this.ruleEngine = new RuleEngine();
    }

    visit(node: ASTNode): void {
        this.ruleEngine.run(node)
    }

    setMethod(methodName: AcceptableMethodName, context: ModuleContext) {
        this.ruleEngine.setHandlersByMethod(methodName, context)
    }
}