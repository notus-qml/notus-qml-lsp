import methods from "../../methods";
import { PluginEngine } from "../engine/module/PluginEngine";
import { RuleEngine } from "../engine/module/RuleEngine";

type AcceptableMethodName = keyof typeof methods.rules | keyof typeof methods.plugins | undefined;

export class MethodHandler<TParams, TResult> {

    protected methodName: AcceptableMethodName | undefined;

    protected pluginEngine: PluginEngine = new PluginEngine();
    protected ruleEngine: RuleEngine = new RuleEngine();

    constructor(methodName: AcceptableMethodName) {
        this.methodName = methodName;
    }

    public execute(params: TParams): TResult {

        // TODO return handlers result
        this.runHandlers(this.methodName);

        return this.handleExecute(params);
    }

    protected handleExecute(params: TParams): TResult {
        return undefined as TResult;
    }

    // TODO add return type
    private runHandlers(methodName: AcceptableMethodName) {

        this.runPluginsByMethod(methodName);
        this.runRulesByMethod(methodName);

    }

    private runRulesByMethod(methodName: AcceptableMethodName) {

        if (!methodName) {
            return;
        }

        const rulesName = methods.rules[methodName] || [];

        if (rulesName.length === 0) {
            return;
        }

        this.ruleEngine.run(rulesName);
    }

    private runPluginsByMethod(methodName: AcceptableMethodName) {

        if (!methodName) {
            return;
        }

        const pluginsName = methods.plugins[methodName] || [];

        if (pluginsName.length === 0) {
            return;
        }

        this.pluginEngine.run(pluginsName);

    }

}