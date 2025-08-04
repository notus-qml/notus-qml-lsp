import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod, CodeActionParams, Diagnostic, RequestMessage, CodeAction } from "notus-qml-types";
import { MethodHandler } from "@core/handler/MethodHandler";

export class CodeActionHandler extends MethodHandler<RequestMessage, CodeAction[]> {

    constructor() {
        super(LspMethod.CodeAction);
    }

    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<CodeAction[]> {

        const params = request.params as CodeActionParams;

        const suggestions = params.context.diagnostics.flatMap((diagnostic: Diagnostic) => {
            return diagnostic.data?.suggestions;
        }) as CodeAction[];

        return suggestions;
    }

}