import { ModuleEngine } from "@/core/engine/module/ModuleEngine";
import { ASTVisitor } from "./ASTVisitor";
import { ASTNode } from "notus-qml-types";
import { CodeAnalyzer } from "@/core/utils/CodeAnalyzer";

export default class ModuleVisitor implements ASTVisitor {

    private moduleEngine: ModuleEngine;

    constructor(moduleEngine: ModuleEngine) {
        this.moduleEngine = moduleEngine;
    }

    visit(node: ASTNode): void {
        this.moduleEngine.run(node);
    }

    runByCode(codeAnalyzer: CodeAnalyzer): void {
        this.moduleEngine.runByCode(codeAnalyzer)
    }

}