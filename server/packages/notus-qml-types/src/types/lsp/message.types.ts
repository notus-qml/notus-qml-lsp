export interface Message {
    jsonrpc: string;
}

export interface NotificationMessage extends Message {
    method: string;
    params?: unknown[] | object;
}

export interface RequestMessage extends NotificationMessage {
    id: number | string;
}

type NotificationMethod = (message: NotificationMessage) => void;
