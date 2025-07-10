import { TestExecutor } from "./TestExecutor";
import { TestPluginEngine } from "@test/TestPluginEngine";
import { TestCase } from "@test/types/test.types";

export class TestPluginExecutor extends TestExecutor {

    exec(testCase: TestCase): void {

        const context = {
            log: (msg: string) => {
                testCase.log?.(msg);
            },
            report: (data: any) => {
                testCase.report?.(data);
            },
        }

        const testClass = new TestPluginEngine(context);

        // testClass.run([this.moduleName])

    }

}