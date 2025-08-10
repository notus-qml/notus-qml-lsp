import { ModuleEngine } from './ModuleEngine';
import { LspMethod, Module, ModuleContext } from 'notus-qml-types';
import { RequireManager } from '@core/manager/RequireManager';

export class PluginEngine extends ModuleEngine {

    constructor(context: ModuleContext) {
        super(context)
    }

    load(pluginName: string): Module {
        return RequireManager.byPath<Module>(`${this.lspConfig?.paths?.plugin}${pluginName}`);
    }

    namesByMethod(methodName: LspMethod): string[] {

        if (!methodName) {
            return [];
        }

        return this.lspConfig?.plugins[methodName] ?? [];
    };

}
