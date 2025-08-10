import path from 'path';

export class RequireManager {

    static byRelativePath<T>(filePath: string): T {
        const absolutePath = path.resolve(__dirname, filePath, 'build/index.js');
        return require(absolutePath) as T;
    }

    static byPath<T>(filePath: string): T {
        const absolutePath = path.resolve(filePath, 'build/index.js');
        return require(absolutePath) as T;
    }

    static byProcessPath<T>(filePath: string): T {
        const absolutePath = path.resolve(process.cwd(), filePath, 'build/index.js');
        return require(absolutePath) as T;
    }

}