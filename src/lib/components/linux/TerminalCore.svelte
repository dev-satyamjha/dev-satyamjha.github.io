<script lang="ts">
	import { onMount, tick } from 'svelte';
	import {
		executeCommand,
		AUTOCOMPLETE_COMMANDS,
		VIRTUAL_FILES,
		type CommandOutput
	} from '$lib/themes/linux/CommandParser';
	import { audioManager } from '$lib/stores/audio.svelte';

	let inputVal = $state('');
	let currentDir = $state('~');
	let history = $state<string[]>([]);
	let historyIndex = $state(-1);
	let outputHistory = $state<CommandOutput[]>([]);

	let inputEl: HTMLInputElement | null = $state(null);
	let terminalContainer: HTMLElement | null = $state(null);

	onMount(() => {
		const initialNeofetch = executeCommand('neofetch', '~', (d) => (currentDir = d));
		outputHistory = [
			{
				id: 'intro',
				command: 'neofetch',
				output: initialNeofetch.output,
				isHtml: initialNeofetch.isHtml,
				timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			},
			{
				id: 'welcome',
				command: '',
				output:
					'<div class="text-[#a6adc8] text-[11px]">Welcome to Satyam\'s Arch Linux environment. Type <span class="text-[#89b4fa] font-bold">help</span> to list commands, <span class="text-[#a6e3a1] font-bold">open projects</span> to view GUI, or <span class="text-[#f9e2af] font-bold">ls</span> to browse virtual filesystem.</div>',
				isHtml: true,
				timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			}
		];

		if (inputEl) {
			inputEl.focus();
		}
	});

	async function scrollToBottom() {
		await tick();
		if (terminalContainer) {
			terminalContainer.scrollTop = terminalContainer.scrollHeight;
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			const cmdText = inputVal;
			if (!cmdText.trim()) return;

			audioManager.play('click');
			history = [...history, cmdText];
			historyIndex = -1;

			const result = executeCommand(cmdText, currentDir, (dir) => {
				currentDir = dir;
			});

			if (result.clearScreen) {
				outputHistory = [];
			} else {
				outputHistory = [
					...outputHistory,
					{
						id: String(Date.now()),
						command: cmdText,
						output: result.output,
						isHtml: result.isHtml,
						isError: result.isError,
						timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
					}
				];
			}

			inputVal = '';
			scrollToBottom();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (history.length === 0) return;
			if (historyIndex === -1) {
				historyIndex = history.length - 1;
			} else if (historyIndex > 0) {
				historyIndex -= 1;
			}
			inputVal = history[historyIndex] ?? '';
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex !== -1) {
				if (historyIndex < history.length - 1) {
					historyIndex += 1;
					inputVal = history[historyIndex];
				} else {
					historyIndex = -1;
					inputVal = '';
				}
			}
		} else if (e.key === 'Tab') {
			e.preventDefault();
			const trimmed = inputVal.trim();
			if (!trimmed) return;

			const parts = trimmed.split(' ');
			if (parts.length === 1) {
				const match = AUTOCOMPLETE_COMMANDS.find((c) => c.startsWith(parts[0].toLowerCase()));
				if (match) inputVal = match;
			} else if (parts.length === 2) {
				const match = VIRTUAL_FILES.find((f) => f.startsWith(parts[1].toLowerCase()));
				if (match) inputVal = `${parts[0]} ${match}`;
			}
		} else if (e.ctrlKey && e.key === 'l') {
			e.preventDefault();
			outputHistory = [];
		}
	}
</script>

<div
	role="presentation"
	bind:this={terminalContainer}
	onpointerdown={() => inputEl?.focus()}
	class="flex-1 w-full h-full p-4 overflow-y-auto font-mono text-xs text-[#cdd6f4] bg-[#11111b] space-y-4 select-text cursor-text"
>
	{#each outputHistory as item (item.id)}
		<div class="space-y-1.5 animate-in fade-in duration-100">
			{#if item.command}
				<div class="flex items-center gap-2">
					<span class="text-[#a6e3a1] font-bold">satyam@arch</span>
					<span class="text-[#89b4fa]">:</span>
					<span class="text-[#cba6f7]">{currentDir}</span>
					<span class="text-[#fab387]">$</span>
					<span class="text-white font-medium">{item.command}</span>
				</div>
			{/if}

			{#if item.output}
				<div
					class={`leading-relaxed pl-1 sm:pl-2 ${item.isError ? 'text-[#f38ba8]' : 'text-[#cdd6f4]'}`}
				>
					{#if item.isHtml}
						{@html item.output}
					{:else}
						<pre class="whitespace-pre-wrap font-mono text-[11px] leading-snug">{item.output}</pre>
					{/if}
				</div>
			{/if}
		</div>
	{/each}

	<div class="flex items-center gap-2 pt-1">
		<span class="text-[#a6e3a1] font-bold shrink-0">satyam@arch</span>
		<span class="text-[#89b4fa] shrink-0">:</span>
		<span class="text-[#cba6f7] shrink-0">{currentDir}</span>
		<span class="text-[#fab387] shrink-0">$</span>
		<input
			bind:this={inputEl}
			type="text"
			bind:value={inputVal}
			onkeydown={handleKeyDown}
			class="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white p-0 m-0 focus:ring-0 focus:outline-none"
			aria-label="Terminal input prompt"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
		/>
	</div>
</div>
