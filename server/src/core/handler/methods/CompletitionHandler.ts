import { MethodHandler } from "../MethodHandler";

export class CompletitionHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/completion');
    }

    protected handleExecute(params: any): any {
        // ADD LOGIC HERE
        return null;
    }

}