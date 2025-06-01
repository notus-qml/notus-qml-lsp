import { TemplateHelper } from './TemplateHelper';

export class RuleTemplate {

    static create(ruleName: string) {

        const keys: Map<string, string> = new Map();
        keys.set("RuleName", ruleName);

        return TemplateHelper.create('rule.template.txt', keys)

    }

}