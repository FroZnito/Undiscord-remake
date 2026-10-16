// Prints the CHANGELOG.md section of a version (used for the GitHub release notes).
// Usage: node scripts/release-notes.mjs 1.1.0

import { readFileSync } from 'node:fs';

const version = process.argv[2];
const lines = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8').split(/\r?\n/);
const start = lines.findIndex(l => l.startsWith(`## [${version}]`));
if (start < 0) {
  console.error(`Aucune section « ## [${version}] » dans CHANGELOG.md`);
  process.exit(1);
}
const end = lines.findIndex((l, i) => i > start && l.startsWith('## ['));
const body = lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim();
const install = 'https://raw.githubusercontent.com/FroZnito/Undiscord-remake/main/dist/undiscord-remake.user.js';
console.log(`${body}\n\n**Installer / mettre à jour :** [undiscord-remake.user.js](${install})`);
