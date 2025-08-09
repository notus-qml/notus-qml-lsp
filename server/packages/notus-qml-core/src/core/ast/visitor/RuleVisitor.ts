import { ASTVisitor } from "./ASTVisitor";
import { RuleEngine } from "@/core/engine/module/RuleEngine";
import { ASTNode, LspConfig, LspMethod, ModuleContext } from "notus-qml-types";

export default class RuleVisitor implements ASTVisitor {

    private ruleEngine: RuleEngine;

    constructor(ruleEngine: RuleEngine) {
        this.ruleEngine = ruleEngine;
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