import { TestExecutor } from "@test/executor/TestExecutor";
import { Test, compare, TestDiagnosticPlugin } from "@test/TestUtils";

@TestDiagnosticPlugin("property-needs-prefix-plugin")
export class PropertyNeedsPrefixPluginTest {

    @Test('Needs prefix test')
    needsPrefixTest(executor: TestExecutor) {

        executor.addCase(
            {
                name: "Variable declaration invalid",
                code: `
                    Window {
                        id: root
                        width: 200
                        height: 100
                        color: isRed ? "red" : "blue"
                        visible: true

                        property bool isRed: true

                    }
                `,
                report: function (data: any) {
                    compare(data.item, {
                        message: "Property name needs a prefix!",
                        severity: 2,
                        suggestions: [
                            {
                                title: "Add '_' prefix on property",
                                items: [
                                    {
                                        "newText": "_isRed"
                                    }
                                ]
                            },
                            {
                                title: "Add 'v' prefix on property",
                                items: [
                                    {
                                        "newText": "vIsRed"
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        )

        executor.addCase(
            {
                name: "Variable declaration valid, prefix 'v'",
                code: `
                    Window {
                        id: root
                        width: 200
                        height: 100
                        color: vIsRed ? "red" : "blue"
                        visible: true

                        property bool vIsRed: true

                    }
                `,
            }
        )

        executor.addCase(
            {
                name: "Variable declaration valid, prefix '_'",
                code: `
                    Window {
                        id: root
                        width: 200
                        height: 100
                        color: _isRed ? "red" : "blue"
                        visible: true

                        property bool _isRed: true

                    }
                `,
            }
        )

        executor.run();
    }

}