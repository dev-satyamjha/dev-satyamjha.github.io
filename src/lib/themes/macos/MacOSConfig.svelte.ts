import type { Position, Size } from '$lib/types/window';
import { audioManager } from '$lib/stores/audio.svelte';
import { BaseWindowManager } from '$lib/utils/WindowManager.svelte';

export type MacAppId =
	| 'finder'
	| 'terminal'
	| 'projects'
	| 'experience'
	| 'skills'
	| 'mail'
	| 'notes'
	| 'settings'
	| 'preview';

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
	},
	preview: {
		id: 'preview',
		title: 'Preview - Satyam_Kumar_Resume.pdf',
		icon: '\uf15c',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 110, y: 70 },
		size: { width: 780, height: 530 }
	}
};

class MacOSManager extends BaseWindowManager<MacAppId, MacWindowState> {
	isSpotlightOpen = $state(false);
	isControlCenterOpen = $state(false);
	isAppleMenuOpen = $state(false);

	constructor() {
		super(INITIAL_MAC_APPS, 'finder');
	}

	get activeAppId(): MacAppId {
		return this.activeId ?? 'finder';
	}

	set activeAppId(value: MacAppId) {
		this.activeId = value;
	}

	get apps(): Record<MacAppId, MacWindowState> {
		return this.windows;
	}

	openApp(id: MacAppId) {
		this.open(id);
	}

	closeApp(id: MacAppId) {
		this.close(id, 'finder');
	}

	focusApp(id: MacAppId) {
		this.focus(id);
	}

	toggleMinimizeApp(id: MacAppId) {
		this.toggleMinimize(id, 'finder');
	}

	toggleMaximizeApp(id: MacAppId) {
		this.toggleMaximize(id);
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
		this.updatePosition(id, pos);
	}

	updateAppSize(id: MacAppId, size: Size) {
		this.updateSize(id, size);
	}
}

export const macos = new MacOSManager();
