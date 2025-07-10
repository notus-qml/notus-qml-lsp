import { AcceptableMethodName, ModuleContext } from "@/types/module.types";
import DocumentEngine from "../document/engine/DocumentEngine";

export abstract class MethodHandler<TParams, TResult> {

    protected methodName: AcceptableMethodName | undefined;
    protected context: ModuleContext | undefined;

    constructor(methodName: AcceptableMethodName, context?: ModuleContext) {
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