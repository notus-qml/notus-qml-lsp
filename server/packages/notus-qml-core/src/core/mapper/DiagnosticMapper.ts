import { Diagnostic, DocumentURI, LSPRange, DiagnosticItemReportContext } from "notus-qml-types";
import SuggetionsMapper from "./SeggestionsMapper";

export class DiagnosticMapper {

    static fromContext(diagnosticItemReportContext: DiagnosticItemReportContext, documentURI: DocumentURI): Diagnostic {

        const range = diagnosticItemReportContext.range as LSPRange;

        return {
            range: range,
            severity: diagnosticItemReportContext.severity,
            code: diagnosticItemReportContext.code,
            codeDescription: diagnosticItemReportContext.codeDescription,
            message: diagnosticItemReportContext.message,
            data: {
                suggestions: SuggetionsMapper.fromContexts(diagnosticItemReportContext.suggestions, documentURI, range)
            }
        }

    }

}