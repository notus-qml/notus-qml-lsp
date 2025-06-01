export class PluginBuilder {

    static context() {
        return {
            log: (msg: string) => console.log(`[LOG]: ${msg}`),
            report: (data: any) => console.log(`[REPORT]:`, data),
        }
    }

}