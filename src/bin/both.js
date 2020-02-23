import { spawn } from "child_process";

function run(script) {
  return spawn("npm", ["run", script], { stdio: "inherit" });
}

function main() {
  run("start:trusted");
  run("start:attacker");
}

main();

