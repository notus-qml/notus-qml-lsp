import { ASTNode, LspConfig, LspMethod, ModuleContext } from "notus-qml-types";

export interface ASTVisitor {
    visit(node: ASTNode): void;
    enterNode?(node: ASTNode): boolean;
    exitNode?(node: ASTNode): void;
    setMethod?(methodName: LspMethod, context: ModuleContext): void;
    setLspConfig?(lspConfig: LspConfig): void;
    setIsEnabled?(isEnabled: boolean): void;
}