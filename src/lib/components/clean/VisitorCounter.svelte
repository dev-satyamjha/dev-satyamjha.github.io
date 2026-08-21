<script lang="ts">
	import { onMount } from 'svelte';
	import { localeStore } from '$lib/stores/locale.svelte';

	interface Props {
		class?: string;
	}

	let { class: customClass = '' }: Props = $props();
	let count = $state<number | null>(null);

	onMount(() => {
		try {
			const saved = localStorage.getItem('portfolio_visitor_count');
			const initial = saved ? parseInt(saved, 10) + 1 : 1248;
			count = initial;
			localStorage.setItem('portfolio_visitor_count', String(initial));
		} catch {
			count = 1248;
		}
	});
</script>

<div class={`inline-flex items-center gap-1.5 font-mono text-xs text-[#a6adc8] ${customClass}`}>
	<span class="nf text-xs text-[#89b4fa]">{'\uf06e'}</span>
	<span>{localeStore.dict.common.visitors}:</span>
	<span class="font-bold text-white">
		{count !== null ? count.toLocaleString() : '...'}
	</span>
</div>
