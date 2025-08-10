import { CodeAnalyzer } from "@/core/utils/CodeAnalyzer";
import { ASTNode, HandlerType, LspConfig, LspMethod, Module, ModuleContext } from "notus-qml-types";

export abstract class ModuleEngine {

    protected cache: Map<string, Module>;
    protected handlersByMethod: Map<LspMethod, Map<string, HandlerType[]>>
    protected context: ModuleContext;
    protected handlers: Map<string, HandlerType[]> | undefined;
    protected lspConfig: LspConfig | null;

    constructor(context: ModuleContext) {
        this.cache = new Map();
        this.handlersByMethod = new Map();
        this.context = context;
        this.handlers = undefined;
        this.lspConfig = null;
    }

    protected abstract load(methodName: string): Module;
    protected abstract namesByMethod(methodName: LspMethod): string[] | never[];

    setLspConfig(lspConfig: LspConfig) {
        this.lspConfig = lspConfig;
    }

    // TODO no make sense receive methodName, always is diagnostics
    setHandlersByMethod(methodName: LspMethod, context: ModuleContext): void {

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

    runByCode(codeAnalyzer: CodeAnalyzer) {

        const genericSymbol = "_";

        this.handlers?.get(genericSymbol)?.forEach((handler) => {
            handler(codeAnalyzer)
        })
    }

    run(node: ASTNode) {
        this.handlers?.get(node.type)?.forEach((handler) => {
            handler(node)
        })
    }

    protected handlersByName(rulesName: string[], context: ModuleContext): Map<string, HandlerType[]> {

        const rules = this.getAll(rulesName);

        const rulesByType: Map<string, HandlerType[]> = new Map();

        for (const rule of rules) {
            for (const [name, handlerContext] of Object.entries(rule.handlers)) {

                const handlerImplement = handlerContext.create(context);

                for (const [nodeType, handler] of Object.entries(handlerImplement) as [string, HandlerType][]) {

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

    get(methodName: string): Module {

        if (this.cache.has(methodName)) {
            return this.cache.get(methodName)!;
        }

        const item = this.load(methodName);
        this.cache.set(methodName, item);
        return item;
    }

    getAll(names: string[]): Module[] {
        return names.map(name => this.get(name));
    }

}