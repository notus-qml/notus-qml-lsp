import { LspMethod } from "notus-qml-types";
import DocumentEngine from "../document/engine/DocumentEngine";

export abstract class MethodHandler<TParams, TResult> {

    protected methodName: LspMethod;
    protected notificationsHandler: MethodHandler<any, any>[];
    protected isInitialized: boolean;

    constructor(methodName: LspMethod) {
        this.methodName = methodName;
        this.notificationsHandler = [];
        this.isInitialized = false;
    }

    protected initialize(documentEngine: DocumentEngine) { }

    public async execute(params: TParams, documentEngine: DocumentEngine): Promise<TResult> {

        if (!this.isInitialized) {
            this.initialize(documentEngine);
            this.isInitialized = true;
        }

        return this.handleExecute(params, documentEngine);
    }

    protected async handleExecute(params: TParams, documentEngine: DocumentEngine): Promise<TResult> {
        return undefined as TResult;
    }

    addNotification(notification: MethodHandler<any, any> | undefined) {

        if (!notification) {
            return;
        }

        this.notificationsHandler.push(notification);
    };

    notifications(): MethodHandler<any, any>[] {
        return this.notificationsHandler;
    }

}