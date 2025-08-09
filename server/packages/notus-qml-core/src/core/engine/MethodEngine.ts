import { MethodRegistry } from "./MethodRegistry";
import { DiagnosticHandler } from "@core/handler/methods/DiagnosticHandler";
import { CompletitionHandler } from "@core/handler/methods/CompletitionHandler";
import { CodeActionHandler } from "@core/handler/methods/CodeActionHandler";
import { DidOpenHandler } from "@core/handler/methods/DidOpenHandler";
import { DidChangeHandler } from "@core/handler/methods/DidChangeHandler";
import { FormattingHandler } from "@core/handler/methods/FormattingHandler";
import { InitializeHandler } from "@core/handler/methods/InitializeHandler";
import { logger } from "@core/logger/Logger";
import DocumentEngine from "../document/engine/DocumentEngine";
import TreeSitterEngine from "../ast/engine/TreeSitterEngine";

export class MethodEngine {

    private methodRegistry: MethodRegistry = new MethodRegistry();
    private documentEngine: DocumentEngine = new DocumentEngine(new TreeSitterEngine());

    constructor() {

        this.methodRegistry.register('initialize', new InitializeHandler());
        this.methodRegistry.register("textDocument/diagnostic", new DiagnosticHandler());
        this.methodRegistry.register("textDocument/completion", new CompletitionHandler());
        this.methodRegistry.register("textDocument/codeAction", new CodeActionHandler());
        this.methodRegistry.register("textDocument/didOpen", new DidOpenHandler());
        this.methodRegistry.register("textDocument/didChange", new DidChangeHandler());
        this.methodRegistry.register("textDocument/formatting", new FormattingHandler());

        const registeredMethods = [
            'initialize',
            "textDocument/diagnostic",
            "textDocument/completion",
            "textDocument/codeAction",
            "textDocument/didOpen",
            "textDocument/didChange",
            "textDocument/formatting"
        ];

        logger.info('MethodEngine', 'Registered methods', { methods: registeredMethods });
    }

    public async execute(methodName: string, params: any): Promise<any> {

        logger.info('MethodEngine', 'Executing method', { method: methodName });

        const handler = this.methodRegistry.getHandler(methodName);

        if (!handler) {
            logger.error('MethodEngine', 'Handler not found for method', {
                method: methodName,
                availableMethods: [
                    'initialize',
                    "textDocument/diagnostic",
                    "textDocument/completion",
                    "textDocument/codeAction",
                    "textDocument/didOpen",
                    "textDocument/didChange",
                    "textDocument/formatting"
                ]
            });
            throw new Error(`Handler for method ${methodName} not found`);
        }

        logger.debug('MethodEngine', 'Handler found for method', {
            method: methodName,
            handlerType: handler.constructor.name
        });

        try {
            const result = await handler.execute(params, this.documentEngine);
            logger.debug('MethodEngine', 'Handler executed successfully', {
                method: methodName,
                result
            });
            return result;
        } catch (error) {
            logger.error('MethodEngine', 'Error executing handler', {
                method: methodName,
                error
            });
            throw error;
        }
    }

}