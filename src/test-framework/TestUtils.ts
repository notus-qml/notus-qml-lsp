import { TestExecutor } from "./executor/TestExecutor";
import { TestPluginExecutor } from "./executor/TestPluginExecutor";
import { TestRuleExecutor } from "./executor/TestRuleExecutor";

export function compare(actual: any, expected: any) {
    if (actual !== expected) {
        throw new Error(`\n❌ Comparation failed\n\n[ACTUAL] ${actual}\n[EXPECTED] ${expected}`);
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

export function TestPlugin(pluginName: string) {
    return TestModule(new TestPluginExecutor(pluginName))
}

export function TestRule(ruleName: string) {
    return TestModule(new TestRuleExecutor(ruleName))
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

