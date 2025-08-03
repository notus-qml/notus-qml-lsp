export type LineEnding = '\n' | '\r\n';

export class LineEndingsHelper {
    public content: string;
    public original: string;
    public lineEnding: LineEnding;
    private lineOffsets: number[];

    constructor() {
        this.original = "";
        this.lineEnding = "\n";
        this.content = "";
        this.lineOffsets = [];
    }

    private detectLineEnding(text: string): LineEnding {
        const crlf = (text.match(/\r\n/g) || []).length;
        const lf = (text.match(/(?<!\r)\n/g) || []).length;
        return crlf > lf ? '\r\n' : '\n';
    }

    private normalizeLineEndings(text: string): string {
        return text.replace(/\r\n?/g, '\n');
    }

    private computeLineOffsets(text: string): number[] {
        const offsets = [0];
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '\n') {
                offsets.push(i + 1);
            }
        }
        return offsets;
    }

    process(text: string) {
        this.original = "";
        this.lineEnding = this.detectLineEnding(text);
        this.content = this.normalizeLineEndings(text);
        this.lineOffsets = this.computeLineOffsets(this.content);
    }

    offsetToPosition(offset: number): { line: number; character: number } {
        let line = 0;
        while (line + 1 < this.lineOffsets.length && this.lineOffsets[line + 1] <= offset) {
            line++;
        }
        return {
            line,
            character: offset - this.lineOffsets[line],
        };
    }

    positionToOffset(line: number, character: number): number {
        return (this.lineOffsets[line] ?? 0) + character;
    }

    nrLinesByDocument(text: string): number {
        return text.split(/\r?\n/).length;
    }

    applyLineEnding(text: string): string {
        return text.replace(/\n/g, this.lineEnding);
    }

    sizeLineEnding() {
        return this.lineEnding.length;
    }
}
