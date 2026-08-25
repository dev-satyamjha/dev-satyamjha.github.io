<script lang="ts">
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { audioManager } from '$lib/stores/audio.svelte';

	type FinderTab = 'overview' | 'projects' | 'documents' | 'skills';

	let activeTab = $state<FinderTab>('overview');
	let viewMode = $state<'grid' | 'list'>('grid');
	let searchFilter = $state('');

	function setTab(tab: FinderTab) {
		audioManager.play('click');
		activeTab = tab;
	}
</script>

<div
	class="w-full h-full flex font-sans text-xs text-white select-none overflow-hidden bg-[#181825]/90"
>
	<aside
		class="w-48 sm:w-52 border-r border-white/10 p-3 space-y-4 bg-white/5 backdrop-blur-xl flex flex-col justify-between shrink-0"
	>
		<div class="space-y-3">
			<div class="space-y-1">
				<div class="text-[10px] font-bold text-white/40 uppercase tracking-wider px-2">
					Favorites
				</div>
				<button
					type="button"
					onclick={() => setTab('overview')}
					class={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
						activeTab === 'overview'
							? 'bg-blue-600 text-white font-medium shadow'
							: 'hover:bg-white/10 text-white/80'
					}`}
				>
					<span class="nf text-xs">{'\uf015'}</span>
					<span>Overview</span>
				</button>

				<button
					type="button"
					onclick={() => setTab('projects')}
					class={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
						activeTab === 'projects'
							? 'bg-blue-600 text-white font-medium shadow'
							: 'hover:bg-white/10 text-white/80'
					}`}
				>
					<span class="nf text-xs text-cyan-400">{'\uf07b'}</span>
					<span>Projects</span>
				</button>

				<button
					type="button"
					onclick={() => setTab('documents')}
					class={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
						activeTab === 'documents'
							? 'bg-blue-600 text-white font-medium shadow'
							: 'hover:bg-white/10 text-white/80'
					}`}
				>
					<span class="nf text-xs text-rose-400">{'\uf15c'}</span>
					<span>Documents</span>
				</button>

				<button
					type="button"
					onclick={() => setTab('skills')}
					class={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
						activeTab === 'skills'
							? 'bg-blue-600 text-white font-medium shadow'
							: 'hover:bg-white/10 text-white/80'
					}`}
				>
					<span class="nf text-xs text-purple-400">{'\uf0e4'}</span>
					<span>Skills Matrix</span>
				</button>
			</div>

			<div class="space-y-1 pt-2">
				<div class="text-[10px] font-bold text-white/40 uppercase tracking-wider px-2">
					Locations
				</div>
				<div class="px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-white/70">
					<span class="nf text-xs">{'\uf0a0'}</span>
					<span>Macintosh HD</span>
				</div>
				<div class="px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-white/70">
					<span class="nf text-xs">{'\uf1eb'}</span>
					<span>BIT Mesra Node</span>
				</div>
			</div>
		</div>

		<div
			class="p-2 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/60 space-y-0.5"
		>
			<div class="font-medium text-white/80">Available Storage</div>
			<div>512 GB SSD • 440 GB Free</div>
		</div>
	</aside>

	<section class="flex-1 flex flex-col overflow-hidden">
		<div
			class="h-10 border-b border-white/10 px-4 flex items-center justify-between gap-3 bg-white/5"
		>
			<div class="flex items-center gap-2 text-white/60 text-xs">
				<span class="font-medium text-white capitalize">{activeTab}</span>
				<span>&bull;</span>
				<span
					>{activeTab === 'projects' ? `${PORTFOLIO_DATA.projects.length} items` : '1 item'}</span
				>
			</div>

			<div class="flex items-center gap-2">
				<div class="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
					<button
						type="button"
						onclick={() => (viewMode = 'grid')}
						class={`p-1 rounded text-xs transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/60'}`}
						aria-label="Grid View"
					>
						<span class="nf">{'\uf00a'}</span>
					</button>
					<button
						type="button"
						onclick={() => (viewMode = 'list')}
						class={`p-1 rounded text-xs transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/60'}`}
						aria-label="List View"
					>
						<span class="nf">{'\uf00b'}</span>
					</button>
				</div>

				<input
					type="search"
					bind:value={searchFilter}
					placeholder="Search files..."
					class="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 w-32 sm:w-44"
				/>
			</div>
		</div>

		<div class="flex-1 p-4 sm:p-6 overflow-y-auto select-text">
			{#if activeTab === 'overview'}
				<div class="space-y-6">
					<div
						class="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10"
					>
						<div
							class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-xl shrink-0"
						>
							<img
								src={PORTFOLIO_DATA.profile.avatar}
								alt={PORTFOLIO_DATA.profile.name}
								width="112"
								height="112"
								class="w-full h-full object-cover"
							/>
						</div>
						<div class="space-y-1.5 text-center sm:text-left">
							<h2 class="text-xl font-bold text-white tracking-tight">
								{PORTFOLIO_DATA.profile.name}
							</h2>
							<div class="text-xs text-blue-400 font-medium">{PORTFOLIO_DATA.profile.title}</div>
							<div class="text-xs text-white/70">
								{PORTFOLIO_DATA.profile.location} &bull; {PORTFOLIO_DATA.profile.email}
							</div>
						</div>
					</div>

					<div class="space-y-3 leading-relaxed text-xs text-white/90">
						{#each PORTFOLIO_DATA.profile.bio as para}
							<p>{para}</p>
						{/each}
					</div>

					<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
						<div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
							<div class="text-lg font-bold text-blue-400">400+</div>
							<div class="text-[10px] text-white/60">Active Users</div>
						</div>
						<div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
							<div class="text-lg font-bold text-emerald-400">50+</div>
							<div class="text-[10px] text-white/60">Key Projects</div>
						</div>
						<div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
							<div class="text-lg font-bold text-amber-400">8.1</div>
							<div class="text-[10px] text-white/60">BIT Mesra CGPA</div>
						</div>
						<div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
							<div class="text-lg font-bold text-purple-400">24+</div>
							<div class="text-[10px] text-white/60">Technologies</div>
						</div>
					</div>
				</div>
			{:else if activeTab === 'projects'}
				<div class={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-2'}>
					{#each PORTFOLIO_DATA.projects.filter((p) => searchFilter === '' || p.name
								.toLowerCase()
								.includes(searchFilter.toLowerCase()) || p.tagline
								.toLowerCase()
								.includes(searchFilter.toLowerCase())) as project}
						<div
							class="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors space-y-2"
						>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<span class="nf text-base text-blue-400">{'\uf07b'}</span>
									<span class="font-bold text-white text-xs">{project.name}</span>
								</div>
								<span class="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70 uppercase">
									{project.category}
								</span>
							</div>
							<p class="text-[11px] text-white/70 line-clamp-2">{project.tagline}</p>
							<div class="flex flex-wrap gap-1">
								{#each project.technologies.slice(0, 4) as tech}
									<span class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-emerald-300"
										>{tech}</span
									>
								{/each}
							</div>
							<div class="pt-1 flex gap-2">
								{#each project.links as link}
									<a
										href={link.url}
										target="_blank"
										class="text-[10px] text-blue-400 hover:underline flex items-center gap-1"
									>
										<span>{link.label}</span>
										<span class="nf text-[8px]">{'\uf08e'}</span>
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{:else if activeTab === 'documents'}
				<div class="space-y-4">
					<div
						class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
					>
						<div class="flex items-center gap-3">
							<span class="nf text-3xl text-rose-400">{'\uf15c'}</span>
							<div>
								<div class="font-bold text-white text-xs">Satyam_Kumar_Resume.pdf</div>
								<div class="text-[10px] text-white/60">PDF Document &bull; Updated 2026</div>
							</div>
						</div>
						<a
							href={PORTFOLIO_DATA.profile.resumeUrl}
							target="_blank"
							onclick={() => audioManager.play('click')}
							class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
						>
							Download
						</a>
					</div>

					<div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
						<div class="font-bold text-white text-xs">Academic Credentials</div>
						{#each PORTFOLIO_DATA.education as edu}
							<div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
								<div>
									<div class="text-white font-medium">{edu.institution}</div>
									<div class="text-white/60 text-[11px]">{edu.degree}</div>
								</div>
								<span class="text-amber-400 text-xs font-bold">{edu.grade}</span>
							</div>
						{/each}
					</div>
				</div>
			{:else if activeTab === 'skills'}
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{#each PORTFOLIO_DATA.skills as skill}
						<div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
							<div class="flex items-center justify-between text-xs">
								<span class="text-white font-medium">{skill.name}</span>
								<span class="text-blue-400 font-bold">{skill.proficiency}%</span>
							</div>
							<div class="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
								<div
									class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
									style={`width: ${skill.proficiency}%;`}
								></div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>
</div>
