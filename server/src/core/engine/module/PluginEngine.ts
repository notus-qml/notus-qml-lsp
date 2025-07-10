import methods from '@/methods';
import { ModuleEngine } from './ModuleEngine';
import { AcceptableMethodName, Plugin, PluginContext } from '@/types/module.types';
import { PluginBuilder } from '@core/builder/PluginBuilder';
import { RequireManager } from '@core/manager/RequireManager';

export class PluginEngine extends ModuleEngine<Plugin> {

    constructor(context?: PluginContext) {
        super(context ?? PluginBuilder.context())
    }

    load(pluginName: string): Plugin {
        return RequireManager.byPath<Plugin>(`../../plugins/${pluginName}`);
    }

    namesByMethod(methodName: AcceptableMethodName): string[] {

        if (!methodName) {
            return [];
        }

        return methods.plugins[methodName] || [];
    };

}
