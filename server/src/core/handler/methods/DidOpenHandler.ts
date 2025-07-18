import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";
import { DidOpenTextDocumentParams } from "@/types/lsp/document.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DidOpenHandler extends MethodHandler<RequestMessage, any> {

    constructor() {
        super(LspMethod.DidOpen);
    }

    protected handleExecute(request: RequestMessage, documentEngine: DocumentEngine): any {

        const params = request.params as DidOpenTextDocumentParams;

        documentEngine.setDocument(params.textDocument.uri, params.textDocument.text);

        return null;
    }

}