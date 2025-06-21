import { MethodHandler } from "../MethodHandler";

export class CodeActionHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/codeAction');
    }

    protected handleExecute(params: any): any {
        // ADD LOGIC HERE
        return null;
    }

}