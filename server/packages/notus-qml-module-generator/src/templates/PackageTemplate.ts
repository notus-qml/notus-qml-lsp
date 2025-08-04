import { TemplateHelper } from './TemplateHelper';

export class PackageTemplate {

    static create(packageName: string) {

        const keys: Map<string, string> = new Map();
        keys.set("PackageName", packageName);

        return TemplateHelper.create('package.template.txt', keys)

    }

}