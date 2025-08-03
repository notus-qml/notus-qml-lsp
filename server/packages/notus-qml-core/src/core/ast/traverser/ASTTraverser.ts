import { ASTNode } from "notus-qml-types";
import { ASTVisitor } from "../visitor/ASTVisitor";

export class ASTTraverser {


    preOrder(node: ASTNode, visitor: ASTVisitor): void {

        if (!visitor) {
            return;
        }

        visitor.enterNode?.(node)

        visitor.visit(node);

        node.children.forEach((childrenNode: ASTNode) => {
            this.preOrder(childrenNode, visitor);
        })

        visitor.exitNode?.(node);

    }

    postOrder(node: ASTNode, visitor: ASTVisitor): void {

        if (!visitor) {
            return;
        }

        visitor.enterNode?.(node)

        node.children.forEach((childrenNode: ASTNode) => {
            this.postOrder(childrenNode, visitor);
        })

        visitor.visit(node);

        visitor.exitNode?.(node);

    }

}

