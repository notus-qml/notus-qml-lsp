import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import { ASTNode } from "@/types/ast/ast.types";
import { DiagnosticSeverity } from "@/types/lsp/document.types";
import { ASTNodeFinder } from "@/core/ast/finder/ASTNodeFinder";

/** @type {import('../types/plugin').Plugin} */
module.exports = {
    handlers: {
        'property-needs-prefix': {
            create: (context: DiagnosticReportContext) => ({
                ui_property: (node: ASTNode) => {
                    const finder = new ASTNodeFinder(node);

                    const nameNode = finder.findChildByType('identifier');

                    if (!nameNode) {
                        return;
                    }

                    const hasPrefix = nameNode.text.startsWith("_") || nameNode.text.startsWith("v");

                    if (hasPrefix) {
                        return;
                    }

                    context.report({
                        node: nameNode,
                        item: {
                            message: "Property name needs a prefix!",
                            severity: DiagnosticSeverity.Warning
                        }
                    });
                }
            })
        }
    }
};
