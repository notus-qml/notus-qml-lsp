import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod, DocumentDiagnosticParams, FullDocumentDiagnosticReport, RequestMessage } from "notus-qml-types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DiagnosticHandler extends MethodHandler<RequestMessage, FullDocumentDiagnosticReport | null> {

    constructor() {
        super(LspMethod.Diagnostic, new DiagnosticReportContext());
    }

    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<FullDocumentDiagnosticReport | null> {

        const diagnosticReportContext = this.context as DiagnosticReportContext;

        const params = request.params as DocumentDiagnosticParams;

        diagnosticReportContext.getBuilder().setDocumentURI(params.textDocument.uri)

        const tree = documentEngine.getAstEngine().getTree(params.textDocument.uri)

        if (!tree) {
            return null;
        }

        documentEngine.analyze(tree.rootNode);

        return this.context?.result?.() as FullDocumentDiagnosticReport;
    }

}