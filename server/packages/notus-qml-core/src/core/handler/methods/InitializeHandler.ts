import { InitializeResultBuilder } from "@core/builder/methods/InitializeBuilder";
import { MethodHandler } from "@core/handler/MethodHandler"
import { TextDocumentSyncKind, InitializeParams, InitializeResult, RequestMessage, LspMethod, ClientCapabilities } from "notus-qml-types";
import Application from "@core/singleton/Application";
import { logger } from "@core/logger/Logger";
import ProjectConfigHelper from "@/core/helper/ProjectConfigHelper";
import SnippetsConfigHelper from "@/core/helper/SnippetsConfigHelper";
import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { MethodRegistry } from "@/core/engine/MethodRegistry";

export class InitializeHandler extends MethodHandler<RequestMessage, InitializeResult> {

    private methodRegistry: MethodRegistry;

    constructor(methodRegistry: MethodRegistry) {
        super(LspMethod.Initialize)
        this.methodRegistry = methodRegistry;
        logger.debug('InitializeHandler', 'Constructor called');
    }

    private configureDignosticNotification() {

        this.methodRegistry.getHandler(LspMethod.DidOpen)?.addNotification(this.methodRegistry.getHandler(LspMethod.PublishDiagnostics))
        this.methodRegistry.getHandler(LspMethod.DidChange)?.addNotification(this.methodRegistry.getHandler(LspMethod.PublishDiagnostics))

    }

    private adjustCapabilitys(capabilities: ClientCapabilities) {

        this.withCapability(capabilities, "textDocument.diagnostic",
            () => logger.info("InitializeHandler", "adjustCapabilitys client request diagnostics"),
            () => this.configureDignosticNotification()
        );

    }

    withCapability<T extends keyof any>(
        capabilities: ClientCapabilities,
        path: string,
        foundCallback: () => void,
        notFoundCallback: () => void = () => { },
    ) {
        const parts = path.split(".");
        let current: any = capabilities;

        for (const part of parts) {

            if (current && part in current) {
                current = current[part];
                continue;
            }

            notFoundCallback()

            return;
        }

        foundCallback();
    }

    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<InitializeResult> {

        logger.debug('InitializeHandler', 'handleExecute called', { request });

        try {

            const params = request.params as InitializeParams;

            const settings = ProjectConfigHelper.load(params.rootUri, params.workspaceFolders);
            const snippets = await SnippetsConfigHelper.load(params.rootUri);

            logger.info('InitializeHandler', 'handleExecute settings', settings);

            Application.setConfigs(settings);
            Application.setSnippets(snippets);

            documentEngine.getAstEngine().setLspConfig(settings);

            this.adjustCapabilitys(params.capabilities);

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