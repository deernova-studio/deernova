import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

// Screenshots every page an eval run produced, light and dark, at the brief's 1280×800.
// Usage: node evals/render.mjs evals/runs/2026-11-22
// Writes <run>/shots/<variant>-<page>-<theme>.png. Needs Google Chrome.
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const run = resolve(process.argv[2] ?? '');
const exec = promisify(execFile);
const shots = join(run, 'shots');
await mkdir(shots, { recursive: true });
const work = await mkdtemp(join(tmpdir(), 'deernova-eval-'));
try {
  for (const variant of ['baseline', 'deernova']) {
    for (const file of (await readdir(join(run, variant))).filter(name => name.endsWith('.html'))) {
      for (const theme of ['light', 'dark']) {
        const out = join(shots, `${variant}-${file.replace('.html', '')}-${theme}.png`);
        await exec(CHROME, [
          '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
          '--allow-file-access-from-files', `--user-data-dir=${join(work, theme)}`, '--window-size=1280,800',
          `--blink-settings=preferredColorScheme=${theme === 'dark' ? 0 : 1}`,
          `--screenshot=${out}`, pathToFileURL(join(run, variant, file)).href
        ]);
        console.log(out);
      }
    }
  }
} finally {
  await rm(work, { recursive: true, force: true });
}
