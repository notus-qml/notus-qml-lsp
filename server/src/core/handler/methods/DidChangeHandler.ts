import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";
import { DidChangeTextDocumentParams } from "@/types/lsp/document.types";
import { NotificationMessage, RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DidChangeHandler extends MethodHandler<NotificationMessage, null> {

    constructor() {
        super(LspMethod.DidChange);
    }

    protected handleExecute(request: NotificationMessage, documentEngine: DocumentEngine): null {

        const params = request.params as DidChangeTextDocumentParams;

        documentEngine.updateDocument(params.textDocument.uri, params.contentChanges)

        return null;
    }

}