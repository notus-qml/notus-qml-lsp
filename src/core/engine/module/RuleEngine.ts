import { Rule, RuleContext } from '../../../types/module.types';
import { RuleBuilder } from '../../builder/RuleBuilder';
import { RequireManager } from '../../manager/RequireManager';
import { ModuleEngine } from './ModuleEngine';

export class RuleEngine extends ModuleEngine<Rule> {

    private context: RuleContext;

    constructor(context?: RuleContext) {

        super()

        this.context = context ?? RuleBuilder.context()

    }

    load(ruleName: string): Rule {
        return RequireManager.byPath<Rule>(`../../rules/${ruleName}`);
    }

    run(rulesName: string[]) {

        const rules = this.getAll(rulesName);

        for (const rule of rules) {
            for (const [name, handlerContext] of Object.entries(rule.handlers)) {

                const handlerImplement = handlerContext.create(this.context);

                for (const [nodeType, handler] of Object.entries(handlerImplement)) {
                    this.context.log(`Running rule "${name}" on node type "${nodeType}"`);

                    // 🔸 Simula um nó só para teste
                    const fakeNode = { type: nodeType, name: 'exampleVar' };

                    handler(fakeNode);
                }
            }
        }
    }
}
