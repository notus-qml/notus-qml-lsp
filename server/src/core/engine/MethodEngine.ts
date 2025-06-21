import { MethodRegistry } from "./MethodRegistry";
import { DiagnosticHandler } from "../handler/methods/DiagnosticHandler";
import { CompletitionHandler } from "../handler/methods/CompletitionHandler";
import { CodeActionHandler } from "../handler/methods/CodeActionHandler";
import { DidOpenHandler } from "../handler/methods/DidOpenHandler";
import { DidChangeHandler } from "../handler/methods/DidChangeHandler";
import { FormattingHandler } from "../handler/methods/FormattingHandler";
import { InitializeHandler } from "../handler/methods/InitializeHandler";
import { logger } from "../logger/Logger";

export class MethodEngine {

    private methodRegistry: MethodRegistry = new MethodRegistry();

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

    public execute(methodName: string, params: any): any {

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
            const result = handler.execute(params);
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