#!/usr/bin/env node
/**
 * Führt Playwright-Review und ICP-Scorecard nacheinander aus,
 * während ein Production-Server auf :3000 läuft.
 */
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = process.env.REVIEW_PORT ?? "3000";
const baseURL = `http://localhost:${port}`;

function run(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env: { ...process.env, ...env },
      shell: process.platform === "win32",
    });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
      }
    });
  });
}

async function waitForServer(maxAttempts = 60) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch(baseURL, { method: "HEAD" });
      if (response.ok || response.status < 500) {
        return;
      }
    } catch {
      // retry
    }
    await delay(500);
  }
  throw new Error(`Server not reachable at ${baseURL}`);
}

let serverProcess;

try {
  serverProcess = spawn("npx", ["next", "start", "-p", port], {
    stdio: "pipe",
    env: process.env,
    shell: process.platform === "win32",
  });

  await waitForServer();

  await run("npm", ["run", "review:website"], {
    PLAYWRIGHT_SKIP_WEBSERVER: "1",
    PLAYWRIGHT_BASE_URL: baseURL,
  });

  await run("npm", ["run", "review:icp"], {
    PLAYWRIGHT_BASE_URL: baseURL,
  });
} finally {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill("SIGTERM");
  }
}
