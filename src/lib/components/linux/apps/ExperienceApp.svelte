<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	let selectedPid = $state<number>(101);
	let filterQuery = $state('');

	const processes = [
		{
			pid: 101,
			user: 'satyam',
			role: PORTFOLIO_DATA.experience[0].role,
			company: PORTFOLIO_DATA.experience[0].company,
			duration: PORTFOLIO_DATA.experience[0].duration,
			status: 'RUNNING',
			statusColor: 'text-[#a6e3a1]',
			cpu: '18.4%',
			mem: '4.2%',
			technologies: PORTFOLIO_DATA.experience[0].technologies,
			highlights: PORTFOLIO_DATA.experience[0].highlights
		},
		{
			pid: 102,
			user: 'satyam',
			role: PORTFOLIO_DATA.experience[1].role,
			company: PORTFOLIO_DATA.experience[1].company,
			duration: PORTFOLIO_DATA.experience[1].duration,
			status: 'COMPLETED',
			statusColor: 'text-[#89b4fa]',
			cpu: '0.0%',
			mem: '1.8%',
			technologies: PORTFOLIO_DATA.experience[1].technologies,
			highlights: PORTFOLIO_DATA.experience[1].highlights
		}
	];

	let selectedProcess = $derived(processes.find((p) => p.pid === selectedPid) ?? processes[0]);

	let filteredProcesses = $derived(
		processes.filter(
			(p) =>
				filterQuery === '' ||
				p.role.toLowerCase().includes(filterQuery.toLowerCase()) ||
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
	class="w-full h-full p-3 sm:p-4 font-mono text-xs text-[#cdd6f4] bg-[#11111b] flex flex-col justify-between select-none overflow-y-auto space-y-4"
>
	<div
		class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-[#181825] border border-[#313244] text-[11px]"
	>
		<div class="space-y-1.5">
			<div class="flex items-center gap-2">
				<span class="text-[#89b4fa] font-bold">1 [|||||||||||||||| 32.4%]</span>
				<span class="text-[#a6adc8]">Tasks: 2 total, 1 active</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-[#cba6f7] font-bold">2 [||||||||| 18.2%]</span>
				<span class="text-[#a6adc8]">Uptime: 4+ yrs</span>
			</div>
		</div>

		<div class="space-y-1.5">
			<div class="flex items-center gap-2">
				<span class="text-[#f9e2af] font-bold">Mem [|||||||||| 2.4G/16G]</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-[#a6e3a1] font-bold">Swp [ 0K/8.0G]</span>
			</div>
		</div>
	</div>

	<div class="flex items-center justify-between gap-2">
		<div class="text-[11px] text-[#a6adc8]">
			<span>htop — Internship & Experience Process Monitor</span>
		</div>
		<input
			type="search"
			bind:value={filterQuery}
			placeholder="Filter (F4)..."
			class="px-2.5 py-1 rounded-lg bg-[#181825] border border-[#313244] text-[11px] text-white placeholder-[#45475a] focus:outline-none focus:border-[#cba6f7]"
		/>
	</div>

	<div class="flex-1 overflow-x-auto rounded-xl border border-[#313244] bg-[#181825]/60">
		<table class="w-full text-left border-collapse text-[11px]">
			<thead>
				<tr class="bg-[#313244] text-[#cdd6f4] font-bold">
					<th class="p-2">PID</th>
					<th class="p-2">USER</th>
					<th class="p-2">ROLE</th>
					<th class="p-2">COMPANY</th>
					<th class="p-2">DURATION</th>
					<th class="p-2">CPU%</th>
					<th class="p-2">STATUS</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredProcesses as proc}
					<tr
						onclick={() => selectProcess(proc.pid)}
						class={`cursor-pointer border-t border-[#313244]/60 transition-colors ${
							selectedPid === proc.pid
								? 'bg-[#cba6f7] text-[#11111b] font-bold'
								: 'hover:bg-[#181825] text-[#cdd6f4]'
						}`}
					>
						<td class="p-2 font-mono">{proc.pid}</td>
						<td class="p-2">{proc.user}</td>
						<td class="p-2 truncate">{proc.role}</td>
						<td class="p-2">{proc.company}</td>
						<td class="p-2">{proc.duration}</td>
						<td class="p-2">{proc.cpu}</td>
						<td
							class={`p-2 font-bold ${selectedPid === proc.pid ? 'text-[#11111b]' : proc.statusColor}`}
						>
							{proc.status}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if selectedProcess}
		<div
			class="p-3.5 rounded-2xl bg-[#181825] border border-[#313244] space-y-2 select-text text-xs"
		>
			<div class="flex items-center justify-between border-b border-[#313244] pb-2">
				<div class="font-bold text-white">
					<span>PID {selectedProcess.pid}:</span>
					<span class="text-[#89b4fa]">{selectedProcess.role}</span>
					<span class="text-[#a6adc8]">@ {selectedProcess.company}</span>
				</div>
				<span
					class="px-2 py-0.5 rounded bg-[#11111b] border border-[#313244] text-[10px] text-[#cba6f7]"
				>
					{selectedProcess.duration}
				</span>
			</div>

			<ul class="text-[11px] text-[#cdd6f4] list-disc list-inside space-y-1">
				{#each selectedProcess.highlights as h}
					<li>{h}</li>
				{/each}
			</ul>

			<div class="pt-1.5 flex flex-wrap gap-1.5">
				{#each selectedProcess.technologies as tech}
					<span
						class="px-2 py-0.5 rounded bg-[#11111b] border border-[#313244] text-[10px] text-[#a6e3a1]"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>
	{/if}
</div>
