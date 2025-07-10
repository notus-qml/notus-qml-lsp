import { ModuleContext } from "@/types/module.types";
import DiagnosticsBuilder from "../builder/methods/DiagnosticsBuilder";
import { Diagnostic, FullDocumentDiagnosticReport } from "@/types/lsp/document.types";

export class DiagnosticContext implements ModuleContext {

    private builder: DiagnosticsBuilder = new DiagnosticsBuilder();

    log(message: string) {
        // console.log(`[diagnostic] ${message}`);
    }

    report(data: Diagnostic) {
        this.builder.add(data);
    }

    result(): FullDocumentDiagnosticReport {
        return this.builder.build();
    }

}