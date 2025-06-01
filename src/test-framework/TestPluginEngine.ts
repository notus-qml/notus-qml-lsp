import { PluginEngine } from "../core/engine/module/PluginEngine";
import { PluginContext } from "../types/module.types";

export class TestPluginEngine extends PluginEngine {
    constructor(context: PluginContext) {
        super(context)
    }
}