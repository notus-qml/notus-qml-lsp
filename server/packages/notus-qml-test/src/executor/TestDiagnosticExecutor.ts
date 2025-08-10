import { DocumentEngine, TreeSitterEngine, ASTTraverser, ModuleVisitor, CodeAnalyzer } from "notus-qml-core";
import { TestExecutor } from "./TestExecutor";
import { TestCase } from "@test/types/test.types";
import { LspMethod } from "notus-qml-types";
import { TestModuleEngine } from "@test/TestModuleEngine";

export class TestDiagnosticExecutor extends TestExecutor {

    private codeAnalyzer: CodeAnalyzer;

    constructor(moduleName: string) {
        super(moduleName)
        this.codeAnalyzer = new CodeAnalyzer()
    }

    exec(testCase: TestCase): void {

        const logExpected: boolean = typeof testCase.log === 'function';
        const reportExpected: boolean = typeof testCase.report === 'function';

        var reportThrowed = false;
        var logThrowed = false;

        const context = {
            log: (msg: string) => {

                logThrowed = true;

                if (!logExpected) {
                    throw new Error(`❌ Comparation failed, log throwed but not defined`);
                }

                testCase?.log?.(msg);

            },
            report: (data: any) => {

                reportThrowed = true;

                if (!reportExpected) {
                    throw new Error(`❌ Comparation failed, report throwed but not defined`);
                }

                testCase?.report?.(data);

            },
        }

        const documentEngine = new DocumentEngine(new TreeSitterEngine());

        const tree = documentEngine.parse(testCase.code);

        const transverser = new ASTTraverser();

        const testModuleEngine = new TestModuleEngine(context, this.moduleName);

        const visitor = new ModuleVisitor(testModuleEngine);

        visitor.setMethod?.(LspMethod.Diagnostic, context);

        transverser.preOrder(tree.rootNode, visitor);

        this.codeAnalyzer.process(tree.rootNode.text);

        testModuleEngine.runByCode(this.codeAnalyzer)

        if (!reportThrowed && reportExpected) {
            throw new Error(`❌ Comparation failed, report defined but not throwed`);
        }

        if (!logExpected && logThrowed) {
            throw new Error(`❌ Comparation failed, log defined but not throwed`);
        }

    }

}