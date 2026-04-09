// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'SynthEdit',
			logo: {
				alt: 'SynthEdit',
				src: './src/assets/synthedit-logo.svg',
				replacesTitle: true,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/JeffMcClintock/SynthEdit' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'guides/introduction' },
						{ label: 'Installation', slug: 'guides/installation' },
						{ label: 'Your First Synth', slug: 'guides/first-synth' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Working with Modules', slug: 'guides/modules' },
						{ label: 'Creating VST Plugins', slug: 'guides/creating-vst-plugins' },
					],
				},
				{
					label: 'Module Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
