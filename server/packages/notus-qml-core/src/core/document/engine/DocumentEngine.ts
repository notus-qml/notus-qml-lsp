import ASTEngine from "@/core/ast/engine/ASTEngine";
import { LineEndingsHelper } from "@/core/helper/LineEndingsHelper";
import { ASTNode, ASTTree, LspMethod, DocumentBody, DocumentURI, TextDocumentContentChangedEvent, ModuleContext } from "notus-qml-types";

export interface TextUpdated {
    startOffset: number;
    endOffset: number;
    text: string;
}

export default class DocumentEngine {

    private astEngine: ASTEngine;
    private documentsByURI: Map<DocumentURI, DocumentBody>;
    private lineEndingHelper: LineEndingsHelper;

    constructor(astEngine: ASTEngine) {
        this.astEngine = astEngine;
        this.documentsByURI = new Map();
        this.lineEndingHelper = new LineEndingsHelper();
    }

    getAstEngine(): ASTEngine {
        return this.astEngine;
    }

    getDocument(documentURI: DocumentURI): string | null {
        return this.documentsByURI.get(documentURI) ?? null;
    }

    hasDocument(documentURI: DocumentURI): boolean {
        return this.documentsByURI.has(documentURI);
    }

    updateDocument(documentURI: DocumentURI, changes: TextDocumentContentChangedEvent[]) {

        const hasDocument: boolean = this.hasDocument(documentURI);

        if (!hasDocument) {
            return null;
        }

        for (const change of changes) {

            const oldText = this.documentsByURI.get(documentURI) as string

            this.lineEndingHelper.process(oldText);

            const startOffset = this.lineEndingHelper.positionToOffset(change.range.start.line, change.range.start.character);
            const endOffset = this.lineEndingHelper.positionToOffset(change.range.end.line, change.range.end.character);

            const newText = oldText.slice(0, startOffset) + change.text + oldText.slice(endOffset);

            const textUpdated = {
                startOffset: startOffset,
                endOffset: endOffset,
                text: newText
            } as TextUpdated

            this.astEngine.updateTree(documentURI, change, textUpdated)
            this.documentsByURI.set(documentURI, newText);

        }

    };

    setDocument(documentURI: DocumentURI, documentBody: DocumentBody) {
        this.documentsByURI.set(documentURI, documentBody);
        this.astEngine.setTree(documentURI, this.astEngine.parse(documentBody));
    }

    parse(code: string): ASTTree {
        return this.astEngine.parse(code);
    }

    analyze(node: ASTNode) {
        this.astEngine.analyze(node);
    }

    setMethod(methodName: LspMethod, context: ModuleContext): void {
        this.astEngine.setMethod(methodName, context);
    }

    positionToOffset(line: number, character: number, lines: string[]): number {

        let offset = 0;

        for (let i = 0; i < line; i++) {
            offset += lines[i].length + 2; // +1 por causa do \r\n
        }

        return offset + character;

    };

}