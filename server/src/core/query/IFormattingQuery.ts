import { ASTQueryMatch, ASTTree } from "@/types/ast/ast.types";
import DocumentEngine from "../document/engine/DocumentEngine";

export interface IFormattingQuery {
    imports(documentEngine: DocumentEngine, tree: ASTTree): ASTQueryMatch[];
}