import { RequestMessage } from "../../types/module.types";
import { MethodEngine } from "../engine/MethodEngine";
import { logger } from "../logger/Logger";

type StdoutCallback = (response: string) => void;

export class MethodDispatcher {

    private buffer: string;
    private stdoutCallback: any;
    private methodEngine: MethodEngine;

    constructor(buffer: string, stdoutCallback: StdoutCallback) {
        this.buffer = buffer;
        this.stdoutCallback = stdoutCallback;
        this.methodEngine = new MethodEngine();

        logger.info('MethodDispatcher', 'Initialized successfully');
    }

    handleStdin(chunk: string) {

        this.buffer += chunk;

        while (true) {
            const lengthMatch = this.buffer.match(/Content-Length: (\d+)\r\n/);

            if (!lengthMatch) {
                break;
            }

            const contentLength = parseInt(lengthMatch[1], 10);
            const messageStart = this.buffer.indexOf("\r\n\r\n") + 4;

            if (this.buffer.length < messageStart + contentLength) {
                break;
            }

            const rawMessage = this.buffer.slice(messageStart, messageStart + contentLength);

            try {

                const message = JSON.parse(rawMessage);

                logger.debug('MethodDispatcher', 'Received message', {
                    method: message.method,
                    id: message.id,
                    params: message.params
                });

                const result: any = this.methodEngine.execute(message.method, message)

                if (result) {
                    this.handleStdout(message.id, result);
                }

            } catch (error: any) {
                logger.error('MethodDispatcher', 'Failed to process request', error);
            }

            this.buffer = this.buffer.slice(messageStart + contentLength);

        }

    }

    handleStdout(id: RequestMessage['id'], result: object | null): string {
        const message: string = JSON.stringify({ id, result });
        return this.stdoutCallback(this.handleResponse(message));
    }

    private handleResponse(message: string): string {
        const messageLength = Buffer.byteLength(message, "utf-8");
        const header = `Content-Length: ${messageLength}\r\n\r\n`;
        const response = header + message;
        return response;
    }

}