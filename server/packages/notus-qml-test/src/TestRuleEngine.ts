import { RuleEngine } from 'notus-qml-core';
import { RuleContext } from 'notus-qml-types';

export class TestRuleEngine extends RuleEngine {
    constructor(context: RuleContext) {
        super(context)
    }
}