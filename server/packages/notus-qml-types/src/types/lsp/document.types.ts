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

export interface CodeActionContext {
    diagnostics: Diagnostic[];
}

export interface CodeActionParams {
    textDocument: TextDocumentIdentifier;
    range: LSPRange;
    context: CodeActionContext;
}

export interface TextEdit {
    range: LSPRange;
    newText: string;
}

export interface WorkspaceEdit {
    changes: {
        [uri: DocumentURI]: TextEdit[]
    }
}

export interface CodeAction {
    title: string;
    kind?: "quickfix"; // TODO replace for type
    edit?: WorkspaceEdit;
    data?: unknown;
}

export interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
    version: number;
}

export interface TextDocumentContentChangedEvent {
    text: string;
    range: LSPRange;
    rangeLength: number;
}

export interface DidChangeTextDocumentParams {
    textDocument: VersionedTextDocumentIdentifier;
    contentChanges: TextDocumentContentChangedEvent[];
}

export interface Position {
    line: number;
    character: number;
}

export interface TextDocumentPositionParams {
    textDocument: TextDocumentIdentifier;
    position: Position;
}

export namespace InsertTextFormat {
    export const PlainText: 1 = 1;
    export const Snippet: 2 = 2;
}

export type InsertTextFormat = 1 | 2;

export namespace CompletionItemKind {
    export const Text: 1 = 1;
    export const Method: 2 = 2;
    export const Function: 3 = 3;
    export const Constructor: 4 = 4;
    export const Field: 5 = 5;
    export const Variable: 6 = 6;
    export const Class: 7 = 7;
    export const Interface = 8;
    export const Module: 9 = 9;
    export const Property: 10 = 10;
    export const Unit: 11 = 11;
    export const Value: 12 = 12;
    export const Enum: 13 = 13;
    export const Keyword: 14 = 14;
    export const Snippet: 15 = 15;
    export const Color: 16 = 16;
    export const File: 17 = 17;
    export const Reference: 18 = 18;
    export const Folder: 19 = 19;
    export const EnumMember: 20 = 20;
    export const Constant: 21 = 21;
    export const Struct: 22 = 22;
    export const Event: 23 = 23;
    export const Operator: 24 = 24;
    export const TypeParameter: 25 = 25;
}

export type CompletionItemKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

export interface CompletionParams extends TextDocumentPositionParams { }

export interface InsertReplaceEdit {
    newText: string;
    insert?: Range;
    replace?: Range;
    range?: LSPRange;
}

export type CompletionItem = {
    label: string;
    textEdit: InsertReplaceEdit;
    insertTextFormat: number;
    kind: number;
    detail?: string;
    documentation?: string;
}

export interface CompletionList {
    isIncomplete: boolean;
    items: CompletionItem[];
}

type ProgressToken = number | string;

export interface WorkDoneProgressParams {
    workDoneToken?: ProgressToken;
}

export interface FormattingOptions {
    tabSize: number;
    insertSpaces: boolean;
    trimTrailingWhitespace?: boolean;
    insertFinalNewline?: boolean;
    trimFinalNewlines?: boolean;
}

export interface DocumentFormattingParams extends WorkDoneProgressParams {
    textDocument: TextDocumentIdentifier;
    options: FormattingOptions;
}

