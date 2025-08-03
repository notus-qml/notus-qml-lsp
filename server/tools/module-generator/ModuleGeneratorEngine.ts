import * as fs from 'fs';
import * as path from 'path';

// TODO change to use alias @
import { PluginTemplate } from './templates/PluginTemplate';
import { RuleTemplate } from './templates/RuleTemplate';
import { TestTemplate } from './templates/TestTemplate';
import { FileInfo, ModuleType } from './types/module-generator.types';
import { GitignoreTemplate } from './templates/GitIgnoteTemplate';
import { TSConfigTemplate } from './templates/TSConfigTemplate';
import { PackageTemplate } from './templates/PackageTemplate';

export class ModuleGeneratorEngine {

    createFile(dirPath: string, fileName: string, contentFileCallback: any) {

        const fullPath = path.join(dirPath, fileName);

        if (fs.existsSync(fullPath)) {
            throw new Error(`❌ File "${fileName}" already exists!`);
        }

        fs.mkdirSync(dirPath, { recursive: true });

        const contentFile = contentFileCallback();

        fs.writeFileSync(fullPath, contentFile);

        console.log(`✅ File created at ${fullPath}`);
    }

    createFolder(dirPath: string, folderName: string): string {

        const fullPath = path.join(dirPath, folderName);

        if (fs.existsSync(fullPath)) {
            throw new Error(`❌ Folder "${folderName}" already exists!`);
        }

        fs.mkdirSync(fullPath, { recursive: true });

        console.log(`✅ Folder created at ${fullPath}`);

        return fullPath;

    }

    toClassFileName(moduleName: string): FileInfo {

        const parts: string[] = moduleName.split("-");
        const fileName = parts.reduce((result, text) => {
            return result + (text[0].toUpperCase() + text.slice(1))
        }, "")

        return {
            name: fileName,
            fullName: `${fileName}.ts`,
            suffix: 'ts'
        };
    }

    basePath(context: string) {
        return path.resolve(process.cwd(), context);
    }

    validSufix(value: string, sufix: string) {

        const isNameValid = value.toLowerCase().endsWith(sufix);

        if (!isNameValid) {
            throw new Error(`❌ Invalid name, required suffix "${sufix}"`);
        }
    }

    createModule(moduleName: string, moduleType: string) {

        const ruleFolderPath = this.createFolder(this.basePath(""), moduleName);

        this.createFile(ruleFolderPath, ".gitignore", () => {
            return GitignoreTemplate.create();
        });

        this.createFile(ruleFolderPath, "tsconfig.json", () => {
            return TSConfigTemplate.create();
        });

        this.createFile(ruleFolderPath, "package.json", () => {
            return PackageTemplate.create(moduleName);
        });

        const sourceFolterPath = this.createFolder(ruleFolderPath, "src");

        this.createFile(sourceFolterPath, "index.ts", () => {
            return PluginTemplate.create(moduleName);
        });

        this.createTest(sourceFolterPath, moduleName, moduleType);

    }

    createPlugin(moduleName: string) {

        this.validSufix(moduleName, "plugin")

        this.createModule(moduleName, ModuleType.PLUGIN);
    }

    createRule(moduleName: string) {

        this.validSufix(moduleName, "rule")

        this.createModule(moduleName, ModuleType.RULE);
    }

    createTest(dirPath: string, moduleName: string, moduleType: typeof ModuleType[keyof typeof ModuleType]) {

        const testFolderPath = this.createFolder(dirPath, "test");

        const fileName = `${moduleName}-test.ts`;
        const className = this.toClassFileName(`test-${moduleName}`)

        this.createFile(testFolderPath, fileName, () => {
            return TestTemplate.create(className.name, moduleType, moduleName);
        });

    }
}
