import methods from "../../methods";

import { PluginEngine } from "./module/PluginEngine";
import { RuleEngine } from "./module/RuleEngine";

type AcceptableMethodName = keyof typeof methods.rules | keyof typeof methods.plugins;

export class MethodEngine {

    pluginEngine: PluginEngine = new PluginEngine();
    ruleEngine: RuleEngine = new RuleEngine();

    runByMethod(methodName: AcceptableMethodName) {

        this.runPluginsByMethod(methodName);
        this.runRulesByMethod(methodName);

    }

    runRulesByMethod(methodName: AcceptableMethodName) {

        const rulesName = methods.rules[methodName] || [];

        if (rulesName.length === 0) {
            return;
        }

        this.ruleEngine.run(rulesName);
    }

    runPluginsByMethod(methodName: AcceptableMethodName) {

        const pluginsName = methods.plugins[methodName] || [];

        if (pluginsName.length === 0) {
            return;
        }

        this.pluginEngine.run(pluginsName);

    }

}