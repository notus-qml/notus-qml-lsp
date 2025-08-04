import { addAlias } from 'module-alias';

addAlias('@test', __dirname + '/');

export * from "./TestUtils"
export * from "./executor/TestExecutor"