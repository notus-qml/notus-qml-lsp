import { logger, LogLevel } from "./Logger";

export class LoggerConfig {
    static initialize(): void {

        const logLevel = process.env.LSP_LOG_LEVEL?.toUpperCase();

        if (logLevel) {
            switch (logLevel) {
                case 'DEBUG':
                    logger.setLogLevel(LogLevel.DEBUG);
                    break;
                case 'INFO':
                    logger.setLogLevel(LogLevel.INFO);
                    break;
                case 'WARN':
                    logger.setLogLevel(LogLevel.WARN);
                    break;
                case 'ERROR':
                    logger.setLogLevel(LogLevel.ERROR);
                    break;
                case 'NONE':
                    logger.setLogLevel(LogLevel.NONE);
                    break;
                default:
                    logger.setLogLevel(LogLevel.INFO);
            }
        }

        const enableLogging = process.env.LSP_ENABLE_LOGGING;
        if (enableLogging !== undefined) {
            logger.setEnabled(enableLogging.toLowerCase() === 'true');
        }

        const logFile = process.env.LSP_LOG_FILE;
        if (logFile) {
            logger.setLogFile(logFile);
        }

        logger.info('Logger', 'Logger initialized', {
            level: LogLevel[logger['logLevel']],
            enabled: logger['isEnabled'],
            logFile: logger['logFile']
        });
    }
} 