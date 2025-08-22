import { LspConfig, Module, ModuleContext } from 'notus-qml-types';
import { ModuleEngine } from './ModuleEngine';
import { RequireManager } from '@core/manager/RequireManager';

export class DiagnosticRuleEngine extends ModuleEngine {

    constructor(context: ModuleContext, lspConfig: LspConfig) {
        super(context, lspConfig)
    }

    load(ruleName: string): Module {
        return RequireManager.byRelativePath<Module>(`../../../../notus-qml-rules/${ruleName}`);
    }

    moduleNames(): string[] {
        return this.lspConfig?.diagnostic?.rules ?? [];
    };
}
