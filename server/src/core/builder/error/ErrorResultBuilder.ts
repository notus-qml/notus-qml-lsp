import { ErrorCodeKind, ErrorResult } from "@/types/lsp/error.types";

export class ErrorResultBuilder {

    private result: Partial<ErrorResult> = {
        error: {}
    }

    setCode(errorCodeKind: ErrorCodeKind) {
        this.result.error!.code = errorCodeKind;
        return this;
    }

    setMessage(message: string) {
        this.result.error!.message = message;
        return this;
    }

    build(): ErrorResult {
        return this.result as ErrorResult;
    }

}