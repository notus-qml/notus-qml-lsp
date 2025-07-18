import { ModuleContext } from "@/types/module.types";
import DocumentEngine from "../document/engine/DocumentEngine";
import { LspMethod } from "@/types/core.types";

export abstract class MethodHandler<TParams, TResult> {

    protected methodName: LspMethod;
    protected context: ModuleContext | undefined;

    constructor(methodName: LspMethod, context?: ModuleContext) {
        this.methodName = methodName;
        this.context = context;
    }

    public execute(params: TParams, documentEngine: DocumentEngine): TResult {

        if (this.context) {
            documentEngine.setMethod(this.methodName, this.context);
        }

        return this.handleExecute(params, documentEngine);
    }

    protected handleExecute(params: TParams, documentEngine: DocumentEngine): TResult {
        return undefined as TResult;
    }

}