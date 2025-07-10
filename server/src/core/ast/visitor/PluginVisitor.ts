import { ASTNode } from "@/types/ast/ast.types";
import { ASTVisitor } from "./ASTVisitor";
import { PluginEngine } from "@/core/engine/module/PluginEngine";
import { AcceptableMethodName, ModuleContext } from "@/types/module.types";

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

    setMethod(methodName: AcceptableMethodName, context: ModuleContext) {
        this.puglinEngine.setHandlersByMethod(methodName, context)
    }
}