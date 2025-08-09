import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import { FullDocumentDiagnosticReport, LspMethod, NotificationMessage, TextDocumentIdentifier } from "notus-qml-types";
import { MethodHandler } from "../MethodHandler";
import DocumentEngine from "@/core/document/engine/DocumentEngine";

export class PublishDiagnosticHandler extends MethodHandler<NotificationMessage, NotificationMessage | null> {

    constructor() {
        super(LspMethod.PublishDiagnostics, new DiagnosticReportContext());
    }

    protected async handleExecute(notification: NotificationMessage, documentEngine: DocumentEngine): Promise<NotificationMessage | null> {

        const params = notification.params as { textDocument: TextDocumentIdentifier };

        const diagnosticReportContext = this.context as DiagnosticReportContext;

        diagnosticReportContext.getBuilder().setDocumentURI(params.textDocument.uri)

        const tree = documentEngine.getAstEngine().getTree(params.textDocument.uri)

        if (!tree) {
            return null;
        }

        documentEngine.analyze(tree.rootNode);

        const result = this.context?.result?.() as FullDocumentDiagnosticReport;

        const publishDiagnostics: NotificationMessage = {
            jsonrpc: "2.0",
            method: this.methodName,
            params: {
                diagnostics: result.items,
                uri: params.textDocument.uri
            }
        }

        return publishDiagnostics;

    }

}