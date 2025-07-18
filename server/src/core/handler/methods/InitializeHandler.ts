import { InitializeResultBuilder } from "@core/builder/methods/InitializeBuilder";
import { MethodHandler } from "@core/handler/MethodHandler"
import { TextDocumentSyncKind } from "@/types/lsp/document.types";
import Application from "@core/singleton/Application";
import { InitializeParams, InitializeResult } from "@/types/lsp/initialize.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { logger } from "@core/logger/Logger";
import ProjectConfigHelper from "@/core/helper/ProjectConfigHelper";
import { LspMethod } from "@/types/core.types";

export class InitializeHandler extends MethodHandler<RequestMessage, InitializeResult> {

    constructor() {
        super(LspMethod.Initialize)
        logger.debug('InitializeHandler', 'Constructor called');
    }

    protected handleExecute(request: RequestMessage): InitializeResult {

        logger.debug('InitializeHandler', 'handleExecute called', { request });

        try {

            const params = request.params as InitializeParams;

            const settings = ProjectConfigHelper.load(params.rootUri);

            Application.setConfigs(settings);

            const result = new InitializeResultBuilder()
                .enableDiagnostics(Application.name)
                .enableFormatting()
                .enableCodeActions()
                .setTextDocumentSync(TextDocumentSyncKind.Incremental)
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