import { TestExecutor } from "@test/executor/TestExecutor";
import { Test, compare, TestPlugin } from "@test/TestUtils";

@TestPlugin("example-plugin")
export class ExamplePluginTest {

    @Test('Should add numbers test')
    shouldAddNumbersTest(executor: TestExecutor) {

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