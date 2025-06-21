export interface ModuleContext {
    log: (message: string) => void;
    report: (data: any) => void;
    [key: string]: any;
}

export interface PluginContext extends ModuleContext {

}

export interface RuleContext extends ModuleContext {

}

export interface Module {
    handlers: {
        [name: string]: {
            create: (context: PluginContext) => {
                [nodeType: string]: (node: any) => void;
            };
        };
    };
}

export interface Plugin extends Module {

}

export interface Rule extends Module {

}

// LSP types definition

interface Message {
    jsonrpc: string;
}

export interface NotificationMessage extends Message {
    method: string;
    params?: unknown[] | object;
}

export interface RequestMessage extends NotificationMessage {
    id: number | string;
}