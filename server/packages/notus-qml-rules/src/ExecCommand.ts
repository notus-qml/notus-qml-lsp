#!/usr/bin/env node
import path from "path";
import { readdirSync, existsSync } from "fs";
import { spawnSync } from "child_process";
import { Command } from "commander";

const program = new Command();

program
    .option('-s, --skip <packages>', 'Pacotes a ignorar, separados por vírgula')
    .option('-c, --cmd <command>', 'Comando a executar em cada pacote', 'npm run build')
    .parse(process.argv);

const options = program.opts();

const root = process.cwd();

const skipList = options.skip ? options.skip.split(',') : [];
const ignore = new Set(["node_modules", "build", ...skipList]);

const dirs = readdirSync(root, { withFileTypes: true })
    .filter(d => d.isDirectory() && !ignore.has(d.name));

let failed: string[] = [];

for (const dir of dirs) {
    const pkgPath = path.join(root, dir.name, "package.json");
    if (existsSync(pkgPath)) {

        const [cmd, ...args] = options.cmd.split(' ');

        const result = spawnSync(cmd, args, {
            cwd: path.join(root, dir.name),
            stdio: 'pipe',
            shell: true
        });

        if (result.stdout) {
            console.log(result.stdout.toString());
        }
        if (result.stderr) {
            console.error(result.stderr.toString());
        }

        if (result.status !== 0) {
            console.error(`❌ [EXEC COMMANDER] Falhou em ${dir.name}`);
            failed.push(dir.name);
        }
    }
}

if (failed.length > 0) {
    console.error(`\n⚠️ [EXEC COMMANDER] Falhou nas seguintes regras: ${failed.join(', ')}`);
    process.exit(1);
}
