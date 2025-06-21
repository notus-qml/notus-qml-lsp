import * as fs from 'fs';
import * as path from 'path';

export class TemplateHelper {

    static replaceKeys(keys: Map<string, string>, template: string) {

        var content = template;

        for (const [key, value] of keys) {
            content = content.replace(new RegExp(`{{${key}}}`, 'g'), value)
        }

        return content;

    }

    static create(templateName: string, keys: Map<string, string>) {

        const templatePath = path.resolve(__dirname, `files/${templateName}`);
        const template = fs.readFileSync(templatePath, 'utf-8');

        return TemplateHelper.replaceKeys(keys, template)
    }

}