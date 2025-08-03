import { LspConfig, Snippets } from "notus-qml-types";

export class Application {

    public readonly name: string;
    public readonly version: string;

    public configs: LspConfig | null;
    public snippets: Snippets | null;

    constructor() {
        this.name = "Notus QML";
        this.version = "0.0.1";
        this.configs = null;
        this.snippets = null;
    }

    setConfigs(configs: LspConfig) {
        this.configs = configs;
    }

    setSnippets(snippets: Snippets | null) {
        this.snippets = snippets;
    }

    getSnippets() {
        return this.snippets;
    }

}

export default new Application();