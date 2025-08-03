import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod, DidChangeTextDocumentParams, NotificationMessage } from "notus-qml-types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DidChangeHandler extends MethodHandler<NotificationMessage, null> {

    constructor() {
        super(LspMethod.DidChange);
    }

    protected async handleExecute(request: NotificationMessage, documentEngine: DocumentEngine): Promise<null> {

        const params = request.params as DidChangeTextDocumentParams;

        documentEngine.updateDocument(params.textDocument.uri, params.contentChanges)

        return null;
    }

}