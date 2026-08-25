<script lang="ts">
	import { onDestroy } from 'svelte';
	import { SITE_CONFIG } from '$lib/data/site-config';
	import { ContactFormManager } from '$lib/utils/contact-form.svelte';

	const form = new ContactFormManager('Sub-Space Quantum Transmission');

	onDestroy(() => {
		form.destroy();
	});
</script>

<div
	class="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 font-mono text-xs text-cyan-300 select-text"
>
	<div
		class="p-4 rounded-2xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-between"
	>
		<div class="flex items-center gap-2">
			<span class="nf text-lg text-cyan-400">{'\uf0e0'}</span>
			<div>
				<h2 class="font-bold text-sm text-white uppercase tracking-wider">
					Comms Array // Sector 05
				</h2>
				<div class="text-[10px] text-cyan-400/60">
					Quantum Encryption: ACTIVE &bull; Channel: {SITE_CONFIG.email}
				</div>
			</div>
		</div>
		<span
			class="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] text-emerald-300 font-bold"
		>
			Transceiver Ready
		</span>
	</div>

	<div
		class="p-6 sm:p-8 rounded-3xl bg-[#0b1329]/80 backdrop-blur-xl border border-cyan-500/40 shadow-2xl space-y-4"
	>
		{#if form.isSent}
			<div
				class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs"
			>
				<div class="font-bold">
					Transmission dispatched into the sub-space network to {SITE_CONFIG.email}.
				</div>
				{#if form.cooldown > 0}
					<div class="text-[10px] text-emerald-400/80 mt-1">
						Transceiver cooling cycle: {form.cooldown}s
					</div>
				{/if}
			</div>
		{/if}

		{#if form.errorText}
			<div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs">
				{form.errorText}
			</div>
		{/if}

		<form onsubmit={(e) => form.submit(e)} class="space-y-4">
			<input
				type="text"
				name="botcheck"
				bind:value={form.botcheck}
				class="hidden"
				tabindex="-1"
				autocomplete="off"
			/>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<div class="space-y-1">
					<label for="senderName" class="text-[10px] uppercase text-cyan-400/60 font-bold"
						>Sender Callsign</label
					>
					<input
						id="senderName"
						type="text"
						required
						bind:value={form.name}
						placeholder="Commander Shepard"
						class="w-full px-3.5 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-white placeholder-cyan-500/30 text-xs focus:outline-none focus:border-cyan-400"
					/>
				</div>

				<div class="space-y-1">
					<label for="senderEmail" class="text-[10px] uppercase text-cyan-400/60 font-bold"
						>Sub-Space Frequency (Email)</label
					>
					<input
						id="senderEmail"
						type="email"
						required
						bind:value={form.email}
						placeholder="shepard@normandy.space"
						class="w-full px-3.5 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-white placeholder-cyan-500/30 text-xs focus:outline-none focus:border-cyan-400"
					/>
				</div>
			</div>

			<div class="space-y-1">
				<label for="subject" class="text-[10px] uppercase text-cyan-400/60 font-bold"
					>Transmission Header (Subject)</label
				>
				<input
					id="subject"
					type="text"
					bind:value={form.subject}
					placeholder="Mission Collaboration Inquiry"
					class="w-full px-3.5 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-white placeholder-cyan-500/30 text-xs focus:outline-none focus:border-cyan-400"
				/>
			</div>

			<div class="space-y-1">
				<label for="message" class="text-[10px] uppercase text-cyan-400/60 font-bold"
					>Payload Data (Message)</label
				>
				<textarea
					id="message"
					required
					rows="6"
					bind:value={form.message}
					placeholder="Enter payload transmission stream..."
					class="w-full p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-white placeholder-cyan-500/30 text-xs focus:outline-none focus:border-cyan-400 resize-y"
				></textarea>
			</div>

			<div class="pt-2 flex items-center justify-between">
				<div class="text-[10px] text-white/40">Encryption: Quantum AES-256</div>
				<button
					type="submit"
					disabled={form.isSending || form.cooldown > 0}
					class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider uppercase transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
				>
					<span class="nf text-xs">{'\uf1d8'}</span>
					<span>{form.isSending ? 'Transmitting...' : 'Dispatch Signal'}</span>
				</button>
			</div>
		</form>
	</div>
</div>
