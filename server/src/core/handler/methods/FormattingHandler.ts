import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LineEndingsHelper } from "@/core/helper/LineEndingsHelper";
import { LspMethod } from "@/types/core.types";
import { DocumentFormattingParams, TextEdit } from "@/types/lsp/document.types";
import { RequestMessage } from "@/types/lsp/message.types";
import { MethodHandler } from "@core/handler/MethodHandler";
import ImportFormattingHandler from "../formatting/ImportFormattingHandler";
import { ASTTree } from "@/types/ast/ast.types";
import FunctionUtils from "@/core/utils/FunctionUtils";

export class FormattingHandler extends MethodHandler<RequestMessage, TextEdit[]> {

    private lineEndingHelper: LineEndingsHelper;
    private importFormattingHandler: ImportFormattingHandler;

    constructor() {
        super(LspMethod.Formatting);
        this.lineEndingHelper = new LineEndingsHelper()
        this.importFormattingHandler = new ImportFormattingHandler(this.lineEndingHelper);
    }

    private process(documentEngine: DocumentEngine, oldText: string, tree: ASTTree): string {

        const pipeline = FunctionUtils.pipeArgs(
            (documentEngine: DocumentEngine, oldText: string, tree: ASTTree) => {
                return this.importFormattingHandler.handle(documentEngine, oldText, tree)
            }
        )

        const result = pipeline(documentEngine, oldText, tree);

        return result as string;

    }

    protected async handleExecute(request: RequestMessage, documentEngine: DocumentEngine): Promise<TextEdit[]> {

        const params = request.params as DocumentFormattingParams;

        const oldText = documentEngine.getDocument(params.textDocument.uri);

        if (!oldText) {
            return [];
        }

        const tree = documentEngine.getAstEngine().getTree(params.textDocument.uri);

        if (!tree) {
            return [];
        }

        this.lineEndingHelper.process(oldText);

        const newText = this.process(documentEngine, oldText, tree);

        const nrLine = this.lineEndingHelper.nrLinesByDocument(newText);

        // TODO maybe change to incremental changes
        return [
            {
                range: {
                    start: { line: 0, character: 0 },
                    end: { line: nrLine, character: Number.MAX_SAFE_INTEGER }
                },
                newText: newText
            }
        ]
    }

} 