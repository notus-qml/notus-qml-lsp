import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class DidChangeHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/didChange');
    }

    protected handleExecute(request: RequestMessage, documentEngine: DocumentEngine): any {
        // ADD LOGIC HERE
        return null;
    }

}