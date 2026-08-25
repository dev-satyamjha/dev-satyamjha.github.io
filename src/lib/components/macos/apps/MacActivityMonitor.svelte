<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	let selectedPid = $state<number>(101);
	let filterQuery = $state('');

	const processes = [
		{
			pid: 101,
			name: PORTFOLIO_DATA.experience[0].role,
			company: PORTFOLIO_DATA.experience[0].company,
			duration: PORTFOLIO_DATA.experience[0].duration,
			cpu: '24.2%',
			memory: '412 MB',
			threads: 8,
			status: 'Running',
			highlights: PORTFOLIO_DATA.experience[0].highlights,
			technologies: PORTFOLIO_DATA.experience[0].technologies
		},
		{
			pid: 102,
			name: PORTFOLIO_DATA.experience[1].role,
			company: PORTFOLIO_DATA.experience[1].company,
			duration: PORTFOLIO_DATA.experience[1].duration,
			cpu: '0.0%',
			memory: '128 MB',
			threads: 2,
			status: 'Completed',
			highlights: PORTFOLIO_DATA.experience[1].highlights,
			technologies: PORTFOLIO_DATA.experience[1].technologies
		}
	];

	let selectedProcess = $derived(processes.find((p) => p.pid === selectedPid) ?? processes[0]);

	let filteredProcesses = $derived(
		processes.filter(
			(p) =>
				filterQuery === '' ||
				p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
				p.company.toLowerCase().includes(filterQuery.toLowerCase()) ||
				p.technologies.some((t) => t.toLowerCase().includes(filterQuery.toLowerCase()))
		)
	);

	function selectProcess(pid: number) {
		audioManager.play('click');
		selectedPid = pid;
	}
</script>

<div
	class="w-full h-full flex flex-col font-sans text-xs text-white bg-[#181825]/90 select-none overflow-hidden"
>
	<div class="h-10 border-b border-white/10 px-4 flex items-center justify-between bg-white/5">
		<div class="flex items-center gap-2">
			<span class="nf text-sm text-emerald-400">{'\uf080'}</span>
			<span class="font-bold text-xs text-white">Activity Monitor &bull; Experience</span>
		</div>

		<input
			type="search"
			bind:value={filterQuery}
			placeholder="Filter processes..."
			class="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 w-44"
		/>
	</div>

	<div class="flex-1 overflow-x-auto p-4 space-y-4">
		<table class="w-full text-left border-collapse text-xs">
			<thead>
				<tr class="bg-white/10 text-white/80 font-medium">
					<th class="p-2.5 rounded-l-lg">Process Name</th>
					<th class="p-2.5">Company</th>
					<th class="p-2.5">Duration</th>
					<th class="p-2.5">% CPU</th>
					<th class="p-2.5">Memory</th>
					<th class="p-2.5 rounded-r-lg">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredProcesses as proc}
					<tr
						onclick={() => selectProcess(proc.pid)}
						class={`cursor-pointer border-t border-white/5 transition-colors ${
							selectedPid === proc.pid
								? 'bg-blue-600 text-white font-medium'
								: 'hover:bg-white/5 text-white/90'
						}`}
					>
						<td class="p-2.5 font-medium">{proc.name}</td>
						<td class="p-2.5">{proc.company}</td>
						<td class="p-2.5 text-white/70">{proc.duration}</td>
						<td class="p-2.5 text-emerald-400 font-mono">{proc.cpu}</td>
						<td class="p-2.5 text-white/70 font-mono">{proc.memory}</td>
						<td class="p-2.5">
							<span
								class={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
									proc.status === 'Running'
										? 'bg-emerald-500/20 text-emerald-300'
										: 'bg-white/10 text-white/70'
								}`}
							>
								{proc.status}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		{#if selectedProcess}
			<div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 select-text text-xs">
				<div class="flex items-center justify-between border-b border-white/10 pb-2">
					<div class="font-bold text-white text-sm">
						{selectedProcess.name}
						<span class="text-blue-400 font-normal">@ {selectedProcess.company}</span>
					</div>
					<span class="text-xs text-white/60">{selectedProcess.duration}</span>
				</div>

				<ul class="text-white/80 list-disc list-inside space-y-1 text-xs">
					{#each selectedProcess.highlights as h}
						<li>{h}</li>
					{/each}
				</ul>

				<div class="pt-2 flex flex-wrap gap-1.5">
					{#each selectedProcess.technologies as tech}
						<span class="px-2 py-0.5 rounded-md bg-white/10 text-emerald-300 text-[10px]"
							>{tech}</span
						>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
