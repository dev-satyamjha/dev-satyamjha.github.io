import type { ThemeKey, ThemeConfig } from '$lib/types/theme';

export const THEME_REGISTRY: Record<ThemeKey, ThemeConfig> = {
	portal: {
		key: 'portal',
		name: 'Dimension Portal',
		titleKey: 'chooseDimension',
		descKey: 'chooseDimension',
		icon: 'nf-fa-compass',
		route: '/',
		accentColor: '#89b4fa',
		previewClass: 'theme-portal'
	},
	clean: {
		key: 'clean',
		name: 'Clean Modern',
		titleKey: 'cleanTitle',
		descKey: 'cleanDesc',
		icon: 'nf-fa-laptop',
		route: '/clean',
		accentColor: '#3b82f6',
		previewClass: 'theme-clean'
	},
	linux: {
		key: 'linux',
		name: 'Linux Hyprland',
		titleKey: 'linuxTitle',
		descKey: 'linuxDesc',
		icon: 'nf-linux-archlinux',
		route: '/linux',
		accentColor: '#cba6f7',
		previewClass: 'theme-linux'
	},
	gaming: {
		key: 'gaming',
		name: 'Arcade Realm',
		titleKey: 'gamingTitle',
		descKey: 'gamingDesc',
		icon: 'nf-fa-gamepad',
		route: '/gaming',
		accentColor: '#f38ba8',
		previewClass: 'theme-gaming'
	},
	space: {
		key: 'space',
		name: 'Cosmic Voyage',
		titleKey: 'spaceTitle',
		descKey: 'spaceDesc',
		icon: 'nf-fa-rocket',
		route: '/space',
		accentColor: '#22d3ee',
		previewClass: 'theme-space'
	},
	macos: {
		key: 'macos',
		name: 'macOS Desktop',
		titleKey: 'macosTitle',
		descKey: 'macosDesc',
		icon: 'nf-fa-apple',
		route: '/macos',
		accentColor: '#f9e2af',
		previewClass: 'theme-macos'
	}
};

class ThemeStore {
	current = $state<ThemeKey>('portal');
	previous = $state<ThemeKey>('portal');
	isTransitioning = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			const path = window.location.pathname;
			const theme = this.getThemeFromPath(path);
			this.current = theme;
		}
	}

	get config(): ThemeConfig {
		return THEME_REGISTRY[this.current] ?? THEME_REGISTRY.portal;
	}

	getThemeFromPath(pathname: string): ThemeKey {
		if (pathname.startsWith('/clean')) return 'clean';
		if (pathname.startsWith('/linux')) return 'linux';
		if (pathname.startsWith('/gaming')) return 'gaming';
		if (pathname.startsWith('/space')) return 'space';
		if (pathname.startsWith('/macos')) return 'macos';
		return 'portal';
	}

	setTheme(theme: ThemeKey) {
		if (this.current === theme) return;
		this.previous = this.current;
		this.current = theme;
		if (typeof window !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}

	setTransitioning(value: boolean) {
		this.isTransitioning = value;
	}
}

export const themeStore = new ThemeStore();
