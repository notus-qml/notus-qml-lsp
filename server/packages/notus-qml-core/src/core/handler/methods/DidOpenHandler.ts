import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod, DidOpenTextDocumentParams, RequestMessage } from "notus-qml-types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DidOpenHandler extends MethodHandler<RequestMessage, any> {

    constructor() {
        super(LspMethod.DidOpen);
    }

    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<any> {

        const params = request.params as DidOpenTextDocumentParams;

        documentEngine.setDocument(params.textDocument.uri, params.textDocument.text);

        return null;
    }

}