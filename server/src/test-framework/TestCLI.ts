import "module-alias/register"

import { Command } from 'commander';
import { TestEngine } from './TestEngine';

const program = new Command();

program
    .name('QML LSP Test Framework')
    .description('CLI to run tests')
    .version('1.0.0');

program
    .option('-c, --class <className>', 'Run only a specific test class')
    .option('-t, --test <testName>', 'Run only a specific test')

program.parse();

const options = program.opts();

async function run() {

    const engine = new TestEngine();

    try {
        await engine.run({
            filterClass: options.class,
            filterTest: options.test,
        });
    } catch (exception) {
        console.error(`${exception instanceof Error ? exception.message : exception}`);
        process.exit(1);
    }

}

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

run()