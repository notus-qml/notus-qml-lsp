import { MethodHandler } from "@core/handler/MethodHandler";

export class MethodRegistry {

    private handlers: Map<string, MethodHandler<any, any>> = new Map();

    register(methodName: string, handler: MethodHandler<any, any>) {
        this.handlers.set(methodName, handler);
    }

    getHandler(methodName: string): MethodHandler<any, any> | undefined {
        return this.handlers.get(methodName);
    }

}