import { DocumentURI, LSPAny, WorkDoneProgressParams } from "./document.types";

type ServerCpabilities = Record<string, unknown>;

export interface ServerInformation {
    name?: string;
    version?: string;
}

export interface InitializeResult {
    capabilities: ServerCpabilities;
    serverInfo?: ServerInformation;
}

export interface WorkspaceFolder {
    uri: DocumentURI;
    name: string;
}

export interface DiagnosticClientCapabilities {
    dynamicRegistration?: boolean;
    relatedDocumentSupport?: boolean;
}

export interface TextDocumentClientCapabilities {
    diagnostic?: DiagnosticClientCapabilities;
}

export interface ClientCapabilities {
    textDocument?: TextDocumentClientCapabilities;
}

export interface InitializeParams extends WorkDoneProgressParams {
    processId: number | null;
    clientInfo?: {
        name: string;
        version?: string;
    };
    capabilities: ClientCapabilities,
    locale?: string;
    rootPath?: string | null;
    rootUri: DocumentURI | null;
    initializationOptions?: LSPAny;
    workspaceFolders?: WorkspaceFolder[] | null;
}