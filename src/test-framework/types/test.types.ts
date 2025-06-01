export interface TestCase {
    name?: string,
    code: any,
    error?: any;
    report?: (data: any) => void,
    log?: (msg: string) => void;
}

export interface TestFile {
    name: string,
    path: string
}