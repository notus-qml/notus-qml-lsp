import "module-alias/register"

import TreeSitterEngine from "@/core/ast/engine/TreeSitterEngine";
import DocumentEngine from "./DocumentEngine";
import { ASTTree } from "@/types/ast/ast.types";
import { DiagnosticContext } from "@/core/context/DiagnosticContext";

const test = new DocumentEngine(new TreeSitterEngine());

const tree: ASTTree = test.parse(`
import QtQuick

Window {
    id: root
    width: 200
    height: 100
    color: isRed ? "red" : "blue"
    visible: true

    property bool isRed: true  // Track the color state

    Text {
        anchors.centerIn: parent
        text: "Hello, World!"
    }

    TapHandler {
        onTapped: root.isRed = !root.isRed  // Toggle state
    }
}
`)

console.log("test")

const context = new DiagnosticContext()

test.setMethod("textDocument/diagnostic", context)
test.analyze(tree.rootNode);

console.log(context.result())


