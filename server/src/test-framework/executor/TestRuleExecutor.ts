import { TestExecutor } from "./TestExecutor";
import { TestRuleEngine } from "@test/TestRuleEngine";
import { TestCase } from "@test/types/test.types";

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

        // testClass.run([this.moduleName])
    }

}