import { LineEndingsHelper } from "../helper/LineEndingsHelper";
import { RegexRunner } from "./RegexRunner";

export class CodeAnalyzer {

    public code: string;
    public regexRunner: RegexRunner;
    public lineEndings: LineEndingsHelper;

    constructor() {
        this.code = "";
        this.lineEndings = new LineEndingsHelper();
        this.regexRunner = new RegexRunner(this.lineEndings);
    }

    process(code: string) {
        this.code = code;
        this.regexRunner.process(code);
    }

}