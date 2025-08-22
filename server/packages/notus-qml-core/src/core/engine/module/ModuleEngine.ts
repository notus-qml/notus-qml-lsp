import { CodeAnalyzer } from "@/core/utils/CodeAnalyzer";
import { ASTNode, HandlerType, LspConfig, Module, ModuleContext } from "notus-qml-types";

export abstract class ModuleEngine {

    protected context: ModuleContext | undefined;
    protected handlers: Map<string, HandlerType[]> | undefined;
    protected lspConfig: LspConfig | null;

    constructor(context: ModuleContext, lspConfig: LspConfig) {
        this.context = context;
        this.handlers = undefined;
        this.lspConfig = lspConfig;

        this.loadHandlers();
    }

    protected abstract load(methodName: string): Module;
    protected abstract moduleNames(): string[];

    loadHandlers(): void {

        if (this.handlers || !this.context) {
            return;
        }

        const rulesName = this.moduleNames();

        const handlers = this.handlersByName(rulesName, this.context);

        this.handlers = handlers;

    }

    runByCode(codeAnalyzer: CodeAnalyzer) {

        const genericSymbol = "_";

        this.handlers?.get(genericSymbol)?.forEach((handler) => {
            handler.function(codeAnalyzer, this.lspConfig?.diagnostic?.params?.[handler.name])
        })
    }

    run(node: ASTNode) {

        this.handlers?.get(node.type)?.forEach((handler) => {
            handler.function(node, this.lspConfig?.diagnostic?.params?.[handler.name])
        })

    }

    protected handlersByName(rulesName: string[], context: ModuleContext): Map<string, HandlerType[]> {

        const rules = this.getAll(rulesName);

        const rulesByType: Map<string, HandlerType[]> = new Map();

        for (const rule of rules) {
            for (const [name, handlerContext] of Object.entries(rule.handlers)) {

                const handlerImplement = handlerContext.create(context);

                for (const [nodeType, handler] of Object.entries(handlerImplement) as [string, any][]) {

                    const handlerObject: HandlerType = {
                        name: name,
                        function: handler
                    }

                    if (rulesByType.has(nodeType)) {
                        rulesByType.get(nodeType)!.push(handlerObject);
                        continue;
                    }

                    rulesByType.set(nodeType, [handlerObject]);
                }
            }
        }

        return rulesByType;

    }

    get(methodName: string): Module {
        return this.load(methodName);
    }

    getAll(names: string[]): Module[] {
        return names.map(name => this.get(name));
    }

}