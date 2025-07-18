import { URI } from 'vscode-uri'
import fs from 'fs'
import path from 'path'

export default class FileHelper {

    static rootPathByURI(rootURI: string, fileName: string): string {
        const rootPath = URI.parse(rootURI).fsPath
        const configPath = path.join(rootPath, fileName)
        return configPath;
    }

}