import { readFileSync } from "node:fs";
import { createRequire, Module } from "node:module";
import path from "node:path";
import ts from "typescript";

// Evaluate the existing TypeScript registries without adding a test runner.
const require = createRequire(import.meta.url);
Module._extensions[".ts"] = (module, filename) => {
  const source = readFileSync(filename, "utf8").replaceAll('"@/', '"' + process.cwd().replaceAll("\\", "/") + "/");
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
};
export const loadRegistry = (file) => require(path.resolve(file));
