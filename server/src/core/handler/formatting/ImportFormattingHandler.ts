import DocumentEngine from "@/core/document/engine/DocumentEngine";
import { LineEndingsHelper } from "@/core/helper/LineEndingsHelper";
import { IFormattingQuery } from "@/core/query/IFormattingQuery";
import TreeSitterFormattingQuery from "@/core/query/TreeSitterFormattingQuery";
import Application from "@/core/singleton/Application";
import { ASTQueryMatch, ASTTree } from "@/types/ast/ast.types";
import { FormattingImportGroupConfig } from "@/types/core.types";

type ListOrdered = Record<number, ASTQueryMatch[]>

const VERSION: number = 1;
const IDENTIFIER: number = 0;

export default class ImportFormattingHandler {

    private lineEndingHelper: LineEndingsHelper;
    private formattingQuery: IFormattingQuery;

    constructor(lineEndingHelper: LineEndingsHelper) {
        this.lineEndingHelper = lineEndingHelper;
        this.formattingQuery = new TreeSitterFormattingQuery();
    }

    handle(documentEngine: DocumentEngine, oldText: string, tree: ASTTree): string {

        const groups = Application.configs?.formatting;

        if (!groups) {
            return "";
        }

        const matches = this.formattingQuery.imports(documentEngine, tree);

        if (matches.length <= 1) {
            return "";
        }

        const replaceEndOffset = this.endOffsetImports(matches);

        let listOrdered: ListOrdered = {};

        groups.forEach((group: FormattingImportGroupConfig, indexGroup: number) => {
            this.orderGroups(group, matches, listOrdered, indexGroup);
        })

        let result = this.applyGroups(listOrdered);

        // TODO when a line did not have a departure, but it was between imports, it was being lost
        const newText = result + oldText?.slice(replaceEndOffset, oldText.length);

        return newText;

    }

    endOffsetImports(matches: ASTQueryMatch[]) {

        const lastElement = matches.at(matches.length - 1)

        const hasVersion = lastElement!.captures[VERSION];

        const replaceEndOffset = lastElement!.captures[hasVersion ? VERSION : IDENTIFIER]!.node.endIndex + this.lineEndingHelper.sizeLineEnding();

        return replaceEndOffset;
    }

    orderGroups(group: FormattingImportGroupConfig, matches: ASTQueryMatch[], listOrdered: ListOrdered, indexGroup: number): void {

        for (let index = matches.length - 1; index >= 0; index--) {

            if (this.hasRegexMatch(group, matches[index])) {

                if (listOrdered[indexGroup]) {
                    listOrdered[indexGroup].push(matches[index])
                } else {
                    listOrdered[indexGroup] = [matches[index]]
                }

                matches.splice(index, 1);
                continue;
            }
        }
    }

    hasRegexMatch(group: FormattingImportGroupConfig, capture: ASTQueryMatch): boolean {

        if (!group?.regex) {
            return false;
        }

        const identifier = capture.captures[IDENTIFIER].node.text as string;

        const hasMatch = identifier.match(group.regex) !== null;

        return hasMatch;

    }

    sortByAlphabeticalOrder(values: ASTQueryMatch[]) {
        return values.sort((first, second) => {
            return first.captures[IDENTIFIER].node.text.localeCompare(
                second.captures[IDENTIFIER].node.text,
                'pt',
                { sensitivity: 'base' }
            );
        });
    }

    applyGroups(listOrdered: ListOrdered): string {
        const allLines: string[] = [];

        Object.entries(listOrdered).forEach(([key, value]) => {

            const sorted = this.sortByAlphabeticalOrder(value)

            sorted.forEach((current) => {
                const text = current.captures[IDENTIFIER].node.parent?.text ?? "";
                allLines.push(text);
            });
        });

        // TODO When there is a line break at the end of the import, two empty lines are duplicated when saving.
        return allLines.join(this.lineEndingHelper.lineEnding) + this.lineEndingHelper.lineEnding;
    }

}