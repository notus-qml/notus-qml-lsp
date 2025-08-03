import { ModuleEngine } from './ModuleEngine';
import { Plugin, PluginContext } from '@/types/module.types';
import { PluginBuilder } from '@core/builder/PluginBuilder';
import { RequireManager } from '@core/manager/RequireManager';
import { LspMethod } from '@/types/core.types';

export class PluginEngine extends ModuleEngine<Plugin> {

    constructor(context?: PluginContext) {
        super(context ?? PluginBuilder.context())
    }

    load(pluginName: string): Plugin {
        return RequireManager.byPath<Plugin>(`../../plugins/${pluginName}`);
    }

    namesByMethod(methodName: LspMethod): string[] {

        if (!methodName) {
            return [];
        }

        return this.lspConfig?.plugins[methodName] ?? [];
    };

}
