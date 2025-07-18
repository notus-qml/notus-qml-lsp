import { LspMethod } from '@/types/core.types';
import { ModuleEngine } from './ModuleEngine';
import { Rule, RuleContext } from '@/types/module.types';
import { RuleBuilder } from '@core/builder/RuleBuilder';
import { RequireManager } from '@core/manager/RequireManager';
import Application from '@/core/singleton/Application';

export class RuleEngine extends ModuleEngine<Rule> {

    constructor(context?: RuleContext) {
        super(context ?? RuleBuilder.context())
    }

    load(ruleName: string): Rule {
        return RequireManager.byPath<Rule>(`../../rules/${ruleName}`);
    }

    namesByMethod(methodName: LspMethod): string[] {

        if (!methodName) {
            return [];
        }

        return Application.configs?.rules[methodName] || [];
    };
}
