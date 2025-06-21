import { InitializeResultBuilder } from "../../builder/methods/InitializeBuilder";
import { MethodHandler } from "../MethodHandler"
import { TextDocumentSyncKind } from "../../../types/lsp/document.types";
import Application from "../../singleton/Application";
import { InitializeResult } from "../../../types/lsp/initialize.types";
import { RequestMessage } from "../../../types/lsp/message.types";
import { logger } from "../../logger/Logger";

export class InitializeHandler extends MethodHandler<RequestMessage, InitializeResult> {

    constructor() {
        super('initialize')
        logger.debug('InitializeHandler', 'Constructor called');
    }

    protected handleExecute(params: RequestMessage): InitializeResult {
        logger.debug('InitializeHandler', 'handleExecute called', { params });

        try {
            const result = new InitializeResultBuilder()
                .enableDiagnostics(Application.name)
                .enableFormatting()
                .enableCodeActions()
                .setTextDocumentSync(TextDocumentSyncKind.Full)
                .setServerInfo(Application.name, Application.version)
                .build();

            logger.debug('InitializeHandler', 'Result built successfully', { result });

            return result;

        } catch (error) {

            logger.error('InitializeHandler', 'Error building result', error);

            throw error;
        }
    }
}