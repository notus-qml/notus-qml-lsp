import { ModuleEngine, RequireManager } from 'notus-qml-core';
import { LspMethod, Module, ModuleContext } from 'notus-qml-types';

export class TestModuleEngine extends ModuleEngine {

    private moduleName: string;

    constructor(context: ModuleContext, moduleName: string) {
        super(context, {})
        this.moduleName = moduleName;
    }

    load(moduleName: string): Module {
        return RequireManager.byProcessPath<Module>("");
    }

    moduleNames(): string[] {
        return [this.moduleName];
    };

}
