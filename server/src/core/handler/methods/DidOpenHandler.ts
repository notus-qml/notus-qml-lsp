import { MethodHandler } from "@core/handler/MethodHandler";

export class DidOpenHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/didOpen');
    }

    protected handleExecute(params: any): any {
        // ADD LOGIC HERE
        return null;
    }

}