import { DiagnosticMapper } from "@/core/mapper/DiagnosticMapper";
import { ASTNode } from "@/types/ast/ast.types";
import { Diagnostic, DocumentURI, FullDocumentDiagnosticReport, LSPRange } from "@/types/lsp/document.types";
import { DiagnosticContext } from "@/types/report/report.types";

export default class DiagnosticsBuilder {

    private diagnostics: Diagnostic[];
    private documentURI: DocumentURI;

    constructor() {
        this.diagnostics = [];
        this.documentURI = "";
    }

    setDocumentURI(documentURI: DocumentURI) {
        this.documentURI = documentURI;
    }

    add(diagnosticContext: DiagnosticContext) {
        this.diagnostics.push(this.handler(diagnosticContext));
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
            // TODO if node and range not exist, throw error
            diagnostic.item.range = this.handlerNode(diagnostic.node)
        }

        return DiagnosticMapper.fromContext(diagnostic.item, this.documentURI);

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