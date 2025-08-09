import { PluginEngine } from "@/core/engine/module/PluginEngine";
import { ASTVisitor } from "./ASTVisitor";
import PluginVisitor from "./PluginVisitor";
import RuleVisitor from "./RuleVisitor";
import { ModuleContext, LspConfig, LspMethod, ASTNode } from "notus-qml-types";
import { RuleEngine } from "@/core/engine/module/RuleEngine";

export default class CompositeVisitor implements ASTVisitor {

    private visitors: ASTVisitor[];

    constructor(pluginEngine: PluginEngine, ruleEngine: RuleEngine) {
        this.visitors = [
            new PluginVisitor(pluginEngine),
            new RuleVisitor(ruleEngine)
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

    removePluginVisitor(lspConfig: LspConfig) {

        const hasPluginPath = lspConfig.paths?.plugin !== '';

        if (!hasPluginPath) {
            this.visitors = this.visitors.filter((visitor) => {
                return !(visitor instanceof PluginVisitor)
            })
        }

    }

    setLspConfig(lspConfig: LspConfig) {

        this.removePluginVisitor(lspConfig);

        this.visitors.forEach((visitor) => {
            visitor?.setLspConfig?.(lspConfig);
        })

    }

}