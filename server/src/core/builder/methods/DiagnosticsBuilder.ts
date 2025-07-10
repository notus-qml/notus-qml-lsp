import { Diagnostic, FullDocumentDiagnosticReport } from "@/types/lsp/document.types";

export default class DiagnosticsBuilder {

    private diagnostics: Diagnostic[];

    constructor() {
        this.diagnostics = [];
    }

    add(diagnostic: Diagnostic) {
        this.diagnostics.push(diagnostic);
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

}