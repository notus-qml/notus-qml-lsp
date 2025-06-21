import { TestCase } from "../types/test.types";

export abstract class TestExecutor {

    testCases: TestCase[];
    moduleName: string;

    constructor(moduleName: string) {
        this.testCases = [];
        this.moduleName = moduleName;
    }

    addCase(testCase: TestCase) {
        this.testCases.push(testCase)
    }

    abstract exec(testCase: TestCase): void;

    run() {

        for (const testCase of this.testCases) {

            console.log(`⚙️  [TEST CASE]: ${testCase.name}\n`)

            this.exec(testCase);
        }

    }

}