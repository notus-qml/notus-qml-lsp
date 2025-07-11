import { AcceptableMethodName, ModuleContext } from "@/types/module.types";
import { DiagnosticReportContext } from "./DiagnosticReportContext";

export default class ContextFactory {

    static create(methodName: AcceptableMethodName): ModuleContext {
        return new DiagnosticReportContext();
    }

}