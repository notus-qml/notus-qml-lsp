import methods from '@/methods';
import { ModuleEngine } from './ModuleEngine';
import { AcceptableMethodName, Rule, RuleContext } from '@/types/module.types';
import { RuleBuilder } from '@core/builder/RuleBuilder';
import { RequireManager } from '@core/manager/RequireManager';

export class RuleEngine extends ModuleEngine<Rule> {

    constructor(context?: RuleContext) {
        super(context ?? RuleBuilder.context())
    }

    load(ruleName: string): Rule {
        return RequireManager.byPath<Rule>(`../../rules/${ruleName}`);
    }

    namesByMethod(methodName: AcceptableMethodName): string[] {

        if (!methodName) {
            return [];
        }

        return methods.rules[methodName] || [];
    };
}
