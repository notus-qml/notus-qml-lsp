import { PluginEngine } from "@/core/engine/module/PluginEngine";
import { ASTVisitor } from "./ASTVisitor";
import ModuleVisitor from "./ModuleVisitor";
import { ModuleContext, LspConfig, LspMethod, ASTNode } from "notus-qml-types";
import { RuleEngine } from "@/core/engine/module/RuleEngine";

export default class CompositeVisitor implements ASTVisitor {

    private pluginVisitor: ModuleVisitor;
    private ruleVisitor: ModuleVisitor;

    constructor(pluginEngine: PluginEngine, ruleEngine: RuleEngine) {
        this.pluginVisitor = new ModuleVisitor(pluginEngine);
        this.ruleVisitor = new ModuleVisitor(ruleEngine);
    }

    visit(node: ASTNode): void {
        this.ruleVisitor.visit(node)
        this.pluginVisitor.visit(node)
    }

    setMethod(methodName: LspMethod, context: ModuleContext) {
        this.ruleVisitor?.setMethod?.(methodName, context);
        this.pluginVisitor?.setMethod?.(methodName, context);
    }

    disablePluginVisitor(lspConfig: LspConfig) {

        const hasPluginPath = lspConfig.paths?.plugin !== '';

        this.pluginVisitor.setIsEnabled(hasPluginPath);

    }

    setLspConfig(lspConfig: LspConfig) {

        this.disablePluginVisitor(lspConfig);

        this.ruleVisitor?.setLspConfig?.(lspConfig);
        this.pluginVisitor?.setLspConfig?.(lspConfig);

    }

}