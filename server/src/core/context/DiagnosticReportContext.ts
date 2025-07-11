import { ModuleContext } from "@/types/module.types";
import DiagnosticsBuilder from "../builder/methods/DiagnosticsBuilder";
import { DiagnosticContext, FullDocumentDiagnosticReport } from "@/types/lsp/document.types";

export class DiagnosticReportContext implements ModuleContext {

    private builder: DiagnosticsBuilder = new DiagnosticsBuilder();

    log(message: string) {
        // console.log(`[diagnostic] ${message}`);
    }

    report(data: DiagnosticContext) {
        this.builder.add(data);
    }

    result(): FullDocumentDiagnosticReport {
        return this.builder.build();
    }

}