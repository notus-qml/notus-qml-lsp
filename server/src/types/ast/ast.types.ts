export interface Point {
    row: number;
    column: number;
}

export interface Range {
    startPosition: Point;
    endPosition: Point;
    startIndex: number;
    endIndex: number;
}

export interface ASTNode {
    readonly id: number;
    readonly type: string;
    readonly isNamed: boolean;
    readonly text: string;
    readonly value: string;
    readonly name: string;

    readonly startPosition: Point;
    readonly endPosition: Point;
    readonly startIndex: number;
    readonly endIndex: number;

    readonly parent: ASTNode | null;
    readonly children: ReadonlyArray<ASTNode>;
    readonly namedChildren: ReadonlyArray<ASTNode>;

    firstChild: ASTNode | null;
    firstNamedChild: ASTNode | null;
    lastChild: ASTNode | null;
    lastNamedChild: ASTNode | null;
    nextSibling: ASTNode | null;
    nextNamedSibling: ASTNode | null;
    previousSibling: ASTNode | null;
    previousNamedSibling: ASTNode | null;

    child(index: number): ASTNode | null;
    namedChild(index: number): ASTNode | null;
    childCount: number;

    hasError(): boolean;
    hasChanges(): boolean;

    isMissing(): boolean;
    equals(other: ASTNode): boolean;
}

export type Edit = {
    startIndex: number;
    oldEndIndex: number;
    newEndIndex: number;
    startPosition: Point;
    oldEndPosition: Point;
    newEndPosition: Point;
};

export interface ASTTree {

    readonly rootNode: ASTNode;

    rootNodeWithOffset(offsetBytes: number, offsetExtent: Point): ASTNode;
    edit(edit: Edit): ASTTree;
    getText(node: ASTNode): string;
    getChangedRanges(other: ASTTree): Range[];
    getIncludedRanges(): Range[];
    getEditedRange(): Range;
    printDotGraph(fd?: number): void;
}