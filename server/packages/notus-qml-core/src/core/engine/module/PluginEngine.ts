import { ModuleEngine } from './ModuleEngine';
import { Plugin, PluginContext, LspMethod } from 'notus-qml-types';
import { PluginBuilder } from '@core/builder/PluginBuilder';
import { RequireManager } from '@core/manager/RequireManager';

export class PluginEngine extends ModuleEngine<Plugin> {

    constructor(context?: PluginContext) {
        super(context ?? PluginBuilder.context())
    }

    load(pluginName: string): Plugin {
        return RequireManager.byPath<Plugin>(`${this.lspConfig?.paths?.plugin}${pluginName}`);
    }

    namesByMethod(methodName: LspMethod): string[] {

        if (!methodName) {
            return [];
        }

        return this.lspConfig?.plugins[methodName] ?? [];
    };

}
