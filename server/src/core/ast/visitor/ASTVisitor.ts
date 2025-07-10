import { ASTNode } from "@/types/ast/ast.types";
import { AcceptableMethodName, ModuleContext } from "@/types/module.types";

export interface ASTVisitor {
    visit(node: ASTNode): void;
    enterNode?(node: ASTNode): boolean;
    exitNode?(node: ASTNode): void;
    setMethod?(methodName: AcceptableMethodName, context: ModuleContext): void;
}