import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import { ASTNode } from "@/types/ast/ast.types";
import { DiagnosticSeverity } from "@/types/lsp/document.types";

/** @type {import('../types/plugin').Plugin} */
module.exports = {
    handlers: {
        'invalid-function-definition-rule': {
            create: (context: DiagnosticReportContext) => ({
                statement_block: (node: ASTNode) => {

                    if (node.hasError) {
                        return;
                    }

                    const parentType = node.parent?.type;

                    if (parentType === "arrow_function" || parentType === "function_expression") {
                        return;
                    }

                    context.report({
                        node: node,
                        item: {
                            message: "Dont use statement block, use arrow function or function definition !",
                            severity: DiagnosticSeverity.Warning,
                            suggestions: [
                                {
                                    title: "function() {}",
                                    items: [
                                        {
                                            newText: `function() ${node.text}`
                                        }
                                    ]
                                },
                                {
                                    title: "() => {}",
                                    items: [
                                        {
                                            newText: `() => ${node.text}`
                                        }
                                    ]
                                },
                            ]
                        }
                    });
                }
            })
        }
    }
};
