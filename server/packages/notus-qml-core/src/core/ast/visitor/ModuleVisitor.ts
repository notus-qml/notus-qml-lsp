import { ModuleEngine } from "@/core/engine/module/ModuleEngine";
import { ASTVisitor } from "./ASTVisitor";
import { LspConfig, LspMethod, ASTNode, ModuleContext } from "notus-qml-types";

export default class ModuleVisitor implements ASTVisitor {

    private moduleEngine: ModuleEngine;
    private isEnabled: boolean;

    constructor(moduleEngine: ModuleEngine) {
        this.isEnabled = true;
        this.moduleEngine = moduleEngine;
    }

    setIsEnabled(isEnabled: boolean): void {
        this.isEnabled = isEnabled;
    }

    visit(node: ASTNode): void {

        if (!this.isEnabled) {
            return;
        }

        this.moduleEngine.run(node);
    }

    setMethod(methodName: LspMethod, context: ModuleContext) {
        this.moduleEngine.setHandlersByMethod(methodName, context)
    }

    setLspConfig(lspConfig: LspConfig) {
        this.moduleEngine.setLspConfig(lspConfig)
    };

}