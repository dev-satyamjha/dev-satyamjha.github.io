<script lang="ts">
	import { SITE_CONFIG } from '$lib/data/site-config';
	import { audioManager } from '$lib/stores/audio.svelte';

	let senderName = $state('');
	let senderEmail = $state('');
	let subject = $state('');
	let message = $state('');
	let botcheck = $state('');

	let isSending = $state(false);
	let isSent = $state(false);
	let errorText = $state('');
	let cooldown = $state(0);

	async function handleSend(e: SubmitEvent) {
		e.preventDefault();
		if (botcheck) return;

		if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
			errorText = 'Please provide all required recipient fields and message body.';
			audioManager.play('error');
			return;
		}

		isSending = true;
		errorText = '';
		audioManager.play('click');

		try {
			const res = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					access_key: SITE_CONFIG.web3FormsAccessKey,
					name: senderName,
					email: senderEmail,
					subject: subject || 'macOS Mail Transmission',
					message,
					from_name: 'macOS Mail Client'
				})
			});

			const data = await res.json();

			if (res.ok || data.success) {
				isSent = true;
				audioManager.play('notification');
				senderName = '';
				senderEmail = '';
				subject = '';
				message = '';
				cooldown = 30;

				const timer = setInterval(() => {
					cooldown -= 1;
					if (cooldown <= 0) {
						clearInterval(timer);
						isSent = false;
					}
				}, 1000);
			} else {
				errorText = data.message || 'Transmission failed. Verify connection.';
				audioManager.play('error');
			}
		} catch {
			errorText = 'Transmission failed. Verify connection.';
			audioManager.play('error');
		} finally {
			isSending = false;
		}
	}
</script>

<div class="w-full h-full p-4 sm:p-6 font-sans text-xs text-white bg-[#181825]/90 overflow-y-auto space-y-4 select-text">
	<div class="flex items-center justify-between border-b border-white/10 pb-3">
		<div class="flex items-center gap-2">
			<span class="nf text-base text-blue-400">{'\uf0e0'}</span>
			<span class="font-bold text-xs text-white">New Message &bull; Mail.app</span>
		</div>
		<div class="text-xs text-white/50">SMTP via Web3Forms</div>
	</div>

	{#if isSent}
		<div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs">
			Email sent successfully to {SITE_CONFIG.email}.
			{#if cooldown > 0}
				<span class="text-[10px] block opacity-75">Cooldown active: {cooldown}s</span>
			{/if}
		</div>
	{/if}

	{#if errorText}
		<div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs">
			{errorText}
		</div>
	{/if}

	<form onsubmit={handleSend} class="space-y-3">
		<input type="text" name="botcheck" bind:value={botcheck} class="hidden" tabindex="-1" autocomplete="off" />

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">To:</span>
			<span class="text-white font-medium">{SITE_CONFIG.email} (Satyam Kumar)</span>
		</div>

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">From:</span>
			<input
				type="text"
				required
				bind:value={senderName}
				placeholder="Your Name"
				class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-white/30 focus:ring-0"
			/>
		</div>

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">Email:</span>
			<input
				type="email"
				required
				bind:value={senderEmail}
				placeholder="your.email@domain.com"
				class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-white/30 focus:ring-0"
			/>
		</div>

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">Subject:</span>
			<input
				type="text"
				bind:value={subject}
				placeholder="Project Inquiry / Collaboration"
				class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-white/30 focus:ring-0"
			/>
		</div>

		<div class="pt-1">
			<textarea
				required
				rows="6"
				bind:value={message}
				placeholder="Compose your transmission here..."
				class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-blue-500 transition-colors resize-y"
			></textarea>
		</div>

		<div class="flex items-center justify-between pt-2">
			<div class="text-[10px] text-white/50">Press Send to dispatch</div>
			<button
				type="submit"
				disabled={isSending || cooldown > 0}
				class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
			>
				<span class="nf text-xs">{'\uf1d8'}</span>
				<span>{isSending ? 'Sending...' : 'Send Mail'}</span>
			</button>
		</div>
	</form>
</div>
