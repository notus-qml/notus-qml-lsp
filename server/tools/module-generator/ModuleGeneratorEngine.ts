import * as fs from 'fs';
import * as path from 'path';

// TODO change to use alias @
import { PluginTemplate } from './templates/PluginTemplate';
import { RuleTemplate } from './templates/RuleTemplate';
import { TestTemplate } from './templates/TestTemplate';
import { FileInfo, ModuleType } from './types/module-generator.types';

// TODO change to absolute path
const rulesContextPath = "../../../src/rules"
const pluginsContextPath = "../../../src/plugins"

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

    toModuleFileName(className: string): FileInfo {

        const parts: string[] = className.split(/(?=[A-Z])/);
        const fileName = parts.join('-').toLowerCase();

        return {
            name: fileName,
            fullName: `${fileName}.ts`,
            suffix: 'ts'
        };
    }

    basePath(context: string) {
        return path.resolve(__dirname, context);
    }

    validSufix(value: string, sufix: string) {

        const isNameValid = value.toLowerCase().endsWith(sufix);

        if (!isNameValid) {
            throw new Error(`❌ Invalid name, required suffix "${sufix}"`);
        }
    }

    createPlugin(className: string) {

        this.validSufix(className, "plugin")

        const fileName: FileInfo = this.toModuleFileName(className);
        const dirPath = this.basePath(pluginsContextPath);

        this.createFile(dirPath, fileName.fullName, () => {
            return PluginTemplate.create(fileName.name);
        });

        this.createTest(fileName.name, className, ModuleType.PLUGIN);
    }

    createRule(className: string) {

        this.validSufix(className, "rule")

        const fileName = this.toModuleFileName(className);
        const dirPath = this.basePath(rulesContextPath);

        this.createFile(dirPath, fileName.fullName, () => {
            return RuleTemplate.create(fileName.name);
        });

        this.createTest(fileName.name, className, ModuleType.RULE);
    }

    testPathByModule(moduleType: typeof ModuleType[keyof typeof ModuleType]) {

        const map = new Map<string, string>([
            [ModuleType.PLUGIN, pluginsContextPath],
            [ModuleType.RULE, rulesContextPath]
        ]);

        const basePath = map.get(moduleType);

        if (!basePath) {
            throw new Error('Module type not suported');
        }

        return path.resolve(__dirname, path.join(basePath, 'test'))

    }

    createTest(moduleName: string, className: string, moduleType: typeof ModuleType[keyof typeof ModuleType]) {

        const fileName = this.toModuleFileName(`${className}Test`);
        const dirPath = this.testPathByModule(moduleType);

        this.createFile(dirPath, fileName.fullName, () => {
            return TestTemplate.create(className, moduleType, moduleName);
        });

    }
}
