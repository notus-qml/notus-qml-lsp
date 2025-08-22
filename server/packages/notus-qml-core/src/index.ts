import { addAlias } from 'module-alias';

addAlias('@', __dirname + '/');
addAlias('@core', __dirname + '/core');

export * from "@core/dispatcher/MethodDispatcher"
export * from "@core/logger/LoggerConfig"
export * from "@core/logger/Logger"

export * from "./core/engine/module/DiagnosticPluginEngine"
export * from "./core/engine/module/DiagnosticRuleEngine"
export * from "./core/ast/traverser/ASTTraverser"
export * from "./core/ast/visitor/ASTVisitor"
export * from "./core/context/DiagnosticReportContext"
export * from "./core/ast/finder/ASTNodeFinder"
export * from "./core/helper/LineEndingsHelper"
export * from "./core/utils/RegexRunner"
export * from "./core/utils/CodeAnalyzer"
export * from "./core/engine/module/ModuleEngine"
export * from "./core/manager/RequireManager"

export { default as ModuleVisitor } from "./core/ast/visitor/ModuleVisitor"

export { default as DocumentEngine } from "./core/document/engine/DocumentEngine"
export { default as TreeSitterEngine } from "./core/ast/engine/TreeSitterEngine"

