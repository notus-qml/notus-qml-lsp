import { ASTNode } from "@/types/ast/ast.types";
import { ASTVisitor } from "./ASTVisitor";
import { RuleEngine } from "@/core/engine/module/RuleEngine";
import { ModuleContext } from "@/types/module.types";
import { LspConfig, LspMethod } from "@/types/core.types";

export default class RuleVisitor implements ASTVisitor {

    private ruleEngine: RuleEngine;

    constructor() {
        this.ruleEngine = new RuleEngine();
    }

    visit(node: ASTNode): void {
        this.ruleEngine.run(node)
    }

    setMethod(methodName: LspMethod, context: ModuleContext) {
        this.ruleEngine.setHandlersByMethod(methodName, context)
    }

    setLspConfig(lspConfig: LspConfig) {
        this.ruleEngine.setLspConfig(lspConfig)
    };

}