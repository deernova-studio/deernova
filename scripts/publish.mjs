import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROOT, isMain } from './lib/files.mjs';
import { runChild } from './deploy-credentials.mjs';

// Publishes every workspace package whose current version is not on npm yet. @deernova/style moves with
// each release; page and icons keep their own versions and are skipped until someone bumps them.
// A package marked private is never published. The registry is pinned so a mirror set in ~/.npmrc is never the target.
export const REGISTRY = 'https://registry.npmjs.org/';
export const PACKAGES = ['style', 'page', 'icons', 'logos'];

// The npm token lives in Infisical next to the deployment credentials, so any maintainer machine logged in
// to One can publish. CI or a one-off run can still pass NPM_TOKEN directly.
export const TOKEN_ENVIRONMENT = 'prod';
export const TOKEN_PATH = '/deernova-npm';
export const TOKEN_KEY = 'NPM_TOKEN';

export function oneArgs(script = join(ROOT, 'scripts/publish.mjs')) {
  return ['exec', '--global', '--env', TOKEN_ENVIRONMENT, '--path', TOKEN_PATH, '--keys', TOKEN_KEY, '--', process.execPath, script];
}

// npm expands ${NPM_TOKEN} itself, so the token is never written to disk. The file replaces ~/.npmrc for these
// commands, which keeps an old token or a mirror registry there from getting in the way.
export function writeUserConfig(directory) {
  const path = join(directory, 'npmrc');
  writeFileSync(path, `registry=${REGISTRY}\n//registry.npmjs.org/:_authToken=\${${TOKEN_KEY}}\n`, { mode: 0o600 });
  return path;
}

function publishAll(userconfig) {
  const npm = (args, options = {}) => spawnSync('npm', [...args, '--registry', REGISTRY, '--userconfig', userconfig], { cwd: ROOT, ...options });
  const who = npm(['whoami'], { encoding: 'utf8' });
  if (who.status !== 0) {
    console.error(`The npm token in Infisical (${TOKEN_ENVIRONMENT}, ${TOKEN_PATH}, ${TOKEN_KEY}) was rejected. Replace it with a fresh granular token that can publish @deernova packages.`);
    return 1;
  }
  console.log(`Publishing as ${who.stdout.trim()}.`);
  for (const name of PACKAGES) {
    const { version, private: unpublished } = JSON.parse(readFileSync(join(ROOT, `packages/${name}/package.json`), 'utf8'));
    const spec = `@deernova/${name}@${version}`;
    if (unpublished) {
      console.log(`Skipping ${spec}: private.`);
      continue;
    }
    const published = npm(['view', spec, 'version'], { encoding: 'utf8' });
    if (published.status === 0 && published.stdout.trim() === version) {
      console.log(`Skipping ${spec}: already on npm.`);
      continue;
    }
    const result = npm(['publish', '--workspace', `@deernova/${name}`, '--access', 'public'], { stdio: 'inherit' });
    if (result.status !== 0) {
      console.error(`Stopped at ${spec}. Verify registry state before retrying; already published versions cannot be reused.`);
      return result.status || 1;
    }
  }
  return 0;
}

export async function main({ env = process.env, execute = runChild, publish = publishAll, log = console.log } = {}) {
  if (!env[TOKEN_KEY]) {
    log(`Loading the npm token from Infisical (${TOKEN_ENVIRONMENT}, ${TOKEN_PATH})…`);
    return execute('one', oneArgs());
  }
  const directory = mkdtempSync(join(tmpdir(), 'deernova-npm-'));
  try { return await publish(writeUserConfig(directory)); }
  finally { rmSync(directory, { recursive: true, force: true }); }
}

if (isMain(import.meta.url)) {
  try { process.exitCode = await main(); }
  catch (error) { console.error(`deernova publish: ${error.message}`); process.exitCode = 1; }
}
