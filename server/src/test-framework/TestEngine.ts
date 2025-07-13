import * as path from 'path';
import * as fs from 'fs';

import { TestFile } from './types/test.types';

export class TestEngine {

    async importFiles(testFiles: TestFile[]) {
        return Promise.all(testFiles.map(testFile => import(testFile.path)));
    }

    async load() {

        // TODO add rules, change to absolute path
        const pathsTest = ['../plugins/test']
        const extensionsAcceptable = ['.js', '.ts']

        const testFiles: TestFile[] = pathsTest.flatMap((pathTest): TestFile[] => {

            const dirPath = path.resolve(__dirname, pathTest);
            const files = fs.readdirSync(dirPath)

            const testFiles: TestFile[] = files.map((file): TestFile => {
                return {
                    name: file,
                    path: path.join(dirPath, file)
                }
            });

            return testFiles.filter(testFile => {
                return extensionsAcceptable.some((extension) => testFile.name.endsWith(extension))
            });
        });

        const modules = await this.importFiles(testFiles)

        return modules.map((module) => {
            return module[Object.keys(module)[0]];
        })

    }

    applyFilterClass(filterClass: string | undefined, testClasses: any) {

        if (!filterClass) {
            return;
        }

        testClasses = testClasses.filter((TestClass: any) => {
            return TestClass.name.toLowerCase().includes(filterClass.toLowerCase())
        })

        if (testClasses.length === 0) {
            throw new Error("Case of test not founded!")
        }
    }

    applyFilterTest(filterTest: string | undefined, tests: any[]) {
        if (!filterTest) {
            return;
        }

        tests = tests.filter((test: any) => {
            return test.method.toLowerCase().includes(filterTest.toLowerCase()) ||
                test.name.toLowerCase().includes(filterTest.toLowerCase())
        })

        if (tests.length === 0) {
            throw new Error("Test not founded!")
        }
    }

    async run({
        filterClass,
        filterTest,
    }: {
        filterClass?: string;
        filterTest?: string;
    }) {

        var testClasses = await this.load();

        this.applyFilterClass(filterClass, testClasses)

        for (const TestClass of testClasses) {

            const instance = new TestClass();
            var tests = TestClass.tests || [];

            this.applyFilterTest(filterTest, tests)

            console.log(`\nRunning ${tests.length} test(s) from ${TestClass.name}...\n`);

            for (const test of tests) {
                try {
                    instance[test.method].call(instance);
                    console.log(`✅ ${test.name ?? test.method}`);
                } catch (exception) {
                    console.error(`❌ ${test.name}`);
                    console.error(`   ${exception instanceof Error ? exception.message : exception}`);
                }
            }
        }
    }
}
