<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { SITE_CONFIG } from '$lib/data/site-config';
	import { localeStore } from '$lib/stores/locale.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let botcheck = $state('');

	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let errorMessage = $state('');
	let cooldown = $state(0);
	let copiedEmail = $state(false);

	const SOCIAL_GLYPHS: Record<string, string> = {
		GitHub: '\uf09b',
		LinkedIn: '\uf08c',
		LeetCode: '\uf121',
		Instagram: '\uf16d',
		Keybase: '\uf084'
	};

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (botcheck) return;

		if (!name.trim() || !email.trim() || !message.trim()) {
			errorMessage = 'Please complete all required fields.';
			audioManager.play('error');
			return;
		}

		isSubmitting = true;
		errorMessage = '';
		audioManager.play('click');

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					access_key: SITE_CONFIG.web3FormsAccessKey,
					name,
					email,
					subject: subject || 'Portfolio Contact Inquiry',
					message,
					from_name: 'Portfolio Contact Form'
				})
			});

			const data = await response.json();

			if (response.ok || data.success) {
				isSubmitted = true;
				audioManager.play('notification');
				name = '';
				email = '';
				subject = '';
				message = '';
				cooldown = 30;

				const timer = setInterval(() => {
					cooldown -= 1;
					if (cooldown <= 0) {
						clearInterval(timer);
						isSubmitted = false;
					}
				}, 1000);
			} else {
				errorMessage = data.message || localeStore.dict.contact.errorMessage;
				audioManager.play('error');
			}
		} catch {
			errorMessage = localeStore.dict.contact.errorMessage;
			audioManager.play('error');
		} finally {
			isSubmitting = false;
		}
	}

	function copyEmail() {
		audioManager.play('click');
		if (typeof navigator !== 'undefined') {
			navigator.clipboard.writeText(SITE_CONFIG.email);
			copiedEmail = true;
			setTimeout(() => {
				copiedEmail = false;
			}, 2000);
		}
	}
</script>

<section id="contact" class="py-16 sm:py-24 border-t border-[#27272a]/60">
	<div class="space-y-10">
		<div class="flex items-center gap-3">
			<span class="font-mono text-xs text-[#89b4fa]">06.</span>
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
				{localeStore.dict.sections.contactHeading}
			</h2>
			<div class="flex-1 h-px bg-[#27272a]"></div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
			<div class="lg:col-span-5 space-y-6">
				<div class="space-y-3">
					<h3 class="text-xl font-bold text-white tracking-tight">
						{localeStore.current === 'en' ? "Let's build something together" : 'आइए साथ मिलकर कुछ नया बनाएं'}
					</h3>
					<p class="text-sm text-[#a6adc8] leading-relaxed font-sans">
						{localeStore.current === 'en'
							? 'I am always interested in discussing full-stack systems, desktop applications, AI automation, or open-source opportunities.'
							: 'मैं फुल-स्टैक सिस्टम्स, डेस्कटॉप ऐप्स, एआई ऑटोमेशन और ओपन-सोर्स प्रोजेक्ट्स पर चर्चा के लिए सदैव तत्पर हूं।'}
					</p>
				</div>

				<div class="space-y-3 pt-2">
					<div class="p-4 rounded-2xl bg-[#181825] border border-[#313244] flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="w-9 h-9 rounded-xl bg-[#11111b] border border-[#313244] flex items-center justify-center text-[#89b4fa]">
								<span class="nf text-sm">{'\uf0e0'}</span>
							</div>
							<div>
								<div class="text-[10px] font-mono text-[#a6adc8]">Email</div>
								<div class="text-xs font-mono font-medium text-white select-all">{SITE_CONFIG.email}</div>
							</div>
						</div>

						<button
							type="button"
							onclick={copyEmail}
							aria-label="Copy email address"
							class="px-2.5 py-1 rounded-lg border border-[#313244] bg-[#11111b] hover:border-[#89b4fa] text-[10px] font-mono text-[#cdd6f4] transition-colors cursor-pointer"
						>
							{copiedEmail ? 'Copied' : 'Copy'}
						</button>
					</div>

					<div class="p-4 rounded-2xl bg-[#181825] border border-[#313244] flex items-center gap-3">
						<div class="w-9 h-9 rounded-xl bg-[#11111b] border border-[#313244] flex items-center justify-center text-[#a6e3a1]">
							<span class="nf text-sm">{'\uf041'}</span>
						</div>
						<div>
							<div class="text-[10px] font-mono text-[#a6adc8]">Location</div>
							<div class="text-xs font-mono font-medium text-white">{SITE_CONFIG.location}</div>
						</div>
					</div>
				</div>

				<div class="pt-2">
					<div class="text-xs font-mono text-[#a6adc8] mb-2.5">Connect on Social Platforms</div>
					<div class="flex items-center gap-2.5">
						{#each PORTFOLIO_DATA.socials as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => audioManager.play('click')}
								aria-label={social.platform}
								class="w-9 h-9 rounded-xl border border-[#313244] bg-[#181825] hover:bg-[#313244] hover:border-[#89b4fa] text-[#a6adc8] hover:text-white flex items-center justify-center transition-all cursor-pointer"
							>
								<span class="nf text-base">{SOCIAL_GLYPHS[social.platform] ?? '\uf0c1'}</span>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<div class="lg:col-span-7">
				<form
					onsubmit={handleSubmit}
					class="rounded-3xl border border-[#27272a] bg-[#181825]/90 p-6 sm:p-8 space-y-4"
				>
					<input type="text" name="botcheck" bind:value={botcheck} class="hidden" tabindex="-1" autocomplete="off" />

					{#if isSubmitted}
						<div class="p-4 rounded-2xl bg-[#a6e3a1]/10 border border-[#a6e3a1]/30 text-[#a6e3a1] text-xs font-mono space-y-1 animate-in fade-in duration-200">
							<div class="font-bold flex items-center gap-1.5">
								<span class="nf">{'\uf00c'}</span>
								<span>{localeStore.dict.contact.successMessage}</span>
							</div>
							{#if cooldown > 0}
								<div class="text-[11px] text-[#a6e3a1]/80">
									Form cooldown active: {cooldown}s
								</div>
							{/if}
						</div>
					{/if}

					{#if errorMessage}
						<div class="p-4 rounded-2xl bg-[#f38ba8]/10 border border-[#f38ba8]/30 text-[#f38ba8] text-xs font-mono flex items-center gap-1.5 animate-in fade-in duration-200">
							<span class="nf">{'\uf06a'}</span>
							<span>{errorMessage}</span>
						</div>
					{/if}

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-1.5">
							<label for="name" class="text-xs font-mono text-[#a6adc8] block">
								{localeStore.dict.contact.nameLabel} <span class="text-[#f38ba8]">*</span>
							</label>
							<input
								id="name"
								type="text"
								required
								bind:value={name}
								placeholder="Ada Lovelace"
								class="w-full px-4 py-2.5 rounded-xl bg-[#11111b] border border-[#313244] text-xs font-mono text-white placeholder-[#45475a] focus:outline-none focus:border-[#89b4fa] focus:ring-1 focus:ring-[#89b4fa] transition-colors"
							/>
						</div>

						<div class="space-y-1.5">
							<label for="email" class="text-xs font-mono text-[#a6adc8] block">
								{localeStore.dict.contact.emailLabel} <span class="text-[#f38ba8]">*</span>
							</label>
							<input
								id="email"
								type="email"
								required
								bind:value={email}
								placeholder="ada@lovelace.dev"
								class="w-full px-4 py-2.5 rounded-xl bg-[#11111b] border border-[#313244] text-xs font-mono text-white placeholder-[#45475a] focus:outline-none focus:border-[#89b4fa] focus:ring-1 focus:ring-[#89b4fa] transition-colors"
							/>
						</div>
					</div>

					<div class="space-y-1.5">
						<label for="subject" class="text-xs font-mono text-[#a6adc8] block">
							{localeStore.dict.contact.subjectLabel}
						</label>
						<input
							id="subject"
							type="text"
							bind:value={subject}
							placeholder="Full Stack Engineering Inquiry"
							class="w-full px-4 py-2.5 rounded-xl bg-[#11111b] border border-[#313244] text-xs font-mono text-white placeholder-[#45475a] focus:outline-none focus:border-[#89b4fa] focus:ring-1 focus:ring-[#89b4fa] transition-colors"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="message" class="text-xs font-mono text-[#a6adc8] block">
							{localeStore.dict.contact.messageLabel} <span class="text-[#f38ba8]">*</span>
						</label>
						<textarea
							id="message"
							required
							rows="5"
							bind:value={message}
							placeholder="Hello Satyam, I would like to discuss..."
							class="w-full px-4 py-2.5 rounded-xl bg-[#11111b] border border-[#313244] text-xs font-mono text-white placeholder-[#45475a] focus:outline-none focus:border-[#89b4fa] focus:ring-1 focus:ring-[#89b4fa] transition-colors resize-y"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={isSubmitting || cooldown > 0}
						class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#89b4fa] hover:bg-[#b4befe] text-[#11111b] font-mono text-xs font-bold transition-all shadow-lg hover:shadow-[#89b4fa]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
					>
						<span>{isSubmitting ? localeStore.dict.contact.sending : localeStore.dict.contact.sendButton}</span>
						<span class="nf text-xs">{'\uf1d8'}</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
