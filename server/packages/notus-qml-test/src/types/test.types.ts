export interface TestCase {
    name?: string,
    code: any,
    error?: any;
    report?: (data: any) => void,
    log?: (msg: string) => void;
    result?: () => any;
}

export interface TestFile {
    name: string,
    path: string
}