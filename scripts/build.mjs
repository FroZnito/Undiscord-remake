// Builds dist/undiscord-remake.user.js (+ the local playground with --serve).
// Usage: node scripts/build.mjs [--watch] [--serve]

import * as esbuild from 'esbuild';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const args = new Set(process.argv.slice(2));
const watch = args.has('--watch');
const serve = args.has('--serve');
const dev = watch || serve;
const PORT = 8787;
const OUT = 'dist/undiscord-remake.user.js';
// Dev builds get their own file so a running `npm run dev` can never overwrite the published script.
const DEV_OUT = 'dist/undiscord-remake.dev.user.js';
const RAW_URL = `https://raw.githubusercontent.com/FroZnito/Undiscord-remake/main/${OUT}`;

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#7983f5"/><stop offset=".5" stop-color="#5865f2"/><stop offset="1" stop-color="#4049c9"/></linearGradient></defs>
<rect width="64" height="64" rx="16" fill="url(#g)"/><g fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
<path d="M16 22h32M26 22v-5h12v5M44 22l-2.5 26h-19L20 22M29 30v11M35 30v11"/></g></svg>`;
const ICON = `data:image/svg+xml;base64,${Buffer.from(ICON_SVG).toString('base64')}`;

function metadata(dev) {
  const u = pkg.userscript;
  const entries = [
    ['name', dev ? `${pkg.displayName} [DEV]` : pkg.displayName],
    ['namespace', dev ? `${u.namespace}/dev` : u.namespace],
    ['version', pkg.version],
    ['description', pkg.description],
    ['description:en', 'Bulk delete your Discord messages (channels, DMs, servers, data package) — Undiscord Remake by FroZn.'],
    ['author', pkg.author],
    ['copyright', `${new Date().getFullYear()}, ${pkg.author}`],
    ['license', pkg.license],
    ['homepageURL', pkg.homepage],
    ['supportURL', pkg.bugs.url],
    ['icon', ICON],
    ...u.match.map(m => ['match', m]),
    ['run-at', u['run-at']],
    ['grant', u.grant],
    ['inject-into', u['inject-into']],
    ['noframes', ''],
  ];
  // Tampermonkey checks this URL for updates (the built file is committed for that reason).
  const url = dev ? `http://localhost:${PORT}/${DEV_OUT}` : RAW_URL;
  entries.push(['downloadURL', url], ['updateURL', url]);
  const pad = Math.max(...entries.map(([k]) => k.length));
  const lines = entries.map(([k, v]) => `// @${k.padEnd(pad)} ${v}`.trimEnd());
  return [
    '// ==UserScript==', ...lines, '// ==/UserScript==', '',
    `// ${pkg.displayName} by ${pkg.author} — ${pkg.homepage}`,
    `// MIT License — Copyright (c) ${new Date().getFullYear()} ${pkg.author}`, '',
  ].join('\n');
}

/** @type {esbuild.BuildOptions} */
const userscript = {
  entryPoints: ['src/main.tsx'],
  outfile: dev ? DEV_OUT : OUT,
  bundle: true,
  format: 'iife',
  target: ['chrome110', 'firefox115', 'safari16'],
  jsx: 'automatic',
  jsxImportSource: 'preact',
  loader: { '.css': 'text' },
  define: { __VERSION__: JSON.stringify(pkg.version) },
  banner: { js: metadata(dev) },
  // Readable output on purpose: people should be able to audit what they install.
  minify: false,
  legalComments: 'none',
  charset: 'utf8',
  logLevel: 'info',
};

/** @type {esbuild.BuildOptions} */
const playground = {
  entryPoints: ['dev/playground.ts'],
  outfile: 'dist/playground.js',
  bundle: true,
  format: 'iife',
  target: ['chrome110'],
  logLevel: 'info',
};

if (dev) {
  const contexts = await Promise.all([esbuild.context(userscript), esbuild.context(playground)]);
  await Promise.all(contexts.map(c => c.watch()));
  if (serve) {
    // Any unknown path (e.g. /channels/123/456) falls back to the playground page.
    const { port } = await contexts[0].serve({ servedir: '.', port: PORT, fallback: 'dev/playground.html' });
    console.log(`\n  Playground: http://localhost:${port}/channels/200000000000000001/300000000000000001`);
    console.log(`  Userscript: http://localhost:${port}/${DEV_OUT}\n`);
  }
} else {
  await esbuild.build(userscript);
}
