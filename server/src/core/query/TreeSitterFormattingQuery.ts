import { ASTQueryMatch, ASTTree } from "@/types/ast/ast.types";
import { IFormattingQuery } from "./IFormattingQuery";
import DocumentEngine from "../document/engine/DocumentEngine";

export default class TreeSitterFormattingQuery implements IFormattingQuery {

    imports(documentEngine: DocumentEngine, tree: ASTTree): ASTQueryMatch[] {
        return documentEngine.getAstEngine().query(tree.rootNode,
            `
            (ui_import
            source: (_) @identifier
            version: (ui_version_specifier)? @version)
            `
        )
    }

}