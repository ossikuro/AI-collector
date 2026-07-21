import { spawn } from 'node:child_process';

const suites = {
  ui: ['tests/ui/Button/Button.spec.mjs', 'tests/ui/ProviderCard/ProviderCard.spec.mjs'],
};

const requestedSuite = process.argv[2];
const testFiles = requestedSuite ? suites[requestedSuite] : Object.values(suites).flat();

if (!testFiles) {
  console.error(`Unknown test suite: ${requestedSuite}`);
  process.exit(1);
}

for (const testFile of testFiles) {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [testFile], {
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${testFile} failed with exit code ${code}`));
    });
  });
}
