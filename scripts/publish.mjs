import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// Publishes every workspace package whose current version is not on npm yet. @deernova/style moves with
// each release; page and icons keep their own versions and are skipped until someone bumps them.
// A package marked private is never published. The registry is pinned so a mirror set in ~/.npmrc is never the target.
const REGISTRY = 'https://registry.npmjs.org/';
for (const name of ['style', 'page', 'icons']) {
  const { version, private: unpublished } = JSON.parse(readFileSync(`packages/${name}/package.json`, 'utf8'));
  const spec = `@deernova/${name}@${version}`;
  if (unpublished) {
    console.log(`Skipping ${spec}: private.`);
    continue;
  }
  const published = spawnSync('npm', ['view', spec, 'version', '--registry', REGISTRY], { encoding: 'utf8' });
  if (published.status === 0 && published.stdout.trim() === version) {
    console.log(`Skipping ${spec}: already on npm.`);
    continue;
  }
  const result = spawnSync('npm', ['publish', '--workspace', `@deernova/${name}`, '--access', 'public', '--registry', REGISTRY], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`Stopped at ${spec}. Verify registry state before retrying; already published versions cannot be reused.`);
    process.exit(result.status || 1);
  }
}
