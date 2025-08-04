import { LspMethod, Rule, RuleContext } from 'notus-qml-types';
import { ModuleEngine } from './ModuleEngine';
import { RuleBuilder } from '@core/builder/RuleBuilder';
import { RequireManager } from '@core/manager/RequireManager';

export class RuleEngine extends ModuleEngine<Rule> {

    constructor(context?: RuleContext) {
        super(context ?? RuleBuilder.context())
    }

    load(ruleName: string): Rule {
        // TODO change to absolute path
        return RequireManager.byPath<Rule>(`../../../../notus-qml-rules/${ruleName}`);
    }

    namesByMethod(methodName: LspMethod): string[] {

        if (!methodName) {
            return [];
        }

        return this.lspConfig?.rules[methodName] ?? [];
    };
}
