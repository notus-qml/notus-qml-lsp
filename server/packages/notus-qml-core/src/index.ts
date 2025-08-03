import { addAlias } from 'module-alias';

addAlias('@', __dirname + '/');
addAlias('@core', __dirname + '/core');

export * from "@core/dispatcher/MethodDispatcher"
export * from "@core/logger/LoggerConfig"
export * from "@core/logger/Logger"

export * from "./core/engine/module/PluginEngine"
export * from "./core/engine/module/RuleEngine"
export * from "./core/ast/traverser/ASTTraverser"
export * from "./core/ast/visitor/ASTVisitor"
export * from "./core/context/DiagnosticReportContext"
export * from "./core/ast/finder/ASTNodeFinder"

export { default as PluginVisitor } from "./core/ast/visitor/PluginVisitor";
export { default as RuleVisitor } from "./core/ast/visitor/PluginVisitor";

export { default as DocumentEngine } from "./core/document/engine/DocumentEngine"
export { default as TreeSitterEngine } from "./core/ast/engine/TreeSitterEngine"

