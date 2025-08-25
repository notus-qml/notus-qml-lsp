import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LspMethod, DocumentDiagnosticParams, FullDocumentDiagnosticReport, RequestMessage, ModuleContext, LspConfig, DocumentURI } from "notus-qml-types";
import { MethodHandler } from "@core/handler/MethodHandler";
import { DiagnosticPluginEngine } from "@/core/engine/module/DiagnosticPluginEngine";
import { DiagnosticRuleEngine } from "@/core/engine/module/DiagnosticRuleEngine";
import ModuleVisitor from "@/core/ast/visitor/ModuleVisitor";

export class DiagnosticHandler extends MethodHandler<RequestMessage, FullDocumentDiagnosticReport | null> {

    private context: ModuleContext;

    constructor() {
        super(LspMethod.Diagnostic);
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

        return diagnosticReportContext.result() as FullDocumentDiagnosticReport;

    }

    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<FullDocumentDiagnosticReport | null> {

        const params = request.params as DocumentDiagnosticParams;

        return this.handleDiagnostics(params.textDocument.uri, documentEngine);
    }

}