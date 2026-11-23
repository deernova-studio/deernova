import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname } from 'node:path';
import { main, oneArgs, REGISTRY, TOKEN_KEY, TOKEN_PATH } from '../scripts/publish.mjs';

test('without NPM_TOKEN the publish script reruns itself through One with only the npm token', async () => {
  const code = await main({ env: {}, log: () => {}, publish: () => { throw Error('published without a token'); },
    execute: (command, args) => {
      assert.equal(command, 'one');
      assert.deepEqual(args, oneArgs());
      assert.deepEqual(args.slice(0, 8), ['exec', '--global', '--env', 'prod', '--path', TOKEN_PATH, '--keys', TOKEN_KEY]);
      return 3;
    } });
  assert.equal(code, 3);
});

test('with NPM_TOKEN the token stays in the environment and the temporary npm config is removed', async () => {
  let config;
  const code = await main({ env: { [TOKEN_KEY]: 'secret-value' }, execute: () => { throw Error('unexpected One call'); },
    publish: path => {
      config = path;
      const text = readFileSync(path, 'utf8');
      assert.match(text, new RegExp(`^registry=${REGISTRY}$`, 'm'));
      assert.match(text, /^\/\/registry\.npmjs\.org\/:_authToken=\$\{NPM_TOKEN\}$/m);
      assert.doesNotMatch(text, /secret-value/);
      assert.equal(statSync(path).mode & 0o777, 0o600);
      return 0;
    } });
  assert.equal(code, 0);
  assert.equal(existsSync(dirname(config)), false);
});
