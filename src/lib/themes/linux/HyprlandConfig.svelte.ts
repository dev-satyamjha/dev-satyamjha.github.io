import type { WindowId, WindowState, Position, Size } from '$lib/types/window';
import { audioManager } from '$lib/stores/audio.svelte';

export interface WorkspaceConfig {
	id: number;
	name: string;
	icon: string;
}

export const WORKSPACES: WorkspaceConfig[] = [
	{ id: 1, name: 'Term', icon: '\uf120' },
	{ id: 2, name: 'Code', icon: '\ue7ba' },
	{ id: 3, name: 'Work', icon: '\uf0b1' },
	{ id: 4, name: 'Arch', icon: '\uf303' },
	{ id: 5, name: 'Web', icon: '\uf0ac' }
];

export const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
	terminal: {
		id: 'terminal',
		title: 'satyam@arch:~ (Alacritty)',
		icon: '\uf120',
		isOpen: true,
		isMinimized: false,
		isMaximized: false,
		zIndex: 10,
		position: { x: 40, y: 60 },
		size: { width: 720, height: 460 }
	},
	about: {
		id: 'about',
		title: 'neofetch (Fastfetch)',
		icon: '\uf303',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 80, y: 80 },
		size: { width: 620, height: 420 }
	},
	projects: {
		id: 'projects',
		title: 'ranger: ~/projects',
		icon: '\uf07c',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 120, y: 90 },
		size: { width: 780, height: 500 }
	},
	experience: {
		id: 'experience',
		title: 'htop (Internship Monitor)',
		icon: '\uf080',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 140, y: 100 },
		size: { width: 680, height: 440 }
	},
	skills: {
		id: 'skills',
		title: 'btop (Tech Stack Arsenal)',
		icon: '\uf0e4',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 160, y: 110 },
		size: { width: 700, height: 480 }
	},
	contact: {
		id: 'contact',
		title: 'mutt: compose transmission',
		icon: '\uf0e0',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 180, y: 120 },
		size: { width: 600, height: 450 }
	},
	settings: {
		id: 'settings',
		title: 'hyprland.conf (Settings)',
		icon: '\uf013',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 200, y: 130 },
		size: { width: 560, height: 400 }
	},
	blog: {
		id: 'blog',
		title: 'nvim: ~/notes/blog.md',
		icon: '\ue62b',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 100, y: 70 },
		size: { width: 740, height: 490 }
	}
};

class HyprlandManager {
	activeWorkspace = $state(1);
	activeWindowId = $state<WindowId | null>('terminal');
	isTiled = $state(true);
	isRofiOpen = $state(false);
	isPowerMenuOpen = $state(false);
	isCheatsheetOpen = $state(false);
	highestZIndex = $state(20);

	windows = $state<Record<WindowId, WindowState>>({ ...INITIAL_WINDOWS });

	switchWorkspace(id: number) {
		if (id < 1 || id > 5 || this.activeWorkspace === id) return;
		audioManager.play('click');
		this.activeWorkspace = id;

		if (id === 1 && !this.windows.terminal.isOpen) {
			this.openWindow('terminal');
		} else if (id === 2 && !this.windows.projects.isOpen) {
			this.openWindow('projects');
		} else if (id === 3 && !this.windows.experience.isOpen) {
			this.openWindow('experience');
		} else if (id === 4 && !this.windows.skills.isOpen) {
			this.openWindow('skills');
		} else if (id === 5 && !this.windows.blog.isOpen) {
			this.openWindow('blog');
		}
	}

	openWindow(id: WindowId) {
		audioManager.play('click');
		this.highestZIndex += 1;
		this.windows[id].isOpen = true;
		this.windows[id].isMinimized = false;
		this.windows[id].zIndex = this.highestZIndex;
		this.activeWindowId = id;
	}

	closeWindow(id: WindowId) {
		audioManager.play('click');
		this.windows[id].isOpen = false;
		if (this.activeWindowId === id) {
			const remainingOpen = (Object.keys(this.windows) as WindowId[]).filter(
				(k) => this.windows[k].isOpen && !this.windows[k].isMinimized && k !== id
			);
			this.activeWindowId = remainingOpen.length > 0 ? remainingOpen[remainingOpen.length - 1] : null;
		}
	}

	focusWindow(id: WindowId) {
		if (this.activeWindowId === id && this.windows[id].zIndex === this.highestZIndex) return;
		this.highestZIndex += 1;
		this.windows[id].zIndex = this.highestZIndex;
		this.windows[id].isMinimized = false;
		this.activeWindowId = id;
	}

	toggleMinimize(id: WindowId) {
		audioManager.play('click');
		this.windows[id].isMinimized = !this.windows[id].isMinimized;
		if (this.windows[id].isMinimized && this.activeWindowId === id) {
			this.activeWindowId = null;
		} else if (!this.windows[id].isMinimized) {
			this.focusWindow(id);
		}
	}

	toggleMaximize(id: WindowId) {
		audioManager.play('click');
		this.windows[id].isMaximized = !this.windows[id].isMaximized;
		this.focusWindow(id);
	}

	toggleTile() {
		audioManager.play('toggle');
		this.isTiled = !this.isTiled;
	}

	toggleRofi() {
		audioManager.play('click');
		this.isRofiOpen = !this.isRofiOpen;
	}

	togglePowerMenu() {
		audioManager.play('click');
		this.isPowerMenuOpen = !this.isPowerMenuOpen;
	}

	toggleCheatsheet() {
		audioManager.play('click');
		this.isCheatsheetOpen = !this.isCheatsheetOpen;
	}

	updatePosition(id: WindowId, pos: Position) {
		this.windows[id].position = pos;
	}

	updateSize(id: WindowId, size: Size) {
		this.windows[id].size = size;
	}
}

export const hyprland = new HyprlandManager();
