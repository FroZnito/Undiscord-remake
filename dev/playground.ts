/**
 * A tiny fake Discord web client for trying the userscript locally:
 * mocks the REST API in memory and mimics the bits of DOM the script uses
 * (toolbar, message list, composer) plus Discord's global key/paste handlers.
 */

import { strToU8, zipSync } from 'fflate';
import { createFakeDiscord } from './fakeDiscord';

const params = new URLSearchParams(location.search);
const fake = createFakeDiscord({
  token: 'MTAwMDAwMDAwMDAwMDAwMDAx.FAKE00.playground-local-token-only',
  latency: Number(params.get('latency') ?? 35),
  rateLimitEvery: Number(params.get('rl') ?? 23),
  retryAfter: 1.2,
  indexLag: 2,
  indexingFor: 1,
  emptyPageEvery: Number(params.get('empty') ?? 0),
});

const [me, alice, bob] = fake.state.users;
fake.seed('300000000000000001', 160);
fake.seed('300000000000000002', 60);
fake.seed('300000000000000003', 40);
fake.seed('300000000000000010', 50, [me, alice]);
fake.seed('300000000000000011', 30, [me, bob]);
fake.seed('300000000000000012', 24, [me, alice, bob]);

// Route discord.com API calls to the fake server.
const realFetch = window.fetch.bind(window);
window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  return url.startsWith('https://discord.com/api/') ? fake.fetch(input, init) : realFetch(input, init);
};

/**
 * Builds a data package shaped like Discord's (current layout, ids as bare JSON
 * numbers) from the fake state, plus one channel of a server we "left".
 */
function makeSamplePackage(): File {
  const files: Record<string, Uint8Array> = {};
  const index: Record<string, string> = {};
  const guildName = (id?: string) => fake.state.guilds.find(g => g.id === id)?.name ?? 'Serveur';
  const write = (id: string, info: object, rows: { id: string; ts: string; content: string; att: string }[]) => {
    files[`package/Messages/c${id}/channel.json`] = strToU8(JSON.stringify(info));
    files[`package/Messages/c${id}/messages.json`] = strToU8(`[${rows.map(r =>
      `{"ID": ${r.id}, "Timestamp": "${r.ts}", "Contents": ${JSON.stringify(r.content)}, "Attachments": "${r.att}"}`).join(',\n')}]`);
  };
  for (const ch of fake.state.channels) {
    const mine = (fake.state.messages.get(ch.id) ?? []).filter(m => m.author.id === me.id && !fake.state.deleted.has(m.id));
    if (!mine.length) continue;
    index[ch.id] = ch.type === 1 ? `Direct Message with ${ch.recipients![0].username}#0`
      : ch.type === 3 ? ch.name! : `${ch.name} in ${guildName(ch.guild_id)}`;
    write(ch.id, ch.guild_id
      ? { id: ch.id, type: 'GUILD_TEXT', name: ch.name, guild: { id: ch.guild_id, name: guildName(ch.guild_id) } }
      : { id: ch.id, type: ch.type === 1 ? 'DM' : 'GROUP_DM' },
    mine.map(m => ({ id: m.id, ts: m.timestamp.replace('T', ' ').slice(0, 19), content: m.content, att: m.attachments.map(a => a.url).join(' ') })));
  }
  const left = '300000000000000099';
  index[left] = 'blabla in Serveur quitté';
  write(left, { id: left, type: 'GUILD_TEXT', guild: { id: '200000000000000099', name: 'Serveur quitté' } },
    [1, 2, 3].map(i => ({ id: (BigInt('1200000000000000000') + BigInt(i)).toString(), ts: '2024-01-01 10:00:00', content: `vieux message ${i}`, att: '' })));
  files['package/Messages/index.json'] = strToU8(JSON.stringify(index, null, 2));
  return new File([zipSync(files)], 'package.zip', { type: 'application/zip' });
}

Object.assign(window, { fake, makeSamplePackage });

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function currentPath() {
  const m = /\/channels\/(@me|\d+)(?:\/(\d+))?/.exec(location.pathname);
  return { guildId: m?.[1] ?? '@me', channelId: m?.[2] ?? null };
}

let lastSignature = '';

function render(force = false) {
  const { guildId, channelId } = currentPath();
  const channels = guildId === '@me'
    ? fake.state.channels.filter(c => c.type === 1 || c.type === 3)
    : fake.state.channels.filter(c => c.guild_id === guildId);
  const ch = fake.state.channels.find(c => c.id === channelId);
  const messages = (fake.state.messages.get(channelId ?? '') ?? []).filter(m => !fake.state.deleted.has(m.id));
  const signature = `${location.pathname}|${messages.length}`;
  if (!force && signature === lastSignature) return;
  lastSignature = signature;

  const chName = (c: typeof fake.state.channels[number]) =>
    c.type === 1 ? `@${c.recipients![0].global_name}` : c.type === 3 ? `👥 ${c.name}` : `# ${c.name}`;

  const app = document.getElementById('app-mount')!;
  app.innerHTML = `
    <nav class="guilds_x1">
      <a href="/channels/@me/300000000000000010" class="${guildId === '@me' ? 'on' : ''}" data-nav>MP</a>
      ${fake.state.guilds.map(g => `<a href="/channels/${g.id}/${fake.state.channels.find(c => c.guild_id === g.id)!.id}"
        class="${g.id === guildId ? 'on' : ''}" data-nav title="${esc(g.name)}">${esc(g.name.split(' ').map(w => w[0]).join(''))}</a>`).join('')}
    </nav>
    <nav class="sidebar_x2">
      ${channels.map(c => `<a href="/channels/${guildId}/${c.id}" data-nav class="${c.id === channelId ? 'on' : ''}">${esc(chName(c))}</a>`).join('')}
    </nav>
    <main>
      <section class="title_a1b2c3">
        <div class="children_q">${ch ? esc(chName(ch)) : ''}</div>
        <div class="toolbar__9293f">
          <div class="iconWrapper_z">🔔</div><div class="iconWrapper_z">📌</div><div class="iconWrapper_z">👥</div>
        </div>
      </section>
      <ol data-list-id="chat-messages">
        ${messages.map(m => `
          <li id="chat-messages-${m.channel_id}-${m.id}" class="${m.author.id === me.id ? 'mine' : ''}">
            <div>
              <span class="who">${esc(m.author.global_name ?? m.author.username)}</span>
              <span class="when">${new Date(m.timestamp).toLocaleString()}${m.pinned ? ' 📌' : ''}</span>
              <div id="message-content-${m.id}">${esc(m.content)}${m.attachments.length ? ' 📎' : ''}</div>
            </div>
          </li>`).join('')}
      </ol>
      <div class="composer" contenteditable="true" role="textbox">Envoyer un message…</div>
    </main>`;
}

function alertDev(text: string) {
  const el = document.getElementById('dev-alerts');
  if (el) el.textContent = `⚠ ${text} (${new Date().toLocaleTimeString()})`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!/\/channels\//.test(location.pathname)) history.replaceState(null, '', '/channels/200000000000000001/300000000000000001');
  render(true);
  setInterval(render, 800);

  document.addEventListener('click', e => {
    const a = (e.target as Element).closest?.('a[data-nav]') as HTMLAnchorElement | null;
    if (!a) return;
    e.preventDefault();
    history.pushState(null, '', a.getAttribute('href'));
    render(true);
  });
  document.getElementById('dev-theme')!.onclick = () => {
    const root = document.documentElement;
    const light = root.classList.toggle('theme-light');
    root.classList.toggle('theme-dark', !light);
  };
  document.getElementById('dev-reset')!.onclick = () => location.reload();
  document.getElementById('dev-package')!.onclick = () => {
    const url = URL.createObjectURL(makeSamplePackage());
    const a = Object.assign(document.createElement('a'), { href: url, download: 'package.zip' });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  // Like Discord: typing anywhere focuses the composer, paste/drop upload to the channel.
  window.addEventListener('keydown', e => {
    const active = document.activeElement as HTMLElement | null;
    const editing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
    if (!editing && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      (document.querySelector('.composer') as HTMLElement | null)?.focus();
      alertDev(`Discord a capté la touche « ${e.key} »`);
    }
  });
  document.addEventListener('paste', () => alertDev('Discord a reçu un collage'));
  window.addEventListener('drop', e => {
    e.preventDefault();
    alertDev('Discord a reçu un fichier déposé');
  });
  window.addEventListener('dragover', e => e.preventDefault());

  // Discord's client keeps calling its API with the token in the Authorization header.
  const ping = () => fetch('https://discord.com/api/v9/users/@me/affinities', { headers: { Authorization: fake.token } }).catch(() => {});
  ping();
  setInterval(ping, 10_000);
});

window.addEventListener('popstate', () => render(true));
