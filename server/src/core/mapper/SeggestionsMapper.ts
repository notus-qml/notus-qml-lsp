import { CodeAction, DocumentURI, LSPRange, TextEdit } from "@/types/lsp/document.types";
import { CodeActionEditReportContext, CodeActionReportContext } from "@/types/report/report.types";

export default class SuggetionsMapper {

    static fromContexts(suggetionContexts: CodeActionReportContext[] | undefined, documentURI: DocumentURI, range: LSPRange) {

        if (!suggetionContexts) {
            return [];
        }

        return suggetionContexts.map((suggestionContext) => {
            return SuggetionsMapper.fromContext(suggestionContext, documentURI, range);
        })
    }

    static fromContext(suggetionContext: CodeActionReportContext, documentURI: DocumentURI, range: LSPRange): CodeAction {
        return {
            title: suggetionContext.title,
            kind: suggetionContext.kind ?? "quickfix",
            edit: {
                changes: {
                    [documentURI]: suggetionContext.items.map((item: CodeActionEditReportContext): TextEdit => {
                        return {
                            range: range,
                            newText: item.newText
                        }
                    })
                }
            }
        }
    }

}