import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { MethodHandler } from "@core/handler/MethodHandler";

export class FormattingHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/formatting');
    }

    protected handleExecute(params: any, documentEngine: DocumentEngine): any {
        // ADD LOGIC HERE
        return null;
    }

} 