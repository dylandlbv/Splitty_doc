import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const { default: astroConfig } = await import('../astro.config.mjs');
const base = (astroConfig.base || '/').replace(/\/+$/, '');
const distDir = new URL('../dist', import.meta.url).pathname;

let broken = 0;

function walk(dir) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			walk(full);
		} else if (full.endsWith('.html')) {
			checkFile(full);
		}
	}
}

const locales = readdirSync(distDir).filter(
	(e) => statSync(join(distDir, e)).isDirectory() && /^[a-z]{2}(-[A-Za-z]+)?$/.test(e),
);

function isOk(url) {
	if (url === base || !url.startsWith(base + '/')) return false;
	const rest = url.slice(base.length + 1);
	const segment = rest.split('/')[0];
	if (locales.includes(segment)) return true;
	if (segment === '_astro' || segment === 'pagefind') return true;
	if (segment.includes('.')) return true;
	return false;
}

function checkFile(file) {
	const html = readFileSync(file, 'utf8');
	const re = /(?:href|src)="(\/[^"]*)"/g;
	let match;
	while ((match = re.exec(html)) !== null) {
		const url = match[1];
		if (url.startsWith('//')) continue;
		if (!isOk(url)) {
			console.error(`lien interne cassé (préfixe ${base}[+locale] attendu) : ${relative(distDir, file)} -> ${url}`);
			broken++;
		}
	}
}

walk(distDir);

if (broken > 0) {
	console.error(`\n${broken} lien(s) interne(s) cassé(s) : préfixe ${base}(+locale) manquant.`);
	process.exit(1);
}
console.log(`check:links OK — tous les liens internes de dist/ incluent ${base} + locale`);
