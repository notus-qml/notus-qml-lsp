import { ASTNode } from "notus-qml-types";
import { ASTVisitor } from "./ASTVisitor";
import { CodeAnalyzer } from "@/core/utils/CodeAnalyzer";

export default class CompositeVisitor implements ASTVisitor {

    private visitors: ASTVisitor[];

    constructor() {
        this.visitors = [];
    }

    visit(node: ASTNode): void {
        this.visitors.forEach((visitor) => {
            visitor.visit(node)
        })
    }

    runByCode(codeAnalyzer: CodeAnalyzer): void {

        this.visitors.forEach((visitor) => {
            visitor?.runByCode?.(codeAnalyzer)
        })

    }

    addVisitor(visitor: ASTVisitor) {
        this.visitors.push(visitor)
    }
}