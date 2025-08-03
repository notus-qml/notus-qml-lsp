import { DiagnosticReportContext, ASTNodeFinder } from "notus-qml-core";
import { ASTNode, DiagnosticSeverity } from "notus-qml-types";

/** @type {import('../types/plugin').Plugin} */
module.exports = {
    handlers: {
        'property-definition-needs-prefix': {
            create: (context: DiagnosticReportContext) => ({
                ui_object_definition: (node: ASTNode) => {

                    // TODO Check the impact of creating an ASTNodeFinder every time
                    const finder = new ASTNodeFinder();

                    // TODO load from a file maybe?
                    const prefixByType = new Map<string, string>([
                        ["Rectangle", "rect"],
                        ["Text", "txt"],
                    ])

                    const objectType = finder.getObjectType(node);

                    if (!objectType) {
                        return;
                    }

                    if (!finder.hasBinding(node, "id")) {
                        return;
                    }

                    const prefix = prefixByType.get(objectType) ?? "";

                    if (prefix.length === 0) {
                        return;
                    }

                    const nodeId = finder.getBindingValue(node, "id");

                    if (!nodeId) {
                        return;
                    }

                    const hasPrefix = nodeId.text.startsWith(prefix);

                    if (hasPrefix) {
                        return;
                    }

                    context.report(
                        {
                            node: nodeId,
                            item: {
                                message: `Id needs prefix: ${prefix}`,
                                severity: DiagnosticSeverity.Warning
                            }
                        }
                    )

                }
            })
        }
    }
};
