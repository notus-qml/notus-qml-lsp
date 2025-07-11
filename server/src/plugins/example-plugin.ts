import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import { ASTNode } from "@/types/ast/ast.types";

/** @type {import('../types/plugin').Plugin} */
module.exports = {
    handlers: {
        'no-var': {
            create: (context: DiagnosticReportContext) => ({
                ui_property: (node: ASTNode) => {
                    context.report({
                        node: node.children[1],
                        item: {
                            message: "This something wrong"
                        }
                    });
                }
            })
        }
    }
};
