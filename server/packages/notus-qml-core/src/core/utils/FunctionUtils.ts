export default class FunctionUtils {

    static pipeArgs(...fns: ((...args: any[]) => any)[]) {
        return (...args: any[]) => {
            return fns.reduce((result, fn) => {
                return Array.isArray(result) ? fn(...result) : fn(result);
            }, args.length === 1 ? args[0] : args);
        };
    }


}