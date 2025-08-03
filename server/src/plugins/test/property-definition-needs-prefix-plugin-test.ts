import { TestExecutor } from "@test/executor/TestExecutor";
import { Test, compare, TestDiagnosticPlugin } from "@test/TestUtils";

@TestDiagnosticPlugin("property-definition-needs-prefix-plugin")
export class PropertyDefinitionNeedsPrefixTest {

    @Test('Propery definition needs prefix')
    testPropertyDefinition(executor: TestExecutor) {

        executor.addCase(
            {
                name: "Id invalid",
                code: `
                    Rectangle {
                        id: myRectangle
                    }
                `,
                report: function (data: any) {
                    compare(data.item, {
                        "message": "Id needs prefix: rect",
                        "severity": 2
                    });
                }
            }
        )


        executor.addCase(
            {
                name: "Valid Id",
                code: `
                    Rectangle {
                        id: rectMain
                    }
                `
            }
        )

        executor.run();
    }

}