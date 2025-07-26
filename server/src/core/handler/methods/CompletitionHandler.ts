import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";
import { CompletionItem, CompletionList, CompletionParams } from "@/types/lsp/document.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";
import SnippetsHandler from "../snippets/SnippetsHandler";
import QMetHandler from "../snippets/QMetHandler";

export class CompletitionHandler extends MethodHandler<RequestMessage, CompletionList | null> {

    private snippetsHandler: SnippetsHandler;
    private qmetHandler: QMetHandler;

    constructor() {
        super(LspMethod.Completion);
        this.snippetsHandler = new SnippetsHandler();
        this.qmetHandler = new QMetHandler();
    }

    private getCurrentPrefix(params: CompletionParams, document: string) {
        const currentLine = document?.split("\n")[params.position.line]
        const lineUntilCursor = currentLine.slice(0, params.position.character);
        const currentPrefix = lineUntilCursor.trim();
        return currentPrefix;
    }

    // TODO In the future, migrate this to each snippet handler extension that is a node project, as an extension.
    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<CompletionList | null> {

        const params = request.params as CompletionParams;
        const document = documentEngine.getDocument(params.textDocument.uri);

        if (!document) {
            return null;
        }

        const currentPrefix = this.getCurrentPrefix(params, document);

        var items: CompletionItem[] = [];

        if (this.qmetHandler.isValid(currentPrefix)) {
            items = this.qmetHandler.handle(params, currentPrefix);
        }

        const snippetsComplete = this.snippetsHandler.handle(params, currentPrefix);

        if (snippetsComplete) {
            items = [...items, ...snippetsComplete]
        }

        if (items.length > 0) {

            return {
                isIncomplete: false,
                items
            };

        }

        return {
            isIncomplete: false,
            items: []
        }
    }

}