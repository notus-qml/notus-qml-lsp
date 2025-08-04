import { DiagnosticMapper } from "@/core/mapper/DiagnosticMapper";
import { Diagnostic, DocumentURI, FullDocumentDiagnosticReport, LSPRange, ASTNode, DiagnosticContext } from "notus-qml-types";

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
        this.documentURI = "";
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