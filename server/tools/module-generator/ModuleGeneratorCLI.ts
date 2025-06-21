import "module-alias/register"

import { Command } from 'commander';
import { ModuleGeneratorEngine } from './ModuleGeneratorEngine';

const program = new Command();

function handleExceptionAdvice(callback: any) {
    try {
        callback()
    } catch (exception) {
        console.error(`${exception instanceof Error ? exception.message : exception}`);
    }
}

program
    .command('make:plugin')
    .description('Create a new plugin')
    .argument('<name>', 'Plugin name')
    .action((name) => {
        handleExceptionAdvice(() => {
            new ModuleGeneratorEngine().createPlugin(name)
        })
    });

program
    .command('make:rule')
    .description('Create a new rule')
    .argument('<name>', 'Rule name')
    .action((name) => {
        handleExceptionAdvice(() => {
            new ModuleGeneratorEngine().createRule(name)
        })
    });

program.parse();
