import { TestPluginEngine } from "../TestPluginEngine";
import { TestCase } from "../types/test.types";
import { TestExecutor } from "./TestExecutor";

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

        testClass.run([this.moduleName])

    }

}