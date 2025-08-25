import fs from 'fs'
import { logger } from '../logger/Logger';
import { LspConfig, WorkspaceFolder } from 'notus-qml-types';
import FileHelper from './FileHelper';

const DEFAULT_CONFIG: LspConfig = {
    diagnostic: {
        rules: [
            "invalid-function-definition-rule",
            "property-definition-needs-prefix-rule",
            "property-needs-prefix-rule",
        ],
        plugins: [],
        params: {
            "anonymous-function-acceptable-size": {
                nrLinesAcceptable: 4
            }
        }
    },
    formatting: [
        {
            regex: "\\bQt\\w*",
            order: 1,
            description: "Qt groups first"
        },
        {
            regex: "^[^\"]*$",
            order: 2,
            description: ""
        },
        {
            regex: "/\"/",
            order: 3,
            description: ""
        }
    ],
    paths: {
        plugin: ""
    }
};

export default class ProjectConfigHelper {

    private static fileName(): string {
        return ".notusqmllsp.json"
    }

    static load(rootURI: string | null, workspaceFolders: WorkspaceFolder[] | null | undefined): LspConfig {

        if (!rootURI && !workspaceFolders) {
            return DEFAULT_CONFIG;
        }

        const uri = workspaceFolders?.at(0)?.uri ?? rootURI as string;

        const settingsPath = FileHelper.rootPathByURI(uri, ProjectConfigHelper.fileName());

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