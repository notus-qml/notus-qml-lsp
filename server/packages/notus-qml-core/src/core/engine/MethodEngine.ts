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
import { PublishDiagnosticHandler } from "../handler/methods/PublishDiagnosticHandler";
import { LspMethod } from "notus-qml-types";

export class MethodEngine {

    private methodRegistry: MethodRegistry = new MethodRegistry();
    private documentEngine: DocumentEngine = new DocumentEngine(new TreeSitterEngine());

    constructor() {

        this.methodRegistry.register(LspMethod.Initialize, new InitializeHandler(this.methodRegistry));
        this.methodRegistry.register(LspMethod.DidOpen, new DidOpenHandler());
        this.methodRegistry.register(LspMethod.DidChange, new DidChangeHandler());
        this.methodRegistry.register(LspMethod.Diagnostic, new DiagnosticHandler());
        this.methodRegistry.register(LspMethod.Completion, new CompletitionHandler());
        this.methodRegistry.register(LspMethod.CodeAction, new CodeActionHandler());
        this.methodRegistry.register(LspMethod.Formatting, new FormattingHandler());
        this.methodRegistry.register(LspMethod.PublishDiagnostics, new PublishDiagnosticHandler());

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

    public async *notifications(methodName: string, params: any): AsyncGenerator<any, void, unknown> {

        const handler = this.methodRegistry.getHandler(methodName);

        if (!handler) {
            throw new Error(`Handler for method ${methodName} not found`);
        }

        const notifications = handler.notifications();

        if (notifications.length === 0) {
            return;
        }

        const results = await Promise.all(notifications.map((notification) => {
            return notification.execute(params, this.documentEngine)
        }));

        for (const result of results) {
            yield result;
        }
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