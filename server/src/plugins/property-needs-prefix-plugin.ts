import { DiagnosticReportContext, ASTNodeFinder } from "notus-qml-core";
import { ASTNode, DiagnosticSeverity } from "notus-qml-types";

/** @type {import('../types/plugin').Plugin} */
module.exports = {
    handlers: {
        'property-needs-prefix': {
            create: (context: DiagnosticReportContext) => ({
                ui_property: (node: ASTNode) => {
                    const finder = new ASTNodeFinder();

                    const nameNode = finder.findChildByType(node, 'identifier');

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
                            severity: DiagnosticSeverity.Warning,
                            suggestions: [
                                {
                                    title: "Add '_' prefix on property",
                                    items: [
                                        {
                                            newText: `_${nameNode.text}`
                                        }
                                    ]
                                },
                                {
                                    title: "Add 'v' prefix on property",
                                    items: [
                                        {
                                            newText: `v${nameNode.text[0].toUpperCase() + nameNode.text.slice(1)}`
                                        }
                                    ]
                                }
                            ]
                        }
                    });
                }
            })
        }
    }
};
