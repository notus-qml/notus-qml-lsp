export namespace ModuleType {
    export const PLUGIN: string = "PLUGIN"
    export const RULE: string = "RULE"
}

export type ModuleType = "PLUGIN" | "RULE";

export interface FileInfo {
    name: string;
    suffix: string;
    fullName: string;
}

export namespace TestModuleType {
    export const PLUGIN: string = "TestDiagnosticPlugin"
    export const RULE: string = "TestDiagnosticRule"
}

export type TestModuleType = "TestDiagnosticPlugin" | "TestDiagnosticRule";