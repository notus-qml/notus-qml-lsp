import { DiagnosticContext } from "@/core/context/DiagnosticContext";
import { ASTNode } from "@/types/ast/ast.types";

/** @type {import('../types/plugin').Plugin} */
module.exports = {
    handlers: {
        'no-var': {
            create: (context: DiagnosticContext) => ({
                ui_property: (node: ASTNode) => {
                    context.report({
                        range: {
                            start: {
                                line: node.startPosition.row,
                                character: node.startPosition.column
                            },
                            end: {
                                line: node.endPosition.row,
                                character: node.endPosition.column
                            }
                        },
                        message: "This something wrong"
                    });
                }
            })
        }
    }
};
