import { URI } from 'vscode-uri'
import path from 'path'
import fs from 'fs'

export default class FileHelper {

    static rootPathByURI(rootURI: string, fileName: string): string {
        const rootPath = URI.parse(rootURI).fsPath
        const configPath = path.join(rootPath, fileName)
        return configPath;
    }

    static filesByPath(rootPath: string, extension: string = ""): string[] {

        const files = fs.readdirSync(rootPath);

        if (extension === "") {
            return files;
        }

        return files.filter((name) => {
            return name.endsWith(extension);
        });;
    }


    static directoryExistsSync(rootPath: string): boolean {
        try {
            return fs.statSync(rootPath).isDirectory();
        } catch {
            return false;
        }
    }


}