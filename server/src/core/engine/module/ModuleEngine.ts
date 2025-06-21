import { Plugin, Rule } from "@/types/module.types";

type ModuleType = Plugin | Rule;

export abstract class ModuleEngine<T extends ModuleType> {

    protected cache: Map<string, T>;

    constructor() {
        this.cache = new Map();
    }

    protected abstract load(methodName: string): T;
    protected abstract run(modulesName: string[]): void;

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