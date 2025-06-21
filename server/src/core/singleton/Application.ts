export class Application {

    public readonly name: string;
    public readonly version: string;

    constructor() {
        this.name = "Notus QML";
        this.version = "0.0.1";
    }

}

export default new Application();