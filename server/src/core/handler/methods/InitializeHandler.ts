import { InitializeResultBuilder } from "@core/builder/methods/InitializeBuilder";
import { MethodHandler } from "@core/handler/MethodHandler"
import { TextDocumentSyncKind } from "@/types/lsp/document.types";
import Application from "@core/singleton/Application";
import { InitializeParams, InitializeResult } from "@/types/lsp/initialize.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { logger } from "@core/logger/Logger";
import ProjectConfigHelper from "@/core/helper/ProjectConfigHelper";
import { LspMethod } from "@/types/core.types";
import SnippetsConfigHelper from "@/core/helper/SnippetsConfigHelper";
import DocumentEngine from "@/core/document/engine/DocumentEngine";

export class InitializeHandler extends MethodHandler<RequestMessage, InitializeResult> {

    constructor() {
        super(LspMethod.Initialize)
        logger.debug('InitializeHandler', 'Constructor called');
    }

    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<InitializeResult> {

        logger.debug('InitializeHandler', 'handleExecute called', { request });

        try {

            const params = request.params as InitializeParams;

            const settings = ProjectConfigHelper.load(params.rootUri);
            const snippets = await SnippetsConfigHelper.load(params.rootUri);

            Application.setConfigs(settings);
            Application.setSnippets(snippets);

            documentEngine.getAstEngine().setLspConfig(settings);

            const result = new InitializeResultBuilder()
                .enableDiagnostics(Application.name)
                .enableFormatting()
                .enableCodeActions()
                .enableCompletion()
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