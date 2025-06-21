import path from 'path';

export class RequireManager {

    static byPath<T>(filePath: string): T {
        const absolutePath = path.resolve(__dirname, filePath);
        return require(absolutePath) as T;
    }

}