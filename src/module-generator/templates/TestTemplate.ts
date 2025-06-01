import { ModuleType, TestModuleType } from '../types/module-generator.types';
import { TemplateHelper } from './TemplateHelper';

export class TestTemplate {

    static testModuleByType(moduleType: typeof ModuleType[keyof typeof ModuleType]) {

        const map = new Map<typeof ModuleType[keyof typeof ModuleType], string>([
            [ModuleType.PLUGIN, TestModuleType.PLUGIN],
            [ModuleType.RULE, TestModuleType.RULE]
        ])

        const value = map.get(moduleType);

        if (!value) {
            throw new Error('Module type not suported!')
        }

        return value;

    }

    static create(testName: string, moduleType: typeof ModuleType[keyof typeof ModuleType], moduleName: string) {

        const testModule = TestTemplate.testModuleByType(moduleType)

        const keys: Map<string, string> = new Map();
        keys.set("TestName", testName);
        keys.set("TestModule", testModule);
        keys.set("ModuleName", moduleName);

        return TemplateHelper.create('test.template.txt', keys)

    }

}