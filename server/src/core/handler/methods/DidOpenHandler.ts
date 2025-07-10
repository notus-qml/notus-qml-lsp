import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { DidOpenTextDocumentParams } from "@/types/lsp/document.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DidOpenHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/didOpen');
    }

    protected handleExecute(request: RequestMessage, documentEngine: DocumentEngine): any {

        const params = request.params as DidOpenTextDocumentParams;

        documentEngine.setDocument(params.textDocument.uri, params.textDocument.text);

        return null;
    }

}