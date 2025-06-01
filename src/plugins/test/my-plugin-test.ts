import { TestExecutor } from "../../test-framework/executor/TestExecutor";
import { Test, compare, TestPlugin } from "../../test-framework/TestUtils";

@TestPlugin("my-plugin")
export class MyPlugin {

    @Test('Test example')
    testExample(executor: TestExecutor) {

        executor.addCase(
            {
                name: "Variable declaration valid",
                code: { type: "VariableDeclarationTest", name: 'exampleVar123' },
            }
        )

        executor.addCase(
            {
                name: "Variable declaration invalid",
                code: { type: "VariableDeclaration", name: 'exampleVar' },
                report: function (data: any) {
                    compare(data.message, `Avoid using "var" error`)
                }
            }
        )

        executor.run();
    }

}