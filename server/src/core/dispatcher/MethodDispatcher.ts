import { ErrorCodeKind } from "@/types/lsp/error.types";
import { MethodEngine } from "@core/engine/MethodEngine";
import { logger } from "@core/logger/Logger";
import { ErrorResultBuilder } from "../builder/error/ErrorResultBuilder";
import { RequestMessage } from "@/types/lsp/message.types";

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

    async handleStdin(chunk: string) {

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
            const message = JSON.parse(rawMessage);

            try {

                logger.debug('MethodDispatcher', 'Received message', {
                    method: message.method,
                    id: message.id,
                    params: message.params
                });

                const result: any = await this.methodEngine.execute(message.method, message)

                if (result) {
                    this.handleResponse(message.id, result);
                }

            } catch (error: any) {

                logger.error('MethodDispatcher', 'Failed to process request', error);

                if (message?.id) {

                    const result = new ErrorResultBuilder()
                        .setCode(ErrorCodeKind.InternalError)
                        .setMessage("Internal error: Failed to process request")
                        .build()

                    this.handleResponse(message.id, result)

                }

            }

            this.buffer = this.buffer.slice(messageStart + contentLength);

        }

    }

    handleNotification() {
        // TODO implement
    }

    handleResponse(id: RequestMessage['id'], result: object | null): string {
        const message: string = JSON.stringify({ id, result });
        return this.stdoutCallback(this.handleContentResponse(message));
    }

    private handleContentResponse(message: string): string {
        const messageLength = Buffer.byteLength(message, "utf-8");
        const header = `Content-Length: ${messageLength}\r\n\r\n`;
        const response = header + message;
        return response;
    }

}