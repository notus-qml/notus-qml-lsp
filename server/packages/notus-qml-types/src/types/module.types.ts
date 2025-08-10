export interface ModuleContext {
    log: (message: string) => void;
    report: (data: any) => void;
    result?: () => any;
    [key: string]: any;
}

export interface PluginContext extends ModuleContext {

}

export interface RuleContext extends ModuleContext {

}

export type HandlerType = {
    name: string;
    function: (...args: any) => void;
};

export interface Module {
    handlers: {
        [name: string]: {
            create: (context: PluginContext) => {
                [nodeType: string]: HandlerType;
            };
        };
    };
}

export interface Plugin extends Module {

}

export interface Rule extends Module {

}

// export const NodeModuleType = {
//     PropertyDefinition: "PropertyDefinition",
//     ui_property: "ui_property"
// } as const;

// export type NodeModuleType = typeof NodeModuleType[keyof typeof NodeModuleType];