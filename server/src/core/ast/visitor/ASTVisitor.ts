import { ASTNode } from "@/types/ast/ast.types";
import { LspMethod } from "@/types/core.types";
import { ModuleContext } from "@/types/module.types";

export interface ASTVisitor {
    visit(node: ASTNode): void;
    enterNode?(node: ASTNode): boolean;
    exitNode?(node: ASTNode): void;
    setMethod?(methodName: LspMethod, context: ModuleContext): void;
}