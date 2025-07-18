import { ModuleContext } from "@/types/module.types";
import { DiagnosticReportContext } from "./DiagnosticReportContext";
import { LspMethod } from "@/types/core.types";

export default class ContextFactory {

    static create(methodName: LspMethod): ModuleContext {
        return new DiagnosticReportContext();
    }

}