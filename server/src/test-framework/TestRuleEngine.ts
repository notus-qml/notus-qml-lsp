import { TestEngine } from './TestEngine';
import { RuleEngine } from '../core/engine/module/RuleEngine';
import { RuleContext } from '../types/module.types';

export class TestRuleEngine extends RuleEngine {
    constructor(context: RuleContext) {
        super(context)
    }
}