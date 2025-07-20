import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class FormattingHandler extends MethodHandler<any, any> {

    constructor() {
        super(LspMethod.Formatting);
    }

    protected async handleExecute(params: any, documentEngine: DocumentEngine): Promise<any> {
        // ADD LOGIC HERE
        return null;
    }

} 