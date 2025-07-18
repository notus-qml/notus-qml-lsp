import { ASTNode } from "@/types/ast/ast.types";
import { ASTVisitor } from "./ASTVisitor";
import { PluginEngine } from "@/core/engine/module/PluginEngine";
import { ModuleContext } from "@/types/module.types";
import { LspMethod } from "@/types/core.types";

export default class PluginVisitor implements ASTVisitor {

    private puglinEngine: PluginEngine;

    constructor() {
        this.puglinEngine = new PluginEngine();
    }

    visit(node: ASTNode): void {
        this.puglinEngine.run(node);

        // Nao usar a assim, vai ficar ruim
        // this.puglinEngine.getContextByMethod()

    }

    setMethod(methodName: LspMethod, context: ModuleContext) {
        this.puglinEngine.setHandlersByMethod(methodName, context)
    }
}