import { LspMethod, Module, ModuleContext, RuleContext } from 'notus-qml-types';
import { ModuleEngine } from './ModuleEngine';
import { RequireManager } from '@core/manager/RequireManager';

export class RuleEngine extends ModuleEngine {

    constructor(context: ModuleContext) {
        super(context)
    }

    load(ruleName: string): Module {
        return RequireManager.byRelativePath<Module>(`../../../../notus-qml-rules/${ruleName}`);
    }

    namesByMethod(methodName: LspMethod): string[] {

        if (!methodName) {
            return [];
        }

        return this.lspConfig?.rules[methodName] ?? [];
    };
}
