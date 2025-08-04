import { DocumentEngine, TreeSitterEngine, ASTTraverser, ASTVisitor } from "notus-qml-core";
import { TestExecutor } from "./TestExecutor";
import { TestCase } from "@test/types/test.types";
import { LspMethod } from "notus-qml-types";

export class TestDiagnosticExecutor extends TestExecutor {

    private VisitorType: new () => ASTVisitor;

    constructor(moduleName: string, VisitorType: new () => ASTVisitor) {
        super(moduleName)
        this.VisitorType = VisitorType;
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

        const visitor = new this.VisitorType();

        visitor.setLspConfig?.(
            {
                rules: {
                    [LspMethod.Diagnostic]: [this.moduleName]
                },
                plugins: {
                    [LspMethod.Diagnostic]: [this.moduleName]
                }
            }
        )

        visitor.setMethod?.(LspMethod.Diagnostic, context);

        transverser.preOrder(tree.rootNode, visitor);

        if (!reportThrowed && reportExpected) {
            throw new Error(`❌ Comparation failed, report defined but not throwed`);
        }

        if (!logExpected && logThrowed) {
            throw new Error(`❌ Comparation failed, log defined but not throwed`);
        }

    }

}