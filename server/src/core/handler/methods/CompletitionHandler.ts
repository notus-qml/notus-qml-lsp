import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { MethodHandler } from "@core/handler/MethodHandler";

export class CompletitionHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/completion');
    }

    protected handleExecute(params: any, documentEngine: DocumentEngine): any {
        // ADD LOGIC HERE
        return null;
    }

}