import { ModuleContext, LspMethod } from "notus-qml-types";
import { DiagnosticReportContext } from "./DiagnosticReportContext";

export default class ContextFactory {

    static create(methodName: LspMethod): ModuleContext {
        return new DiagnosticReportContext();
    }

}