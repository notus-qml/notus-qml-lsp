import ContextFactory from "@/core/context/ContextFactory";
import { ASTNode } from "@/types/ast/ast.types";
import { AcceptableMethodName, ModuleContext, NodeModuleType, Plugin, Rule } from "@/types/module.types";

type ModuleType = Plugin | Rule;
export type HandlerType = (node: any) => void;

export abstract class ModuleEngine<T extends ModuleType> {

    protected cache: Map<string, T>;
    protected handlersByMethod: Map<AcceptableMethodName, Map<NodeModuleType, HandlerType[]>>
    protected context: ModuleContext;
    protected handlers: Map<NodeModuleType, HandlerType[]> | undefined;

    constructor(context: ModuleContext) {
        this.cache = new Map();
        this.handlersByMethod = new Map();
        this.context = context;
        this.handlers = undefined;
    }

    protected abstract load(methodName: string): T;
    protected abstract namesByMethod(methodName: AcceptableMethodName): string[] | never[];

    setHandlersByMethod(methodName: AcceptableMethodName, context: ModuleContext): void {

        if (!methodName) {
            return;
        }

        this.handlers = this.handlersByMethod.get(methodName) ?? undefined;

        if (!this.handlers) {

            const rulesName = this.namesByMethod(methodName);

            const handlers = this.handlersByName(rulesName, context);

            this.handlersByMethod.set(methodName, handlers);

            this.handlers = handlers;
        }


    }

    run(node: ASTNode) {
        this.handlers?.get(node.type as NodeModuleType)?.forEach((handler) => {
            handler(node)
        })
    }

    protected handlersByName(rulesName: string[], context: ModuleContext): Map<NodeModuleType, HandlerType[]> {

        const rules = this.getAll(rulesName);

        const rulesByType: Map<NodeModuleType, HandlerType[]> = new Map();

        for (const rule of rules) {
            for (const [name, handlerContext] of Object.entries(rule.handlers)) {

                const handlerImplement = handlerContext.create(context);

                for (const [nodeType, handler] of Object.entries(handlerImplement) as [NodeModuleType, HandlerType][]) {

                    if (rulesByType.has(nodeType)) {
                        rulesByType.get(nodeType)!.push(handler);
                        continue;
                    }

                    rulesByType.set(nodeType, [handler]);
                }
            }
        }

        return rulesByType;

    }

    get(methodName: string): T {

        if (this.cache.has(methodName)) {
            return this.cache.get(methodName)!;
        }

        const item = this.load(methodName);
        this.cache.set(methodName, item);
        return item;
    }

    getAll(names: string[]): T[] {
        return names.map(name => this.get(name));
    }

}