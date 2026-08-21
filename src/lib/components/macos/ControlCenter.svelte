<script lang="ts">
	import { macos } from '$lib/themes/macos/MacOSConfig.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';

	let brightness = $state(90);
	let volume = $state(80);
	let isWifiActive = $state(true);
	let isBluetoothActive = $state(true);
	let isDarkMode = $state(true);

	function toggleWifi() {
		audioManager.play('click');
		isWifiActive = !isWifiActive;
	}

	function toggleBluetooth() {
		audioManager.play('click');
		isBluetoothActive = !isBluetoothActive;
	}

	function toggleDarkMode() {
		audioManager.play('click');
		isDarkMode = !isDarkMode;
	}
</script>

{#if macos.isControlCenterOpen}
	<button
		type="button"
		class="fixed inset-0 w-full h-full cursor-default bg-transparent border-0 z-40"
		onclick={() => (macos.isControlCenterOpen = false)}
		aria-label="Close Control Center"
	></button>

	<div
		class="fixed top-9 right-3 z-50 w-80 rounded-3xl bg-[#1e1e2e]/90 backdrop-blur-3xl border border-white/20 shadow-2xl p-3 font-sans text-xs text-white space-y-3 animate-in fade-in zoom-in-95 duration-100 select-none"
	>
		<div class="grid grid-cols-2 gap-2">
			<div class="p-2.5 rounded-2xl bg-white/10 border border-white/10 space-y-2 flex flex-col justify-between">
				<button
					type="button"
					onclick={toggleWifi}
					class="flex items-center gap-2.5 text-left cursor-pointer"
				>
					<span
						class={`w-7 h-7 rounded-full flex items-center justify-center text-white ${
							isWifiActive ? 'bg-blue-600' : 'bg-white/20'
						}`}
					>
						<span class="nf text-xs">{'\uf1eb'}</span>
					</span>
					<div class="truncate">
						<div class="font-medium text-[11px]">Wi-Fi</div>
						<div class="text-[10px] text-white/60 truncate">{isWifiActive ? 'BIT-Campus-5G' : 'Off'}</div>
					</div>
				</button>

				<button
					type="button"
					onclick={toggleBluetooth}
					class="flex items-center gap-2.5 text-left cursor-pointer"
				>
					<span
						class={`w-7 h-7 rounded-full flex items-center justify-center text-white ${
							isBluetoothActive ? 'bg-blue-600' : 'bg-white/20'
						}`}
					>
						<span class="nf text-xs">{'\uf294'}</span>
					</span>
					<div class="truncate">
						<div class="font-medium text-[11px]">Bluetooth</div>
						<div class="text-[10px] text-white/60 truncate">{isBluetoothActive ? 'AirPods Pro' : 'Off'}</div>
					</div>
				</button>
			</div>

			<div class="grid grid-rows-2 gap-2">
				<button
					type="button"
					onclick={() => audioManager.toggleMute()}
					class={`p-2.5 rounded-2xl border flex items-center gap-2 cursor-pointer transition-colors ${
						!audioManager.isMuted
							? 'bg-blue-600/30 border-blue-400/40 text-blue-200'
							: 'bg-white/10 border-white/10 text-white/80'
					}`}
				>
					<span class="nf text-sm">{audioManager.isMuted ? '\uf026' : '\uf028'}</span>
					<span class="text-[11px] font-medium">{audioManager.isMuted ? 'Muted' : 'Synthesizer'}</span>
				</button>

				<button
					type="button"
					onclick={toggleDarkMode}
					class="p-2.5 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-2 cursor-pointer hover:bg-white/15 transition-colors"
				>
					<span class="nf text-sm">{isDarkMode ? '\uf186' : '\uf185'}</span>
					<span class="text-[11px] font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
				</button>
			</div>
		</div>

		<div class="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-2">
			<div class="flex items-center justify-between text-[11px]">
				<span class="text-white/80">Display</span>
				<span class="text-white/50">{brightness}%</span>
			</div>
			<input
				type="range"
				min="10"
				max="100"
				bind:value={brightness}
				class="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
			/>
		</div>

		<div class="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-2">
			<div class="flex items-center justify-between text-[11px]">
				<span class="text-white/80">Sound</span>
				<span class="text-white/50">{volume}%</span>
			</div>
			<input
				type="range"
				min="0"
				max="100"
				bind:value={volume}
				class="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
			/>
		</div>

		<div class="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
			<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow">
				<span class="nf text-lg text-white">{'\uf001'}</span>
			</div>
			<div class="truncate space-y-0.5 flex-1">
				<div class="font-medium text-xs truncate">Satyam Kumar</div>
				<div class="text-[10px] text-white/60 truncate">Full Stack Engineer & Tech Lead</div>
			</div>
		</div>
	</div>
{/if}
