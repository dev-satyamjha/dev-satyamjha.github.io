<script lang="ts">
	import { onDestroy } from 'svelte';
	import { SITE_CONFIG } from '$lib/data/site-config';
	import { ContactFormManager } from '$lib/utils/contact-form.svelte';

	const form = new ContactFormManager('macOS Mail Transmission');

	onDestroy(() => {
		form.destroy();
	});
</script>

<div
	class="w-full h-full p-4 sm:p-6 font-sans text-xs text-white bg-[#181825]/90 overflow-y-auto space-y-4 select-text"
>
	<div class="flex items-center justify-between border-b border-white/10 pb-3">
		<div class="flex items-center gap-2">
			<span class="nf text-base text-blue-400">{'\uf0e0'}</span>
			<span class="font-bold text-xs text-white">New Message &bull; Mail.app</span>
		</div>
		<div class="text-xs text-white/50">SMTP via Web3Forms</div>
	</div>

	{#if form.isSent}
		<div
			class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs"
		>
			Email sent successfully to {SITE_CONFIG.email}.
			{#if form.cooldown > 0}
				<span class="text-[10px] block opacity-75">Cooldown active: {form.cooldown}s</span>
			{/if}
		</div>
	{/if}

	{#if form.errorText}
		<div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs">
			{form.errorText}
		</div>
	{/if}

	<form onsubmit={(e) => form.submit(e)} class="space-y-3">
		<input
			type="text"
			name="botcheck"
			bind:value={form.botcheck}
			class="hidden"
			tabindex="-1"
			autocomplete="off"
		/>

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">To:</span>
			<span class="text-white font-medium">{SITE_CONFIG.email} (Satyam Kumar)</span>
		</div>

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">From:</span>
			<input
				type="text"
				required
				bind:value={form.name}
				placeholder="Your Name"
				class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-white/30 focus:ring-0"
			/>
		</div>

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">Email:</span>
			<input
				type="email"
				required
				bind:value={form.email}
				placeholder="your.email@domain.com"
				class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-white/30 focus:ring-0"
			/>
		</div>

		<div class="flex items-center gap-3 border-b border-white/10 pb-2">
			<span class="text-white/50 w-12 shrink-0">Subject:</span>
			<input
				type="text"
				bind:value={form.subject}
				placeholder="Project Inquiry / Collaboration"
				class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-white/30 focus:ring-0"
			/>
		</div>

		<div class="pt-1">
			<textarea
				required
				rows="6"
				bind:value={form.message}
				placeholder="Compose your transmission here..."
				class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-blue-500 transition-colors resize-y"
			></textarea>
		</div>

		<div class="flex items-center justify-between pt-2">
			<div class="text-[10px] text-white/50">Press Send to dispatch</div>
			<button
				type="submit"
				disabled={form.isSending || form.cooldown > 0}
				class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
			>
				<span class="nf text-xs">{'\uf1d8'}</span>
				<span>{form.isSending ? 'Sending...' : 'Send Mail'}</span>
			</button>
		</div>
	</form>
</div>
