import { ASTNode } from "../ast/ast.types";

export namespace TextDocumentSyncKind {
    export const None: 0 = 0;
    export const Full: 1 = 1;
    export const Incremental: 2 = 2;
}

export type TextDocumentSyncKind = 0 | 1 | 2;

export type DocumentURI = string;
export type DocumentBody = string;

export interface DidOpenTextDocumentParams {
    textDocument: TextDocumentItem;
}

export interface TextDocumentItem {
    uri: string;
    languageId: string;
    version: number;
    text: string;
}

interface TextDocumentIdentifier {
    uri: DocumentURI;
}

export interface DocumentDiagnosticParams {
    textDocument: TextDocumentIdentifier;
    identifier?: string;
    previousResultId?: string;
}

export namespace DiagnosticSeverity {
    export const Error: 1 = 1;
    export const Warning: 2 = 2;
    export const Information: 3 = 3;
    export const Hint: 4 = 4;
}

export type DiagnosticSeverity = 1 | 2 | 3 | 4;

export interface CodeDescription {
    href: DocumentURI;
}

export namespace DiagnosticTag {
    export const Unnecessary: 1 = 1;
    export const Deprecated: 2 = 2;
}

export type DiagnosticTag = 1 | 2;

export interface DiagnosticRelatedInformation {
    location: Location;
    message: string;
}

export interface LSPRange {
    start: LSPPosition;
    end: LSPPosition;
}

interface LSPPosition {
    line: number;
    character: number;
}

export type LSPAny = any;

export interface Diagnostic {
    range: LSPRange;
    severity?: DiagnosticSeverity;
    code?: number | string;
    codeDescription?: CodeDescription;
    source?: string;
    message: string;
    tags?: DiagnosticTag[];
    relatedInformation?: DiagnosticRelatedInformation[];
    data?: LSPAny;
}

export interface DiagnosticContext {
    node?: ASTNode;
    item: Omit<Diagnostic, "range"> & {
        range?: LSPRange
    };
};

export interface FullDocumentDiagnosticReport {
    kind: "full";
    resultId?: string;
    items: Diagnostic[];
}

export interface UnchangedDocumentDiagnosticReport {
    kind: "unchanged";
    resultId: string;
}

export interface RelatedFullDocumentDiagnosticReport extends FullDocumentDiagnosticReport {
    relatedDocuments?: {
        [uri: string /** DocumentUri */]:
        FullDocumentDiagnosticReport | UnchangedDocumentDiagnosticReport;
    };
}

export interface RelatedUnchangedDocumentDiagnosticReport extends UnchangedDocumentDiagnosticReport {
    relatedDocuments?: {
        [uri: string /** DocumentUri */]:
        FullDocumentDiagnosticReport | UnchangedDocumentDiagnosticReport;
    };
}

export type DocumentDiagnosticReport = RelatedFullDocumentDiagnosticReport | RelatedUnchangedDocumentDiagnosticReport;

