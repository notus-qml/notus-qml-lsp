import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";
import { CodeAction, CodeActionParams, Diagnostic } from "@/types/lsp/document.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class CodeActionHandler extends MethodHandler<RequestMessage, CodeAction[]> {

    constructor() {
        super(LspMethod.CodeAction);
    }

    protected handleExecute(request: RequestMessage, documentEngine: DocumentEngine): CodeAction[] {

        const params = request.params as CodeActionParams;

        const suggestions = params.context.diagnostics.flatMap((diagnostic: Diagnostic) => {
            return diagnostic.data?.suggestions;
        }) as CodeAction[];

        return suggestions;
    }

}