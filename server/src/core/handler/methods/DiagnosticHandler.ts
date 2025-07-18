import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";
import { DocumentDiagnosticParams, FullDocumentDiagnosticReport } from "@/types/lsp/document.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DiagnosticHandler extends MethodHandler<RequestMessage, FullDocumentDiagnosticReport | null> {

    constructor() {
        super(LspMethod.Diagnostic, new DiagnosticReportContext());
    }

    protected handleExecute(request: RequestMessage, documentEngine: DocumentEngine): FullDocumentDiagnosticReport | null {

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