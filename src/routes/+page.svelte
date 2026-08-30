<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { SOCIAL_GLYPHS } from '$lib/data/social-links';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import { colorModeStore } from '$lib/stores/colorMode.svelte';
	import PortalVoid from '$lib/components/portal/PortalVoid.svelte';
	import PortalScene from '$lib/components/portal/PortalScene.svelte';
	import LanguageToggle from '$lib/components/shared/LanguageToggle.svelte';
	import AudioToggle from '$lib/components/shared/AudioToggle.svelte';
	import ColorModeToggle from '$lib/components/shared/ColorModeToggle.svelte';

	let isLight = $derived(colorModeStore.current === 'light');
</script>

<PortalVoid />

<main
	id="main-content"
	class="relative z-10 min-h-screen flex flex-col justify-between pt-8 sm:pt-12 pb-32 sm:pb-44 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
>
	<header class="w-full max-w-7xl mx-auto flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div
				class={`w-9 h-9 rounded-xl overflow-hidden border shrink-0 shadow-md transition-colors ${
					isLight ? 'border-slate-300 bg-white' : 'border-[#313244] bg-[#181825]'
				}`}
			>
				<img
					src="/images/avatar.jpeg"
					alt={PORTFOLIO_DATA.profile.name}
					width="36"
					height="36"
					class="w-full h-full object-cover"
				/>
			</div>
			<div>
				<div
					class={`text-sm font-bold tracking-tight transition-colors ${
						isLight ? 'text-slate-900' : 'text-white'
					}`}
				>
					{PORTFOLIO_DATA.profile.name}
				</div>
				<div
					class={`text-xs font-mono transition-colors ${
						isLight ? 'text-slate-500' : 'text-[#a6adc8]'
					}`}
				>
					satyamjha.is-a.dev
				</div>
			</div>
		</div>

		<div class="flex items-center gap-2.5 sm:gap-3">
			<ColorModeToggle variant="pill" />
			<LanguageToggle variant="pill" />
			<AudioToggle variant="icon" />
		</div>
	</header>

	<div class="w-full max-w-4xl mx-auto text-center my-8 sm:my-12 space-y-6">
		<div
			class={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur text-xs font-mono transition-colors ${
				isLight
					? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-sm'
					: 'border-[#313244] bg-[#181825]/90 text-[#a6e3a1]'
			}`}
		>
			<span
				class={`w-2 h-2 rounded-full animate-ping ${isLight ? 'bg-emerald-500' : 'bg-[#a6e3a1]'}`}
			></span>
			<span>{localeStore.current === 'en' ? 'Open for Opportunities' : 'कार्य हेतु उपलब्ध'}</span>
		</div>

		<div class="flex flex-col sm:flex-row items-center justify-center gap-7 sm:gap-10 pt-4">
			<div
				class="relative group shrink-0 flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]"
			>
				<div
					class="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-42 md:h-42 [transform-style:preserve-3d] animate-chromatic-orbit-1 pointer-events-none opacity-85"
				>
					<div
						class="w-full h-full rounded-full border-[1.5px] border-[#61dafb]/85 shadow-[0_0_10px_rgba(97,218,251,0.5)] flex items-center justify-center"
					>
						<span
							class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#61dafb,0_0_16px_#61dafb]"
						></span>
						<span
							class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#61dafb] shadow-[0_0_8px_#61dafb]"
						></span>
					</div>
				</div>

				<div
					class="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-42 md:h-42 [transform-style:preserve-3d] animate-chromatic-orbit-2 pointer-events-none opacity-85"
				>
					<div
						class="w-full h-full rounded-full border-[1.5px] border-[#89b4fa]/85 shadow-[0_0_10px_rgba(137,180,250,0.5)] flex items-center justify-center"
					>
						<span
							class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#89b4fa,0_0_16px_#89b4fa]"
						></span>
						<span
							class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#89b4fa] shadow-[0_0_8px_#89b4fa]"
						></span>
					</div>
				</div>

				<div
					class="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-42 md:h-42 [transform-style:preserve-3d] animate-chromatic-orbit-3 pointer-events-none opacity-85"
				>
					<div
						class="w-full h-full rounded-full border-[1.5px] border-[#89dceb]/85 shadow-[0_0_10px_rgba(137,220,235,0.5)] flex items-center justify-center"
					>
						<span
							class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#89dceb,0_0_16px_#89dceb]"
						></span>
						<span
							class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#89b4fa] shadow-[0_0_8px_#89b4fa]"
						></span>
					</div>
				</div>

				<div
					class="relative z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-105 [transform:translateZ(0px)] shadow-lg"
				>
					<img
						src={PORTFOLIO_DATA.profile.avatar}
						alt={PORTFOLIO_DATA.profile.name}
						width="112"
						height="112"
						class="w-full h-full object-cover rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-110"
					/>
				</div>

				<div
					class={`absolute -bottom-1 -right-1 z-30 w-6 h-6 rounded-lg border flex items-center justify-center shadow-md transition-colors ${
						isLight ? 'bg-white border-slate-300' : 'bg-[#181825] border-[#313244]'
					}`}
				>
					<span
						class={`w-2.5 h-2.5 rounded-full animate-pulse ${isLight ? 'bg-emerald-500' : 'bg-[#a6e3a1]'}`}
					></span>
				</div>
			</div>

			<h1
				class={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-center sm:text-left transition-colors ${
					isLight ? 'text-slate-900' : 'text-white'
				}`}
			>
				{PORTFOLIO_DATA.profile.name}
			</h1>
		</div>

		<p
			class={`text-base sm:text-xl max-w-2xl mx-auto font-medium transition-colors ${
				isLight ? 'text-slate-600' : 'text-[#a6adc8]'
			}`}
		>
			{localeStore.dict.portal.subtitle}
		</p>

		<p
			class={`text-xs sm:text-sm font-mono tracking-wide uppercase font-semibold transition-colors ${
				isLight ? 'text-blue-600' : 'text-[#89b4fa]'
			}`}
		>
			{localeStore.dict.portal.chooseDimension}
		</p>

		<div class="flex items-center justify-center gap-3 pt-2">
			{#each PORTFOLIO_DATA.socials as social}
				<a
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => audioManager.play('click')}
					aria-label={social.platform}
					class={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
						isLight
							? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-blue-400 hover:text-blue-600 shadow-sm'
							: 'border-[#313244] bg-[#181825]/80 text-[#cdd6f4] hover:bg-[#313244] hover:border-[#89b4fa] hover:text-white'
					}`}
				>
					<span class="nf text-base">{SOCIAL_GLYPHS[social.platform] ?? '\uf0c1'}</span>
				</a>
			{/each}
			<a
				href={PORTFOLIO_DATA.profile.resumeUrl}
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => audioManager.play('click')}
				class={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
					isLight
						? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-blue-400 hover:text-blue-600 shadow-sm'
						: 'border-[#313244] bg-[#181825]/80 text-[#cdd6f4] hover:bg-[#313244] hover:border-[#89b4fa] hover:text-white'
				}`}
			>
				<span class="nf text-xs">{'\uf15c'}</span>
				<span>{localeStore.dict.common.resume}</span>
			</a>
		</div>
	</div>

	<PortalScene />

	<div class="w-full max-w-4xl mx-auto my-14 sm:my-18 px-4 sm:px-6">
		<div
			class={`relative overflow-hidden p-6 sm:p-7 md:p-8 rounded-3xl backdrop-blur-xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
				isLight
					? 'bg-amber-50/95 border-amber-300/80 shadow-lg text-amber-950 hover:border-amber-400'
					: 'bg-[#181825]/90 border-[#fab387]/45 shadow-[0_0_30px_rgba(250,179,135,0.12)] hover:border-[#fab387]/75'
			}`}
		>
			<div class="flex items-start gap-4 text-left flex-1">
				<span
					class={`w-2.5 h-2.5 rounded-full animate-ping shrink-0 mt-1.5 ${
						isLight ? 'bg-amber-600' : 'bg-[#fab387]'
					}`}
				></span>
				<p
					class={`text-xs sm:text-sm font-mono leading-relaxed sm:leading-loose transition-colors ${
						isLight ? 'text-amber-950 font-medium' : 'text-[#cdd6f4]'
					}`}
				>
					{localeStore.current === 'en'
						? 'This portfolio is under continuous daily development with new features deploying regularly. Please note that several content entries and project metrics currently serve as AI-generated placeholders while real-world telemetry is being integrated. Keep visiting to explore the latest updates!'
						: 'यह पोर्टफोलियो निरंतर दैनिक विकास में है और नई सुविधाएं लगातार जोड़ी जा रही हैं। कृपया ध्यान दें कि वर्तमान में अधिकांश विवरण और आंकड़े केवल प्लेसहोल्डर के रूप में हैं और वास्तविक डेटा शीघ्र ही अपडेट किया जा रहा है। नए अपडेट्स देखने के लिए दोबारा आते रहें!'}
				</p>
			</div>

			<div class="shrink-0 flex items-center justify-center">
				<div
					class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-[#fab387]/70 shadow-[0_0_20px_rgba(250,179,135,0.3)] bg-[#11111b] shrink-0 transition-transform duration-300 hover:scale-105"
				>
					<img
						src="/images/avatar.jpeg"
						alt={PORTFOLIO_DATA.profile.name}
						width="96"
						height="96"
						loading="lazy"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	</div>

	<footer
		class={`w-full max-w-7xl mx-auto mt-20 sm:mt-28 pt-8 pb-10 sm:pb-14 border-t grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-xs font-mono transition-colors ${
			isLight ? 'border-slate-300 text-slate-600' : 'border-[#313244]/60 text-[#a6adc8]'
		}`}
	>
		<div class="hidden sm:block"></div>
		<div class="text-center">
			&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}
		</div>
		<div class="flex items-center justify-center sm:justify-end text-right">
			<span class={isLight ? 'text-blue-700 font-semibold' : 'text-[#89b4fa] font-medium'}>
				Powered by Svelte 5 Runes
			</span>
		</div>
	</footer>
</main>

<style>
	@keyframes chromaticOrbit1 {
		0% {
			transform: rotateZ(0deg) rotateX(72deg) rotateZ(0deg);
			filter: hue-rotate(0deg);
		}
		100% {
			transform: rotateZ(0deg) rotateX(72deg) rotateZ(360deg);
			filter: hue-rotate(360deg);
		}
	}
	@keyframes chromaticOrbit2 {
		0% {
			transform: rotateZ(60deg) rotateX(72deg) rotateZ(0deg);
			filter: hue-rotate(0deg);
		}
		100% {
			transform: rotateZ(60deg) rotateX(72deg) rotateZ(360deg);
			filter: hue-rotate(360deg);
		}
	}
	@keyframes chromaticOrbit3 {
		0% {
			transform: rotateZ(120deg) rotateX(72deg) rotateZ(0deg);
			filter: hue-rotate(0deg);
		}
		100% {
			transform: rotateZ(120deg) rotateX(72deg) rotateZ(360deg);
			filter: hue-rotate(360deg);
		}
	}

	.animate-chromatic-orbit-1 {
		animation: chromaticOrbit1 14s linear infinite;
	}
	.animate-chromatic-orbit-2 {
		animation: chromaticOrbit2 18s linear infinite reverse;
	}
	.animate-chromatic-orbit-3 {
		animation: chromaticOrbit3 22s linear infinite;
	}
</style>
