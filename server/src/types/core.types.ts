export enum LspMethod {
    Diagnostic = "textDocument/diagnostic",
    Completion = "textDocument/completion",
    CodeAction = "textDocument/codeAction",
    DidOpen = "textDocument/didOpen",
    DidChange = "textDocument/didChange",
    Formatting = "textDocument/formatting",
    Initialize = "initialize"
}

export interface LspConfig {
    rules: Partial<Record<LspMethod, string[]>>;
    plugins: Partial<Record<LspMethod, string[]>>;
}

export interface SnippetBody {
    prefix: string
    body: string[]
    description?: string
}

export type SnippetsByPrefix = Record<string, Record<string, SnippetBody>>
export type Snippets = Record<string, SnippetBody>