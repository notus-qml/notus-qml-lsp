import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { MethodHandler } from "@core/handler/MethodHandler";

export class CodeActionHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/codeAction');
    }

    protected handleExecute(params: any, documentEngine: DocumentEngine): any {
        // ADD LOGIC HERE
        return null;
    }

}