import { LSPRange } from "notus-qml-types";
import { LineEndingsHelper } from "../helper/LineEndingsHelper";

export interface RegexRunnerMatch {
    match: RegExpExecArray;
    range: LSPRange;
}

export class RegexRunner {

    private lineEndings: LineEndingsHelper;

    constructor(lineEndings: LineEndingsHelper) {
        this.lineEndings = lineEndings
    }

    process(text: string) {
        this.lineEndings.process(text)
    }

    public run(pattern: string | RegExp, flags?: string): RegexRunnerMatch[] {

        const results: RegexRunnerMatch[] = [];

        let regex: RegExp;

        if (pattern instanceof RegExp) {
            const finalFlags = pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g";
            regex = new RegExp(pattern.source, finalFlags);
        } else {
            const finalFlags = flags?.includes("g") ? flags : (flags || "") + "g";
            regex = new RegExp(pattern, finalFlags);
        }

        let match;
        while ((match = regex.exec(this.lineEndings.original)) !== null) {

            const startOffset = match.index;
            const endOffset = match.index + match[0].length;

            results.push({
                match: match,
                range: {
                    start: this.lineEndings.offsetToPosition(startOffset),
                    end: this.lineEndings.offsetToPosition(endOffset)
                }
            });
        }

        return results;
    }
}
