export namespace ErrorCodeKind {
    export const InternalError: -32603 = -32603;
    export const InvalidRequest: -32600 = -32600;
    export const InvalidParams: -32602 = -32602;
    export const MethodNotFound: -32601 = -32601;
}

export type ErrorCodeKind = -32603 | -32600 | -32602 | -32601;

export interface ErrorInformation {
    code?: ErrorCodeKind;
    message?: string;
}

export interface ErrorResult {
    error: ErrorInformation;
}