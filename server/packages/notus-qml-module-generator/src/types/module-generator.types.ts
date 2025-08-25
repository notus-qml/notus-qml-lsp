export interface FileInfo {
    name: string;
    suffix: string;
    fullName: string;
}

export namespace TestModuleType {
    export const RULE: string = "TestDiagnostic"
}

export type TestModuleType = "TestDiagnostic";