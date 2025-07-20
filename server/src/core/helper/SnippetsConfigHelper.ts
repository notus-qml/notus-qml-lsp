import { readFile } from "fs/promises";
import FileHelper from './FileHelper';
import { Snippets } from "@/types/core.types";
import path from 'path';

const DIRECTORY_NAME = ".snippets";
const JSON_EXTENSION = ".json";

export default class SnippetsConfigHelper {

    static files(rootPath: string): string[] {

        const fileNames = FileHelper.filesByPath(rootPath, JSON_EXTENSION);

        return fileNames;

    }

    static async load(rootURI: string | null): Promise<Snippets | null> {

        if (!rootURI) {
            return null;
        }

        const rootPath = FileHelper.rootPathByURI(rootURI, DIRECTORY_NAME);

        if (!FileHelper.directoryExistsSync(rootPath)) {
            return null;
        }

        const fileNames = SnippetsConfigHelper.files(rootPath);

        const content = await Promise.all(
            fileNames.map(async (fileName) => {
                const fullPath = path.join(rootPath, fileName);
                const result = await readFile(fullPath, "utf8");
                const data = JSON.parse(result);
                return data;
            })
        )

        const merged: Snippets = Object.assign({}, ...content);

        return merged;

    }

}