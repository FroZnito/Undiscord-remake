// Prepares a release: bumps the version, checks + builds, commits and tags.
// Usage: npm run release -- patch | minor | major | 1.2.3
// Then publish with: git push --follow-tags  (GitHub Actions creates the release)

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const run = cmd => execSync(cmd, { stdio: 'inherit' });
const out = cmd => execSync(cmd, { encoding: 'utf8' }).trim();
const fail = msg => {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
};
const readJson = file => JSON.parse(readFileSync(file, 'utf8'));
const writeJson = (file, data) => writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);

const arg = process.argv[2];
const pkg = readJson('package.json');
const [major, minor, patch] = pkg.version.split('.').map(Number);
const next = /^\d+\.\d+\.\d+$/.test(arg ?? '') ? arg
  : arg === 'major' ? `${major + 1}.0.0`
  : arg === 'minor' ? `${major}.${minor + 1}.0`
  : arg === 'patch' ? `${major}.${minor}.${patch + 1}`
  : fail('Indique la version : npm run release -- patch | minor | major | 1.2.3');

if (out('git branch --show-current') !== 'main') fail('Les versions se publient depuis la branche main.');
const dirty = out('git status --porcelain').split('\n').filter(l => l && !l.endsWith('CHANGELOG.md'));
if (dirty.length) fail(`Commite d'abord ces fichiers :\n${dirty.join('\n')}`);
if (out(`git tag -l v${next}`)) fail(`Le tag v${next} existe déjà.`);
const escaped = next.replace(/\./g, '\\.');
if (!new RegExp(`^## \\[${escaped}\\]`, 'm').test(readFileSync('CHANGELOG.md', 'utf8'))) {
  fail(`Ajoute d'abord une section « ## [${next}] » dans CHANGELOG.md.`);
}

console.log(`\n→ ${pkg.version} → ${next}\n`);
pkg.version = next;
writeJson('package.json', pkg);
const lock = readJson('package-lock.json');
lock.version = next;
if (lock.packages?.['']) lock.packages[''].version = next;
writeJson('package-lock.json', lock);

run('npm run check');
run('git add package.json package-lock.json CHANGELOG.md dist/undiscord-remake.user.js');
run(`git commit -m "Release v${next}"`);
run(`git tag -a v${next} -m "Undiscord Remake v${next}"`);
console.log(`\n✔ v${next} est prête. Publie-la avec :\n  git push --follow-tags\n`);
