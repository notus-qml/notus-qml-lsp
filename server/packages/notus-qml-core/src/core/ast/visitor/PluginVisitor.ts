import { ASTVisitor } from "./ASTVisitor";
import { PluginEngine } from "@/core/engine/module/PluginEngine";
import { LspConfig, LspMethod, ASTNode, ModuleContext } from "notus-qml-types";

export default class PluginVisitor implements ASTVisitor {

    private puglinEngine: PluginEngine;

    constructor() {
        this.puglinEngine = new PluginEngine();
    }

    visit(node: ASTNode): void {
        this.puglinEngine.run(node);
    }

    setMethod(methodName: LspMethod, context: ModuleContext) {
        this.puglinEngine.setHandlersByMethod(methodName, context)
    }

    setLspConfig(lspConfig: LspConfig) {
        this.puglinEngine.setLspConfig(lspConfig)
    };

}