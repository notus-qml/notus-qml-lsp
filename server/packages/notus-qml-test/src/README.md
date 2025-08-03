<div align="center">
  <h1>NotusQML Test Framework</h1>
  
  <img src="../../server/documentation/icon.png" alt="NotusQML Logo" width="80" height="80" style="border-radius: 10px;">
  
  <br/>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/></a>
  <img src="https://img.shields.io/badge/Work%20in%20Progress-yellow?style=for-the-badge" alt="Work in Progress"/>
  
  <p><b>This is a work in progress project. APIs and structure may change at any time.</b></p>
</div>

# Test Framework

This directory contains the test framework for plugins and rules in NotusQML.

## How to create a test for a plugin

Below is an example test for the `property-needs-prefix-plugin`:

```typescript
import { TestExecutor } from "@test/executor/TestExecutor";
import { Test, compare, TestDiagnosticPlugin } from "@test/TestUtils";

// Associate the test class with the plugin
@TestDiagnosticPlugin("property-needs-prefix-plugin")
export class PropertyNeedsPrefixPluginTest {

    // Define a test method
    @Test('Needs prefix test')
    needsPrefixTest(executor: TestExecutor) {

        // Invalid case: property without prefix
        executor.addCase({
            name: "Variable declaration invalid",
            code: `
                Window {
                    id: root
                    width: 200
                    height: 100
                    color: isRed ? "red" : "blue"
                    visible: true

                    property bool isRed: true  // Track the color state
                }
            `,
            report: function (data: any) {
                compare(data.item, {
                    message: 'Property name needs a prefix!', severity: 2
                });
            }
        });

        // Valid case: property with prefix
        executor.addCase({
            name: "Variable declaration valid",
            code: `
                Window {
                    id: root
                    width: 200
                    height: 100
                    color: isRed ? "red" : "blue"
                    visible: true

                    property bool vIsRed: true  // Track the color state
                }
            `,
            report: undefined // No diagnostic expected, by default is undefined 
        });

        // Run the test cases
        executor.run();
    }
}
```

## How to run the tests

In the `server` directory, run:

```bash
npm test
```

You can filter by test class or test method:

```bash
# Run only a specific test class
npm test -- --class PropertyNeedsPrefixPluginTest

# Run only a specific test method
npm test -- --test needsPrefixTest
```

## Tips
- Use the `@TestDiagnosticPlugin("plugin-name")` decorator to associate the test class with a plugin.
- Use the `@Test('test name')` decorator to mark test methods.
- Use `executor.addCase` to add test cases, defining the QML code and the expected behavior (the `report` function).
- Use the `compare` function to compare diagnostics returned by the plugin. 