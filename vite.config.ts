import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				warningFilter: (warning) => warning.code !== 'script_context_deprecated'
			},
			adapter: adapter({ fallback: '404.html' }),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: {
						highlighter: (code, lang) => {
							const escaped = escapeSvelte(code);
							return `<pre class="language-${lang || 'text'} font-mono text-xs p-4 rounded-xl bg-[#11111b] border border-[#313244] overflow-x-auto text-[#cdd6f4]"><code>${escaped}</code></pre>`;
						}
					}
				}),
				{
					markup({ content, filename }: { content: string; filename?: string }) {
						if (filename?.endsWith('.md') || filename?.endsWith('.svx')) {
							return {
								code: content.replace(/<script\s+context="module">/g, '<script module>')
							};
						}
					}
				}
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
