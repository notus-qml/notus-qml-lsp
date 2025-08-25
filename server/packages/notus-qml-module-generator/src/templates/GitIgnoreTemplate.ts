import { TemplateHelper } from './TemplateHelper';

export class GitignoreTemplate {

    static create() {

        return TemplateHelper.create('gitignore.template.txt')

    }

}