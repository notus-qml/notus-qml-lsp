import { MethodHandler } from "../MethodHandler";

export class FormattingHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/formatting');
    }

    protected handleExecute(params: any): any {
        // ADD LOGIC HERE
        return null;
    }

} 