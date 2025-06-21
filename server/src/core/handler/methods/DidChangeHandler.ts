import { MethodHandler } from "@core/handler/MethodHandler";

export class DidChangeHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/didChange');
    }

    protected handleExecute(params: any): any {
        // ADD LOGIC HERE
        return null;
    }

}