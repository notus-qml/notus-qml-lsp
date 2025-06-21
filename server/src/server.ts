import { MethodDispatcher } from "./core/dispatcher/MethodDispatcher"
import { LoggerConfig } from "./core/logger/LoggerConfig"
import { logger } from "./core/logger/Logger"

LoggerConfig.initialize();

const handleStdout = (message: string) => {
    process.stdout.write(message);
}

logger.info('Server', 'Starting LSP server...');

const methodDispatcher = new MethodDispatcher("", handleStdout);

process.stdin.on("data", (chunk) => methodDispatcher.handleStdin(chunk.toString()));

logger.info('Server', 'LSP server started and listening on stdin');