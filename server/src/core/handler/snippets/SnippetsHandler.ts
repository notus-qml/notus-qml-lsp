import Application from "@/core/singleton/Application";
import { SnippetBody, SnippetsByPrefix } from "@/types/core.types";
import { CompletionItemKind, CompletionList, CompletionParams, InsertTextFormat } from "@/types/lsp/document.types";

export default class SnippetsHandler {

    private snippetsByPrefix: SnippetsByPrefix | null;

    constructor() {
        this.snippetsByPrefix = null;
    }

    private bindSnippets(): boolean {

        if (this.snippetsByPrefix) {
            return true;
        }

        const snippets = Application.getSnippets();

        if (!snippets) {
            return false;
        }

        this.snippetsByPrefix = {};

        for (const [key, value] of Object.entries(snippets)) {
            const prefix = value.prefix;

            if (!this.snippetsByPrefix[prefix]) {
                this.snippetsByPrefix[prefix] = {};
            }

            this.snippetsByPrefix[prefix][key] = value;
        }

        return true;

    }

    handle(params: CompletionParams, prefix: string): CompletionList | null {

        if (!this.bindSnippets()) {
            return null;
        }

        const snippet = this.snippetsByPrefix?.[prefix] ?? null;

        if (!snippet) {
            return null;
        }

        const [key, snippetData]: [string, SnippetBody] = Object.entries(snippet)[0];

        const completionList: CompletionList = {
            isIncomplete: false,
            items: [
                {
                    label: prefix,
                    detail: `Snippet: ${key}, snippetData.description`,
                    kind: CompletionItemKind.Snippet,
                    insertTextFormat: InsertTextFormat.Snippet,
                    textEdit: {
                        newText: snippetData.body.join("\n"),
                        range: {
                            start: {
                                line: params.position.line,
                                character: params.position.character - prefix.length
                            },
                            end: {
                                line: params.position.line,
                                character: params.position.character
                            }
                        }
                    }
                }
            ]
        };

        return completionList;

    };

}