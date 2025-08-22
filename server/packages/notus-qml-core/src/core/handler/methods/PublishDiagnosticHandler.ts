import { DocumentURI, FullDocumentDiagnosticReport, LspConfig, LspMethod, ModuleContext, NotificationMessage, TextDocumentIdentifier } from "notus-qml-types";
import { MethodHandler } from "../MethodHandler";
import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import ModuleVisitor from "@/core/ast/visitor/ModuleVisitor";
import { DiagnosticRuleEngine } from "@/core/engine/module/DiagnosticRuleEngine";
import { DiagnosticPluginEngine } from "@/core/engine/module/DiagnosticPluginEngine";

// TODO refactor this class and DiagnosticHandler to have something in common, it's almost the same code
export class PublishDiagnosticHandler extends MethodHandler<NotificationMessage, NotificationMessage | null> {

    private context: ModuleContext;

    constructor() {
        super(LspMethod.PublishDiagnostics);
        this.context = new DiagnosticReportContext();
    }

    public initialize(documentEngine: DocumentEngine) {

        const lspConfig = documentEngine.getLspConfig();

        documentEngine.getAstEngine().addVisitor(new ModuleVisitor(new DiagnosticRuleEngine(this.context, lspConfig)))

        if (this.hasPlugins(lspConfig)) {
            documentEngine.getAstEngine().addVisitor(new ModuleVisitor(new DiagnosticPluginEngine(this.context, lspConfig)));
        }

    }

    hasPlugins(lspConfig: LspConfig) {
        return lspConfig.paths?.plugin !== '';
    }

    async handleDiagnostics(documentURI: DocumentURI, documentEngine: DocumentEngine): Promise<FullDocumentDiagnosticReport | null> {

        const diagnosticReportContext = this.context as DiagnosticReportContext;

        diagnosticReportContext.getBuilder().setDocumentURI(documentURI)

        const tree = documentEngine.getAstEngine().getTree(documentURI)

        if (!tree) {
            return null;
        }

        documentEngine.analyze(tree.rootNode);

        return diagnosticReportContext.result?.() as FullDocumentDiagnosticReport;

    }

    protected async handleExecute(notification: NotificationMessage, documentEngine: DocumentEngine): Promise<NotificationMessage | null> {

        const params = notification.params as { textDocument: TextDocumentIdentifier };

        const result = await this.handleDiagnostics(params.textDocument.uri, documentEngine);

        if (!result) {
            return null;
        }

        // TODO make a builder
        const publishDiagnostics: NotificationMessage = {
            jsonrpc: "2.0",
            method: this.methodName,
            params: {
                diagnostics: result.items,
                uri: params.textDocument.uri
            }
        }

        return publishDiagnostics;

    }

}