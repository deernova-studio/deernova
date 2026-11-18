import { chmod, cp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, hashTree, isMain, read, write } from './lib/files.mjs';
import { staleTokenOutputs } from './tokens.mjs';

// Each skill ships in its own npm package. Every package reuses the style package's installer CLI,
// which reads the skill name from the manifest written here.
export const SKILLS = [
  { name: 'deernova-style', package: 'style' },
  { name: 'deernova-page', package: 'page' }
];
const CLI_SOURCE = 'packages/style/bin/cli.mjs';

// The npm package ships the skill folder unchanged, plus a manifest the installer uses for update checks.
export async function buildSkill({ root = ROOT, name = 'deernova-style' } = {}) {
  const skill = SKILLS.find(entry => entry.name === name);
  if (!skill) throw Error(`Unknown skill: ${name}`);
  const pkg = join(root, 'packages', skill.package);
  const out = join(pkg, 'skill');
  if (name === 'deernova-style') {
    const stale = await staleTokenOutputs(root);
    if (stale.length) throw Error(`Out of date, run npm run tokens: ${stale.join(', ')}`);
  }
  const { name: packageName, version } = JSON.parse(await read(join(pkg, 'package.json')));
  await rm(out, { recursive: true, force: true });
  await cp(join(root, 'skills', name), out, { recursive: true, filter: source => !source.endsWith('.DS_Store') });
  if (join(pkg, 'bin/cli.mjs') !== join(root, CLI_SOURCE)) {
    await cp(join(root, CLI_SOURCE), join(pkg, 'bin/cli.mjs'));
    await chmod(join(pkg, 'bin/cli.mjs'), 0o755);
  }
  const manifest = { name, package: packageName, version, sourceHash: await hashTree(out) };
  await write(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

export async function buildSkills(options = {}) {
  const manifests = [];
  for (const { name } of SKILLS) manifests.push(await buildSkill({ ...options, name }));
  return manifests;
}

if (isMain(import.meta.url)) {
  for (const manifest of await buildSkills()) console.log(`Built ${manifest.name} ${manifest.version} into packages/.`);
}
