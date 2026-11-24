import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export function fixBaseLinks() {
	let base = '';
	return {
		name: 'fix-base-links',
		hooks: {
			'astro:config:setup': ({ config }) => {
				base = (config.base || '/').replace(/\/+$/, '');
			},
			'astro:build:done': ({ dir }) => {
				if (!base) return;
				const root = dir.pathname.replace(/\/+$/, '');
				let fixed = 0;
				const walk = (d) => {
					for (const entry of readdirSync(d)) {
						const p = join(d, entry);
						if (statSync(p).isDirectory()) {
							walk(p);
							continue;
						}
						if (!p.endsWith('.html')) continue;
						const rel = p.slice(root.length).replace(/\\/g, '/');
						const localeMatch = rel.match(/^\/([a-zA-Z-]+)\//);
						const locale = localeMatch ? `/${localeMatch[1]}` : '';
						const html = readFileSync(p, 'utf8');
						const out = html.replace(/(href|src)="(\/[^"]*)"/g, (whole, attr, url) => {
							if (url.startsWith('//')) return whole;
							if (url === base || url.startsWith(base + '/')) return whole;
							fixed++;
							return `${attr}="${base}${locale}${url}"`;
						});
						if (out !== html) writeFileSync(p, out);
					}
				};
				walk(root);
				console.log(`fix-base-links: ${fixed} lien(s) préfixé(s) avec ${base}`);
			},
		},
	};
}
