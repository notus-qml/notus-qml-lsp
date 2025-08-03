import fs from 'fs'
import { logger } from '../logger/Logger';
import { LspConfig, LspMethod } from 'notus-qml-types';
import FileHelper from './FileHelper';

// TODO remove
// {
//     regex: "\\bQt\\w*",
//     order: 1,
//     description: ""
// },
// {
//     regex: "^[^\"]*$",
//     order: 2,
//     description: ""
// },
// {
//     regex: "/\"/",
//     order: 3,
//     description: ""
// }

const DEFAULT_CONFIG: LspConfig = {
    rules: {
        [LspMethod.Diagnostic]: ["example-rule"],
        [LspMethod.Completion]: ["example-rule"],
        [LspMethod.CodeAction]: ["example-rule"],
        [LspMethod.DidOpen]: ["example-rule"],
        [LspMethod.DidChange]: ["example-rule"],
        [LspMethod.Formatting]: ["example-rule"],
        [LspMethod.Initialize]: []
    },
    plugins: {
        [LspMethod.Diagnostic]: [
            "property-needs-prefix-plugin",
            "property-definition-needs-prefix-plugin"
        ],
        [LspMethod.Completion]: ["property-needs-prefix-plugin"],
        [LspMethod.CodeAction]: ["property-needs-prefix-plugin"],
        [LspMethod.DidOpen]: ["property-needs-prefix-plugin"],
        [LspMethod.DidChange]: ["property-needs-prefix-plugin"],
        [LspMethod.Formatting]: ["property-needs-prefix-plugin"],
        [LspMethod.Initialize]: []
    }
};

export default class ProjectConfigHelper {

    private static fileName(): string {
        return ".notusqmllsp.json"
    }

    static load(rootURI: string | null): LspConfig {

        if (!rootURI) {
            return DEFAULT_CONFIG;
        }

        const settingsPath = FileHelper.rootPathByURI(rootURI, ProjectConfigHelper.fileName());

        if (!fs.existsSync(settingsPath)) {

            logger.warn('ProjectConfigHelper', 'Lsp file dont exists, creating...')

            ProjectConfigHelper.create(settingsPath);

            return DEFAULT_CONFIG;
        }

        try {

            const settingsRaw = fs.readFileSync(settingsPath, 'utf8')

            return JSON.parse(settingsRaw) as LspConfig

        } catch (error) {

            logger.warn('ProjectConfigHelper', 'Fail on load lsp config', error)

            return DEFAULT_CONFIG;
        }

    }

    private static create(settingsPath: string) {

        try {

            fs.writeFileSync(settingsPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf8')

            logger.info('ProjectConfigHelper', 'file create with default values')

        } catch (error) {

            logger.error('ProjectConfigHelper', 'Error on create config file', error)
        }
    }

}