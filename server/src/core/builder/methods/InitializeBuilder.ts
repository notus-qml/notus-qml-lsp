import { TextDocumentSyncKind } from "@/types/lsp/document.types";
import { InitializeResult } from "@/types/lsp/initialize.types";

export class InitializeResultBuilder {
    private result: Partial<InitializeResult> = {
        capabilities: {},
        serverInfo: {}
    };

    enableDiagnostics(identifier: string): this {
        this.result.capabilities!.diagnosticProvider = {
            identifier,
            interFileDependencies: false,
            workspaceDiagnostics: true
        };
        return this;
    }

    enableFormatting(): this {
        this.result.capabilities!.documentFormattingProvider = true;
        return this;
    }

    enableCodeActions(): this {
        this.result.capabilities!.codeActionProvider = {};
        return this;
    }

    enableCompletion(): this {
        this.result.capabilities!.completionProvider = {};
        return this;
    }

    setTextDocumentSync(syncKind: TextDocumentSyncKind): this {
        this.result.capabilities!.textDocumentSync = syncKind;
        return this;
    }

    setServerInfo(name: string, version: string): this {
        this.result.serverInfo = { name, version };
        return this;
    }

    build(): InitializeResult {
        return this.result as InitializeResult;
    }
}
