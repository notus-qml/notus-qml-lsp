import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { DocumentDiagnosticParams, FullDocumentDiagnosticReport } from "@/types/lsp/document.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DiagnosticHandler extends MethodHandler<any, FullDocumentDiagnosticReport | null> {

    constructor() {
        super('textDocument/diagnostic', new DiagnosticReportContext());
    }

    protected handleExecute(request: any, documentEngine: DocumentEngine): FullDocumentDiagnosticReport | null {

        const params = request.params as DocumentDiagnosticParams;

        const tree = documentEngine.getAstEngine().getTree(params.textDocument.uri)

        if (!tree) {
            return null;
        }

        documentEngine.analyze(tree.rootNode);

        return this.context?.result?.() as FullDocumentDiagnosticReport;
    }

}