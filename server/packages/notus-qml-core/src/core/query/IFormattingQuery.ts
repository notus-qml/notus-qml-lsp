import { ASTQueryMatch, ASTTree } from "notus-qml-types";
import DocumentEngine from "../document/engine/DocumentEngine";

export interface IFormattingQuery {
    imports(documentEngine: DocumentEngine, tree: ASTTree): ASTQueryMatch[];
}