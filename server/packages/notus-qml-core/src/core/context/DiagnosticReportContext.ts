import { ModuleContext, FullDocumentDiagnosticReport, DiagnosticContext } from "notus-qml-types";
import DiagnosticsBuilder from "../builder/methods/DiagnosticsBuilder";
import { logger } from "../logger/Logger";

export class DiagnosticReportContext implements ModuleContext {

    private builder: DiagnosticsBuilder = new DiagnosticsBuilder();

    log(message: string) {
        logger.info("DiagnosticReportContext", "log", message)
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