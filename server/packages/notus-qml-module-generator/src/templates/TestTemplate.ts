import { TestModuleType } from '../types/module-generator.types';
import { TemplateHelper } from './TemplateHelper';

export class TestTemplate {

    static testModuleType() {
        return TestModuleType.RULE;
    }

    static create(testName: string, moduleName: string) {

        const testModule = TestTemplate.testModuleType()

        const keys: Map<string, string> = new Map();
        keys.set("TestName", testName);
        keys.set("TestModule", testModule);
        keys.set("ModuleName", moduleName);

        return TemplateHelper.create('test.template.txt', keys)

    }

}