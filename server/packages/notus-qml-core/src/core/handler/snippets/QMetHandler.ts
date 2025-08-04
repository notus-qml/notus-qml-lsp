import { logger } from '@/core/logger/Logger';
import { CompletionItem, CompletionItemKind, CompletionParams, InsertTextFormat } from 'notus-qml-types';
const { TemplateEngine } = require('qmet');

export default class QMetHandler {

    private templateEngine: any;

    private readonly regex = /^(\d*\*?[a-zA-Z_][a-zA-Z0-9_]{2,})([+>](\d*\*?[a-zA-Z_][a-zA-Z0-9_]{2,}))*$/;

    constructor() {
        this.templateEngine = new TemplateEngine();
    }

    isValid(query: string): boolean {
        return this.regex.test(query);
    }

    handle(params: CompletionParams, query: string): CompletionItem[] {

        const result = this.templateEngine.handle(query);

        logger.info("QMetHandler", "result", result);

        const items = [
            {
                label: query,
                detail: `Snippet: ${query}`,
                kind: CompletionItemKind.Snippet,
                insertTextFormat: InsertTextFormat.Snippet,
                textEdit: {
                    newText: result,
                    range: {
                        start: {
                            line: params.position.line,
                            character: params.position.character - query.length
                        },
                        end: {
                            line: params.position.line,
                            character: params.position.character
                        }
                    }
                }
            }
        ]

        return items;

    }

}
