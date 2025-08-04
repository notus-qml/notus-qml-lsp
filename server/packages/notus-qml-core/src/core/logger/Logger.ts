export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4
}

export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    category: string;
    message: string;
    data?: any;
}

export class Logger {
    private logLevel: LogLevel = LogLevel.INFO;
    private isEnabled: boolean = true;
    private logFile?: string;

    constructor() { }

    setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    setEnabled(enabled: boolean): void {
        this.isEnabled = enabled;
    }

    setLogFile(filePath: string): void {
        this.logFile = filePath;
    }

    private shouldLog(level: LogLevel): boolean {
        return this.isEnabled && level >= this.logLevel;
    }

    private formatLog(entry: LogEntry): string {
        const timestamp = entry.timestamp;
        const levelName = LogLevel[entry.level];
        const category = entry.category;
        const message = entry.message;
        const data = entry.data ? ` | Data: ${JSON.stringify(entry.data)}` : '';

        return `[${timestamp}] ${levelName} [${category}] ${message}${data}`;
    }

    private writeLog(entry: LogEntry): void {
        if (!this.shouldLog(entry.level)) return;

        const formattedLog = this.formatLog(entry);

        // Sempre escrever no stderr para não interferir com LSP
        process.stderr.write(formattedLog + '\n');

        if (this.logFile) {
            // TODO Implementar escrita em arquivo
        }
    }

    debug(category: string, message: string, data?: any): void {
        this.writeLog({
            timestamp: new Date().toISOString(),
            level: LogLevel.DEBUG,
            category,
            message,
            data
        });
    }

    info(category: string, message: string, data?: any): void {
        this.writeLog({
            timestamp: new Date().toISOString(),
            level: LogLevel.INFO,
            category,
            message,
            data
        });
    }

    warn(category: string, message: string, data?: any): void {
        this.writeLog({
            timestamp: new Date().toISOString(),
            level: LogLevel.WARN,
            category,
            message,
            data
        });
    }

    error(category: string, message: string, error?: any): void {
        this.writeLog({
            timestamp: new Date().toISOString(),
            level: LogLevel.ERROR,
            category,
            message,
            data: error ? {
                message: error.message,
                stack: error.stack,
                ...error
            } : undefined
        });
    }
}

export const logger = new Logger();;