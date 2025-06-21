import { MethodHandler } from "@core/handler/MethodHandler";

export class DiagnosticHandler extends MethodHandler<any, any> {

    constructor() {
        super('textDocument/diagnostic');
    }

    protected handleExecute(params: any): any {
        // ADD LOGIC HERE
        return null;
    }

}