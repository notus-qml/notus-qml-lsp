import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class CompletitionHandler extends MethodHandler<any, any> {

    constructor() {
        super(LspMethod.Completion);
    }

    protected handleExecute(params: any, documentEngine: DocumentEngine): any {
        // ADD LOGIC HERE
        return null;
    }

}