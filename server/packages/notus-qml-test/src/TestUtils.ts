import { TestExecutor } from "./executor/TestExecutor";
import { isEqual } from "lodash";
import { TestDiagnosticExecutor } from "./executor/TestDiagnosticExecutor";

export function compare(actual: any, expected: any) {
    if (!isEqual(actual, expected)) {
        throw new Error(
            `\n❌ Comparison failed\n\n[ACTUAL] ${JSON.stringify(actual, null, 2)}\n[EXPECTED] ${JSON.stringify(expected, null, 2)}`
        );
    }
}

export function Test(name?: string) {
    return function (target: any, propertyKey: string) {
        if (!target.constructor.tests) {
            target.constructor.tests = [];
        }
        target.constructor.tests.push({ name, method: propertyKey });
    };
}

export function TestDiagnostic(moduleName: string) {
    return TestModule(new TestDiagnosticExecutor(moduleName))
}

function TestModule(testExecutor: TestExecutor) {
    return function (constructor: Function) {
        const methodNames = Object.getOwnPropertyNames(constructor.prototype)
            .filter(name => name !== 'constructor' && typeof constructor.prototype[name] === 'function');

        for (const methodName of methodNames) {
            const originalMethod = constructor.prototype[methodName];

            constructor.prototype[methodName] = function (...args: any[]) {
                return originalMethod.apply(this, [testExecutor, ...args]);
            };
        }
    };
}

