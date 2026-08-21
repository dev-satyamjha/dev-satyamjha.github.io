<script lang="ts">
	interface Props {
		targetId?: string;
	}

	let { targetId = 'main-content' }: Props = $props();
</script>

<a
	href={`#${targetId}`}
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#89b4fa] focus:text-[#11111b] focus:font-mono focus:text-xs focus:font-semibold focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
>
	Skip to main content
</a>
