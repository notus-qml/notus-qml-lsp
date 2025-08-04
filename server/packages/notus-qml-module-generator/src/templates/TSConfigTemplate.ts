import { TemplateHelper } from './TemplateHelper';

export class TSConfigTemplate {

    static create() {

        return TemplateHelper.create('tsconfig.template.txt')

    }

}