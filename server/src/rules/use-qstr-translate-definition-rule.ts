import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";
import { ASTNode } from "@/types/ast/ast.types";
import { DiagnosticSeverity } from "@/types/lsp/document.types";
import { ASTNodeFinder } from "@/core/ast/finder/ASTNodeFinder";

// Ignora números, chaves internas, nomes técnicos
function isHumanLike(str: string): boolean {

    if (!/^[\w\s.,!?'"-]+$/.test(str)) {
        return false
    };

    if (str.match(/^[_\w]+\.[_\w]+$/)) {
        return false
    };

    return /[a-zA-Z]{2,}/.test(str); // contém palavras reais
}

/** @type {import('../types/rule').Rule} */
module.exports = {
    handlers: {
        'use-qstr-translate-definition-rule': {
            create: (context: DiagnosticReportContext) => ({
                ui_object_definition: (node: ASTNode) => {

                    const finder = new ASTNodeFinder();

                    const typesApplyRule: string[] = ['text', 'label'];
                    const objectType = finder.getObjectType(node);

                    if (!objectType) {
                        return;
                    }

                    if (!typesApplyRule.includes(objectType.toLowerCase())) {
                        return;
                    }

                    const textNode = finder.findBindingByName(node, "text");

                    if (!textNode) {
                        return;
                    }

                    const stringNode = finder.findNestedDescendantByType(textNode, ["expression_statement", "string"])

                    if (!stringNode) {
                        return;
                    }

                    const functionNode = finder.findNestedDescendantByType(textNode, ["call_expression", "identifier"])

                    if (functionNode && functionNode.text.toLowerCase() === 'qstr') {
                        return;
                    }

                    if (!isHumanLike(stringNode.text)) {
                        return;
                    }

                    context.report({
                        node: stringNode,
                        item: {
                            message: "Use qsTr on strings",
                            severity: DiagnosticSeverity.Warning,
                            suggestions: [
                                {
                                    title: `qsTr(${stringNode.text})`,
                                    items: [
                                        {
                                            newText: `qsTr(${stringNode.text})`
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
