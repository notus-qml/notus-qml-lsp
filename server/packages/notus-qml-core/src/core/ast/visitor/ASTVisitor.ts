import { CodeAnalyzer } from "@/core/utils/CodeAnalyzer";
import { ASTNode, LspConfig, ModuleContext } from "notus-qml-types";

export interface ASTVisitor {
    visit(node: ASTNode): void;
    enterNode?(node: ASTNode): boolean;
    exitNode?(node: ASTNode): void;
    setContext?(context: ModuleContext): void;
    runByCode?(codeAnalyzer: CodeAnalyzer): void;
}