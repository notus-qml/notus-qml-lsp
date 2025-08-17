import { ModuleContext, LspMethod } from "notus-qml-types";
import DocumentEngine from "../document/engine/DocumentEngine";

export abstract class MethodHandler<TParams, TResult> {

    protected methodName: LspMethod;
    protected context: ModuleContext | undefined;
    protected notificationsHandler: MethodHandler<any, any>[];

    constructor(methodName: LspMethod, context?: ModuleContext) {
        this.methodName = methodName;
        this.context = context;
        this.notificationsHandler = [];
    }

    public async execute(params: TParams, documentEngine: DocumentEngine): Promise<TResult> {

        if (this.context) {
            documentEngine.setMethod(this.methodName, this.context);
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