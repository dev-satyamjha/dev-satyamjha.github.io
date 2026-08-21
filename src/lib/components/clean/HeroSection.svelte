<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	const SOCIAL_GLYPHS: Record<string, string> = {
		GitHub: '\uf09b',
		LinkedIn: '\uf08c',
		LeetCode: '\uf121',
		Instagram: '\uf16d',
		Keybase: '\uf084'
	};
</script>

<section class="relative min-h-[75vh] flex flex-col justify-center py-12 sm:py-20">
	<div class="space-y-6 max-w-3xl">
		<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#27272a] bg-[#181825]/90 backdrop-blur text-xs font-mono text-[#a6e3a1]">
			<span class="w-2 h-2 rounded-full bg-[#a6e3a1] animate-ping"></span>
			<span>{localeStore.current === 'en' ? 'Available for Full Stack Opportunities' : 'फुल स्टैक कार्य हेतु उपलब्ध'}</span>
		</div>

		<div class="space-y-2">
			<h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
				{PORTFOLIO_DATA.profile.name}
			</h1>
			<p class="text-xl sm:text-2xl font-mono text-[#89b4fa]">
				{PORTFOLIO_DATA.profile.title}
			</p>
		</div>

		<p class="text-base sm:text-lg text-[#a6adc8] leading-relaxed max-w-2xl font-sans">
			{PORTFOLIO_DATA.profile.summary}
		</p>

		<div class="flex flex-wrap items-center gap-3 pt-2">
			<a
				href="#projects"
				onclick={() => audioManager.play('click')}
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#89b4fa] hover:bg-[#b4befe] text-[#11111b] font-mono text-xs font-bold transition-all shadow-lg hover:shadow-[#89b4fa]/20 cursor-pointer"
			>
				<span>{localeStore.dict.common.viewWork}</span>
				<span class="nf text-xs">{'\uf063'}</span>
			</a>

			<a
				href="/clean/contact"
				onclick={() => audioManager.play('click')}
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#313244] bg-[#181825] hover:bg-[#313244] hover:border-[#89b4fa] text-[#cdd6f4] font-mono text-xs font-medium transition-all cursor-pointer"
			>
				<span class="nf text-xs">{'\uf0e0'}</span>
				<span>{localeStore.dict.common.contactMe}</span>
			</a>

			<a
				href={PORTFOLIO_DATA.profile.resumeUrl}
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => audioManager.play('click')}
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#313244] bg-[#181825] hover:bg-[#313244] hover:border-[#89b4fa] text-[#cdd6f4] font-mono text-xs font-medium transition-all cursor-pointer"
			>
				<span class="nf text-xs">{'\uf15c'}</span>
				<span>{localeStore.dict.common.downloadResume}</span>
			</a>
		</div>

		<div class="flex items-center gap-3 pt-4 border-t border-[#27272a]/60">
			{#each PORTFOLIO_DATA.socials as social}
				<a
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => audioManager.play('click')}
					aria-label={social.platform}
					class="w-10 h-10 rounded-xl border border-[#313244] bg-[#181825] hover:bg-[#313244] hover:border-[#89b4fa] text-[#a6adc8] hover:text-white flex items-center justify-center transition-all cursor-pointer"
				>
					<span class="nf text-lg">{SOCIAL_GLYPHS[social.platform] ?? '\uf0c1'}</span>
				</a>
			{/each}
		</div>
	</div>
</section>
