import { TestRuleEngine } from "../TestRuleEngine";
import { TestCase } from "../types/test.types";
import { TestExecutor } from "./TestExecutor";

export class TestRuleExecutor extends TestExecutor {

    exec(testCase: TestCase): void {

        const context = {
            log: (msg: string) => {
                testCase.log?.(msg);
            },
            report: (data: any) => {
                testCase.report?.(data);
            },
        }

        const testClass = new TestRuleEngine(context);

        testClass.run([this.moduleName])
    }

}