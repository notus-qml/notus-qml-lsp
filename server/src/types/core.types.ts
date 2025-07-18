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