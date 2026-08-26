import type { WindowId, WindowState } from '$lib/types/window';
import { audioManager } from '$lib/stores/audio.svelte';
import { BaseWindowManager } from '$lib/utils/WindowManager.svelte';

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
	},
	resume: {
		id: 'resume',
		title: 'zathura: ~/documents/resume.pdf',
		icon: '\uf15c',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		zIndex: 5,
		position: { x: 130, y: 75 },
		size: { width: 760, height: 520 }
	}
};

class HyprlandManager extends BaseWindowManager<WindowId, WindowState> {
	activeWorkspace = $state(1);
	isTiled = $state(true);
	isRofiOpen = $state(false);
	isPowerMenuOpen = $state(false);
	isCheatsheetOpen = $state(false);

	constructor() {
		super(INITIAL_WINDOWS, 'terminal');
	}

	get activeWindowId(): WindowId | null {
		return this.activeId;
	}

	set activeWindowId(value: WindowId | null) {
		this.activeId = value;
	}

	switchWorkspace(id: number) {
		if (id < 1 || id > 5 || this.activeWorkspace === id) return;
		audioManager.play('click');
		this.activeWorkspace = id;

		if (id === 1 && !this.windows.terminal.isOpen) {
			this.open('terminal');
		} else if (id === 2 && !this.windows.projects.isOpen) {
			this.open('projects');
		} else if (id === 3 && !this.windows.experience.isOpen) {
			this.open('experience');
		} else if (id === 4 && !this.windows.skills.isOpen) {
			this.open('skills');
		} else if (id === 5 && !this.windows.blog.isOpen) {
			this.open('blog');
		}
	}

	openWindow(id: WindowId) {
		this.open(id);
	}

	closeWindow(id: WindowId) {
		this.close(id);
	}

	focusWindow(id: WindowId) {
		this.focus(id);
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
}

export const hyprland = new HyprlandManager();
