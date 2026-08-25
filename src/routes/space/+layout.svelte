<script lang="ts">
	import SpaceCanvas from '$lib/components/space/SpaceCanvas.svelte';
	import StationHUD from '$lib/components/space/StationHUD.svelte';

	let { children } = $props();
</script>

<div
	class="fixed inset-0 overflow-hidden flex flex-col select-none font-mono bg-[#030712] text-cyan-300"
>
	<SpaceCanvas />

	<div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.7)_100%)] pointer-events-none z-10"
	></div>
	<div
		class="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10"
	></div>

	<div class="relative z-20 flex flex-col w-full h-full">
		<StationHUD />
		<div class="flex-1 w-full overflow-hidden relative">
			{@render children()}
		</div>
	</div>
</div>
