import { LspConfig } from "@/types/core.types";

export class Application {

    public readonly name: string;
    public readonly version: string;

    public configs: LspConfig | null;

    constructor() {
        this.name = "Notus QML";
        this.version = "0.0.1";
        this.configs = null;
    }

    setConfigs(configs: LspConfig) {
        this.configs = configs;
    }

}

export default new Application();