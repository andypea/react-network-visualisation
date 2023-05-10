import { execSync } from "child_process";
import { exit } from "process";
import { readFileSync } from "fs";

const untrackedFiles = execSync(
  "git ls-files --other --exclude-standard --directory"
).toString();

if (untrackedFiles !== "") {
  console.error("ERROR: The package contains the following untracked files:");
  console.error(untrackedFiles);
  exit(1);
}

const modifiedFiles = execSync("git diff --name-only HEAD").toString();

if (modifiedFiles !== "") {
  console.error("ERROR: The package contains the following modified files:");
  console.error(modifiedFiles);
  exit(2);
}

const gitTag = execSync("git tag --points-at HEAD").toString().trim();

const packageVersion = JSON.parse(
  readFileSync("package.json", "utf8")
).version.trim();

if (gitTag !== "v".concat(packageVersion)) {
  console.error("ERROR: The git tag does not match the package version.");
  console.error("git tag: ".concat(gitTag));
  console.error("package version: ".concat(packageVersion));
  exit(3);
}
