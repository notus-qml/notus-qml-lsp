import { TemplateHelper } from './TemplateHelper';

export class PluginTemplate {

    static create(pluginName: string) {

        const keys: Map<string, string> = new Map();
        keys.set("PluginName", pluginName);

        return TemplateHelper.create('plugin.template.txt', keys)

    }

}