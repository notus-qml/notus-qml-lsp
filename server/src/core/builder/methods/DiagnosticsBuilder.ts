import { ASTNode } from "@/types/ast/ast.types";
import { Diagnostic, DiagnosticContext, FullDocumentDiagnosticReport, LSPRange } from "@/types/lsp/document.types";

export default class DiagnosticsBuilder {

    private diagnostics: Diagnostic[];

    constructor() {
        this.diagnostics = [];
    }

    add(diagnostic: DiagnosticContext) {
        this.diagnostics.push(this.handler(diagnostic));
    }

    clear() {
        this.diagnostics = [];
    }

    build(): FullDocumentDiagnosticReport {
        return {
            kind: "full",
            items: this.diagnostics
        };
    }

    private handler(diagnostic: DiagnosticContext): Diagnostic {

        if (diagnostic?.node) {
            diagnostic.item.range = this.handlerNode(diagnostic.node)
        }

        return diagnostic.item as Diagnostic;

    }

    private handlerNode(node: ASTNode): LSPRange {
        return {
            start: {
                line: node.startPosition.row,
                character: node.startPosition.column
            },
            end: {
                line: node.endPosition.row,
                character: node.endPosition.column
            }
        }
    }

}