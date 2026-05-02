// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	base: '/new/',
	integrations: [
		starlight({
			title: 'SynthEdit',
			logo: {
				alt: 'SynthEdit',
				src: './src/assets/synthedit-logo.svg',
				replacesTitle: true,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/JeffMcClintock/SynthEdit-Tracking' },
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
						{ label: 'Signal Types & Levels', slug: 'guides/signal-types' },
						{ label: 'Polyphony', slug: 'guides/polyphony' },
						{ label: 'Containers & Prefabs', slug: 'guides/containers' },
						{ label: 'Panel Design', slug: 'guides/panel-design' },
						{ label: 'MIDI Automation', slug: 'guides/midi-automation' },
						{ label: 'Creating VST Plugins', slug: 'guides/creating-vst-plugins' },
						{ label: 'Using SynthEdit with a DAW', slug: 'guides/using-with-daw' },
						{ label: 'Rendering to Disk', slug: 'guides/rendering-to-disk' },
						{ label: 'Optimizing CPU Usage', slug: 'guides/optimizing-cpu' },
						{ label: 'Feedback Paths', slug: 'guides/feedback-paths' },
						{ label: 'FM Synthesis', slug: 'guides/fm-synthesis' },
						{ label: 'Phase Distortion Synthesis', slug: 'guides/phase-distortion-synthesis' },
						{ label: 'AI Assistant (MCP Connector)', slug: 'guides/ai-mcp-connector' },
					],
				},
				{
					label: 'Module Reference',
					items: [
						{
							label: 'Oscillators & Sound Sources',
							autogenerate: { directory: 'reference/oscillators' },
						},
						{
							label: 'Filters',
							autogenerate: { directory: 'reference/filters' },
						},
						{
							label: 'Envelopes & Dynamics',
							autogenerate: { directory: 'reference/envelopes' },
						},
						{
							label: 'Effects',
							autogenerate: { directory: 'reference/effects' },
						},
						{
							label: 'Mixing & Routing',
							autogenerate: { directory: 'reference/mixing' },
						},
						{
							label: 'Math & Utilities',
							autogenerate: { directory: 'reference/math' },
						},
						{
							label: 'Logic Gates',
							autogenerate: { directory: 'reference/logic' },
						},
						{
							label: 'MIDI',
							autogenerate: { directory: 'reference/midi' },
						},
						{
							label: 'UI Controls',
							autogenerate: { directory: 'reference/ui' },
						},
						{
							label: 'Audio I/O',
							autogenerate: { directory: 'reference/io' },
						},
					],
				},
				{
					label: 'More',
					items: [
						{ label: 'Technical Specifications', slug: 'guides/technical-specs' },
						{ label: 'FAQ', slug: 'guides/faq' },
					],
				},
			],
		}),
	],
});
