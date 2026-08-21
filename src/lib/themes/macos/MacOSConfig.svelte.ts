import { audioManager } from '$lib/stores/audio.svelte';
import type { Position, Size } from '$lib/types/window';

export type MacAppId =
	| 'finder'
	| 'terminal'
	| 'projects'
	| 'experience'
	| 'skills'
	| 'mail'
	| 'notes'
	| 'settings';

export interface MacWindowState {
	id: MacAppId;
	title: string;
	icon: string;
	isOpen: boolean;
	isMinimized: boolean;
	isMaximized: boolean;
	zIndex: number;
	position: Position;
	size: Size;
}

export const INITIAL_MAC_APPS: Record<MacAppId, MacWindowState> = {
	finder: {
		id: 'finder',
		title: 'Finder - Satyam Kumar',
		icon: '\uf07b',
		isOpen: true,
		isMinimized: false,
		isMaximized: false,
		zIndex: 10,
		position: { x: 50, y: 60 },
		size: { width: 720, height: 460 }
	},
	terminal: {
		id: 'terminal',
		title: 'Terminal - satyam@macbook: ~',
		icon: '\uf120',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 80, y: 90 },
		size: { width: 680, height: 420 }
	},
	projects: {
		id: 'projects',
		title: 'Projects - App Showcase',
		icon: '\uf108',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 120, y: 100 },
		size: { width: 780, height: 490 }
	},
	experience: {
		id: 'experience',
		title: 'Activity Monitor - Career Milestones',
		icon: '\uf080',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 140, y: 110 },
		size: { width: 660, height: 440 }
	},
	skills: {
		id: 'skills',
		title: 'System Information - Skills & Specs',
		icon: '\uf0e4',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 160, y: 120 },
		size: { width: 680, height: 450 }
	},
	mail: {
		id: 'mail',
		title: 'Mail - Compose Transmission',
		icon: '\uf0e0',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 180, y: 130 },
		size: { width: 620, height: 460 }
	},
	notes: {
		id: 'notes',
		title: 'Notes - Technical Blog Articles',
		icon: '\uf249',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 100, y: 80 },
		size: { width: 740, height: 480 }
	},
	settings: {
		id: 'settings',
		title: 'System Settings',
		icon: '\uf013',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 200, y: 140 },
		size: { width: 560, height: 380 }
	}
};

class MacOSManager {
	activeAppId = $state<MacAppId>('finder');
	isSpotlightOpen = $state(false);
	isControlCenterOpen = $state(false);
	isAppleMenuOpen = $state(false);
	highestZIndex = $state(20);
	apps = $state<Record<MacAppId, MacWindowState>>({ ...INITIAL_MAC_APPS });

	openApp(id: MacAppId) {
		audioManager.play('click');
		this.highestZIndex += 1;
		this.apps[id].isOpen = true;
		this.apps[id].isMinimized = false;
		this.apps[id].zIndex = this.highestZIndex;
		this.activeAppId = id;
	}

	closeApp(id: MacAppId) {
		audioManager.play('click');
		this.apps[id].isOpen = false;
		if (this.activeAppId === id) {
			const remaining = (Object.keys(this.apps) as MacAppId[]).filter(
				(k) => this.apps[k].isOpen && !this.apps[k].isMinimized && k !== id
			);
			this.activeAppId = remaining.length > 0 ? remaining[remaining.length - 1] : 'finder';
		}
	}

	focusApp(id: MacAppId) {
		if (this.activeAppId === id && this.apps[id].zIndex === this.highestZIndex) return;
		this.highestZIndex += 1;
		this.apps[id].zIndex = this.highestZIndex;
		this.apps[id].isMinimized = false;
		this.activeAppId = id;
	}

	toggleMinimizeApp(id: MacAppId) {
		audioManager.play('click');
		this.apps[id].isMinimized = !this.apps[id].isMinimized;
		if (this.apps[id].isMinimized && this.activeAppId === id) {
			const remaining = (Object.keys(this.apps) as MacAppId[]).filter(
				(k) => this.apps[k].isOpen && !this.apps[k].isMinimized && k !== id
			);
			this.activeAppId = remaining.length > 0 ? remaining[remaining.length - 1] : 'finder';
		} else if (!this.apps[id].isMinimized) {
			this.focusApp(id);
		}
	}

	toggleMaximizeApp(id: MacAppId) {
		audioManager.play('click');
		this.apps[id].isMaximized = !this.apps[id].isMaximized;
		this.focusApp(id);
	}

	toggleSpotlight() {
		audioManager.play('click');
		this.isSpotlightOpen = !this.isSpotlightOpen;
		if (this.isSpotlightOpen) {
			this.isControlCenterOpen = false;
			this.isAppleMenuOpen = false;
		}
	}

	toggleControlCenter() {
		audioManager.play('click');
		this.isControlCenterOpen = !this.isControlCenterOpen;
		if (this.isControlCenterOpen) {
			this.isSpotlightOpen = false;
			this.isAppleMenuOpen = false;
		}
	}

	toggleAppleMenu() {
		audioManager.play('click');
		this.isAppleMenuOpen = !this.isAppleMenuOpen;
		if (this.isAppleMenuOpen) {
			this.isSpotlightOpen = false;
			this.isControlCenterOpen = false;
		}
	}

	updateAppPosition(id: MacAppId, pos: Position) {
		this.apps[id].position = pos;
	}

	updateAppSize(id: MacAppId, size: Size) {
		this.apps[id].size = size;
	}
}

export const macos = new MacOSManager();
