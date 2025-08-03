import "module-alias/register"

import TreeSitterEngine from "@/core/ast/engine/TreeSitterEngine";
import DocumentEngine from "./DocumentEngine";
import { ASTTree, LspMethod } from "notus-qml-types";
import { DiagnosticReportContext } from "@/core/context/DiagnosticReportContext";

const test = new DocumentEngine(new TreeSitterEngine());

const tree: ASTTree = test.parse(`
import QtQuick

Window {
    id: root
    width: 200
    height: 100
    visible: true

    Text {
        id: root
        anchors.centerIn: parent
        text: "Hello, World!"
    }
}
`)

console.log("test")

const context = new DiagnosticReportContext()

test.setMethod(LspMethod.Diagnostic, context)
test.analyze(tree.rootNode);

console.log(context.result())


