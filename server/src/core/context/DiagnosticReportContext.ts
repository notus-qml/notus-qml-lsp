import { ModuleContext } from "@/types/module.types";
import { FullDocumentDiagnosticReport } from "@/types/lsp/document.types";
import { DiagnosticContext } from "@/types/report/report.types";
import DiagnosticsBuilder from "../builder/methods/DiagnosticsBuilder";

export class DiagnosticReportContext implements ModuleContext {

    private builder: DiagnosticsBuilder = new DiagnosticsBuilder();

    log(message: string) {
        // console.log(`[diagnostic] ${message}`);
    }

    report(data: DiagnosticContext) {
        this.builder.add(data);
    }

    result(): FullDocumentDiagnosticReport {
        const result = this.builder.build();
        this.builder.clear();
        return result;
    }

    getBuilder(): DiagnosticsBuilder {
        return this.builder;
    }


}