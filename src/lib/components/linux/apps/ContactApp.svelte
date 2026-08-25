<script lang="ts">
	import { onDestroy } from 'svelte';
	import { SITE_CONFIG } from '$lib/data/site-config';
	import { ContactFormManager } from '$lib/utils/contact-form.svelte';

	const form = new ContactFormManager('Hyprland Mutt Transmission');

	onDestroy(() => {
		form.destroy();
	});
</script>

<div
	class="w-full h-full p-4 font-mono text-xs text-[#cdd6f4] bg-[#11111b] overflow-y-auto space-y-4 select-text"
>
	<div
		class="flex items-center justify-between border-b border-[#313244] pb-2 text-[11px] text-[#a6adc8]"
	>
		<div class="flex items-center gap-2 text-[#89b4fa]">
			<span class="nf text-sm">{'\uf0e0'}</span>
			<span class="font-bold text-white">mutt: Compose Transmission</span>
		</div>
		<div class="text-[#a6e3a1]">[PGP: GPG-256 Valid]</div>
	</div>

	{#if form.isSent}
		<div
			class="p-3 rounded-xl bg-[#a6e3a1]/10 border border-[#a6e3a1]/40 text-[#a6e3a1] text-xs space-y-1"
		>
			<div class="font-bold">Transmission dispatched successfully to {SITE_CONFIG.email}.</div>
			{#if form.cooldown > 0}
				<div class="text-[10px] text-[#a6e3a1]/80">SMTP Rate cooldown active: {form.cooldown}s</div>
			{/if}
		</div>
	{/if}

	{#if form.errorText}
		<div class="p-3 rounded-xl bg-[#f38ba8]/10 border border-[#f38ba8]/40 text-[#f38ba8] text-xs">
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

		<div class="space-y-1">
			<div
				class="flex items-center gap-2 bg-[#181825] border border-[#313244] rounded-xl px-3 py-1.5"
			>
				<span class="text-[#89b4fa] font-bold w-14 shrink-0">To:</span>
				<span class="text-[#a6adc8] truncate">{SITE_CONFIG.email} (Satyam Kumar)</span>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
			<div
				class="flex items-center gap-2 bg-[#181825] border border-[#313244] rounded-xl px-3 py-1.5"
			>
				<span class="text-[#89b4fa] font-bold w-14 shrink-0">From:</span>
				<input
					type="text"
					required
					bind:value={form.name}
					placeholder="Ada Lovelace"
					class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-[#45475a] focus:ring-0"
				/>
			</div>

			<div
				class="flex items-center gap-2 bg-[#181825] border border-[#313244] rounded-xl px-3 py-1.5"
			>
				<span class="text-[#89b4fa] font-bold w-14 shrink-0">Email:</span>
				<input
					type="email"
					required
					bind:value={form.email}
					placeholder="ada@lovelace.dev"
					class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-[#45475a] focus:ring-0"
				/>
			</div>
		</div>

		<div
			class="flex items-center gap-2 bg-[#181825] border border-[#313244] rounded-xl px-3 py-1.5"
		>
			<span class="text-[#89b4fa] font-bold w-14 shrink-0">Subject:</span>
			<input
				type="text"
				bind:value={form.subject}
				placeholder="Transmission Inquiry"
				class="w-full bg-transparent border-none outline-none text-white text-xs placeholder-[#45475a] focus:ring-0"
			/>
		</div>

		<div class="space-y-1">
			<textarea
				required
				rows="6"
				bind:value={form.message}
				placeholder="Write your transmission payload here..."
				class="w-full p-3 rounded-xl bg-[#181825] border border-[#313244] text-xs text-white placeholder-[#45475a] outline-none focus:border-[#cba6f7] transition-colors resize-y"
			></textarea>
		</div>

		<div class="flex items-center justify-between pt-1">
			<div class="text-[10px] text-[#a6adc8]">
				Press Send or execute <span class="text-[#a6e3a1]">contact -s</span>
			</div>

			<button
				type="submit"
				disabled={form.isSending || form.cooldown > 0}
				class="px-4 py-2 rounded-xl bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
			>
				<span class="nf text-xs">{'\uf1d8'}</span>
				<span>{form.isSending ? 'Transmitting...' : 'Send Message'}</span>
			</button>
		</div>
	</form>
</div>
