// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fixBaseLinks } from './astro-fix-base-links.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://dylandlbv.github.io',
	base: '/Splitty_doc',
	integrations: [
		starlight({
			title: 'Splitty',
			description:
				'Documentation de Splitty : application de gestion du budget familial et de calcul des remboursements entre membres d’un foyer.',
			defaultLocale: 'fr',
			locales: {
				fr: { label: 'Français', lang: 'fr-FR' },
				en: { label: 'English', lang: 'en-US' },
			},
			logo: { src: './src/assets/logo.svg' },
			social: [
				{ icon: 'github', label: 'Splitty', href: 'https://github.com/dylandlbv/Splitty' },
				{ icon: 'github', label: 'Splitty_doc', href: 'https://github.com/dylandlbv/Splitty_doc' },
			],
			editLink: {
				baseUrl: 'https://github.com/dylandlbv/Splitty_doc/edit/main/',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Démarrage',
					translations: { en: 'Getting started' },
					items: [{ autogenerate: { directory: 'getting-started' } }],
				},
				{
					label: 'Guide utilisateur',
					translations: { en: 'User guide' },
					items: [{ autogenerate: { directory: 'user-guide' } }],
				},
				{
					label: 'Déploiement',
					translations: { en: 'Deployment' },
					items: [{ autogenerate: { directory: 'deployment' } }],
				},
				{
					label: 'Architecture',
					translations: { en: 'Architecture' },
					items: [{ autogenerate: { directory: 'architecture' } }],
				},
				{
					label: 'Référence API',
					translations: { en: 'API reference' },
					items: [{ autogenerate: { directory: 'api' } }],
				},
				{
					label: 'Contribuer',
					translations: { en: 'Contributing' },
					items: [{ autogenerate: { directory: 'contributing' } }],
				},
			],
		}),
		fixBaseLinks(),
	],
});
