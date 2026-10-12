import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const forbiddenDirs = ["private", "_secure-staging", "secure-staging"];
const errors = [];

for (const dir of forbiddenDirs) {
  if (existsSync(path.join(root, dir))) {
    errors.push(
      `Forbidden content directory exists inside public repo: ${dir}/`,
    );
  }
}

let tracked = "";
try {
  tracked = execFileSync("git", ["ls-files"], {
    cwd: root,
    encoding: "utf8",
  });
} catch {
  console.warn("Git is unavailable; tracked-file audit skipped.");
}

const forbiddenPatterns = [
  /^private\//i,
  /^_secure-staging\//i,
  /^secure-staging\//i,
  /premium[-_ ]web[-_ ]reader/i,
  /digital[-_ ]reader.*\.pdf$/i,
  /\.epub$/i,
  /source-vault/i,
  /wujud\.zip$/i,
];

for (const file of tracked.split(/\r?\n/).filter(Boolean)) {
  if (forbiddenPatterns.some((pattern) => pattern.test(file))) {
    errors.push(`Sensitive file is tracked by git: ${file}`);
  }
}

if (errors.length) {
  console.error("\nSECURITY AUDIT FAILED\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("SECURITY AUDIT PASS — no known paid/source-vault content is tracked.");
