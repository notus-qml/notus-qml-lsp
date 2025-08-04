# Development Tools

This directory contains development tools and utilities for the NotusQML project.

## Module Generator

The module generator is a CLI tool that helps create new modules and plugins for the NotusQML LSP server.

### Usage

```bash
# Build the tools
npm run build:tools

# Run the module generator
npm run cli:generator

# Or directly
node ./build/tools/module-generator/ModuleGeneratorCLI.js
```

### Features

- Generate new module templates
- Create plugin structures
- Validate module configurations
- Generate test files

## Building Tools

To build only the development tools:

```bash
npm run build:tools
```

This will compile the TypeScript files in the `tools/` directory to `build/tools/`.

## Structure

```
tools/
├── module-generator/
│   ├── ModuleGeneratorEngine.ts
│   ├── ModuleGeneratorCLI.ts
│   ├── types/
│   └── templates/
└── tsconfig.json
``` 