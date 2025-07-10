import { AcceptableMethodName, ModuleContext } from "@/types/module.types";
import { DiagnosticContext } from "./DiagnosticContext";

export default class ContextFactory {

    static create(methodName: AcceptableMethodName): ModuleContext {
        return new DiagnosticContext();
    }

}