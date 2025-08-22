import { ModuleEngine } from './ModuleEngine';
import { LspConfig, Module, ModuleContext } from 'notus-qml-types';
import { RequireManager } from '@core/manager/RequireManager';

export class DiagnosticPluginEngine extends ModuleEngine {

    constructor(context: ModuleContext, lspConfig: LspConfig) {
        super(context, lspConfig)
    }

    load(pluginName: string): Module {
        return RequireManager.byPath<Module>(`${this.lspConfig?.paths?.plugin}${pluginName}`);
    }

    moduleNames(): string[] {
        return this.lspConfig?.diagnostic?.plugins ?? [];
    };

}
