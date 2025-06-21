type ServerCpabilities = Record<string, unknown>;

export interface ServerInformation {
    name?: string;
    version?: string;
}

export interface InitializeResult {
    capabilities: ServerCpabilities;
    serverInfo?: ServerInformation;
}