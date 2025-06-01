import { Plugin, PluginContext } from '../../../types/module.types';
import { PluginBuilder } from '../../builder/PluginBuilder';
import { RequireManager } from '../../manager/RequireManager';
import { ModuleEngine } from './ModuleEngine';

export class PluginEngine extends ModuleEngine<Plugin> {

    private context: PluginContext;

    constructor(context?: PluginContext) {

        super()

        this.context = context ?? PluginBuilder.context()

    }

    load(pluginName: string): Plugin {
        return RequireManager.byPath<Plugin>(`../../plugins/${pluginName}`);
    }

    run(pluginsName: string[]) {

        const plugins = this.getAll(pluginsName);

        for (const plugin of plugins) {
            for (const [name, handlerContext] of Object.entries(plugin.handlers)) {

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
