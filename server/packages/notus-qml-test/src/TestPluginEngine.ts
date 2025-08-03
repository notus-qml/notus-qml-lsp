import { PluginEngine } from 'notus-qml-core';
import { PluginContext } from 'notus-qml-types';

export class TestPluginEngine extends PluginEngine {
    constructor(context: PluginContext) {
        super(context)
    }
}