import { ASTNode } from "../ast/ast.types";
import { CodeDescription, DiagnosticSeverity, LSPRange } from "../lsp/document.types";

export interface CodeActionEditReportContext {
    newText: string;
}

export interface CodeActionReportContext {
    title: string;
    kind?: "quickfix"; // TODO replace for type
    items: CodeActionEditReportContext[];
}

export interface DiagnosticItemReportContext {
    range?: LSPRange;
    severity?: DiagnosticSeverity;
    code?: number | string;
    codeDescription?: CodeDescription;
    message: string;
    suggestions?: CodeActionReportContext[]
}

export interface DiagnosticContext {
    node?: ASTNode;
    item: DiagnosticItemReportContext
};