import { TestExecutor } from "./executor/TestExecutor";
import { isEqual } from "lodash";
import { TestDiagnosticExecutor } from "./executor/TestDiagnosticExecutor";

import PluginVisitor from "@/core/ast/visitor/PluginVisitor";
import RuleVisitor from "@/core/ast/visitor/RuleVisitor";

export function compare(actual: any, expected: any) {
    if (!isEqual(actual, expected)) {
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

export function TestDiagnosticPlugin(pluginName: string) {
    return TestModule(new TestDiagnosticExecutor(pluginName, PluginVisitor))
}

export function TestDiagnosticRule(ruleName: string) {
    return TestModule(new TestDiagnosticExecutor(ruleName, RuleVisitor))
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

