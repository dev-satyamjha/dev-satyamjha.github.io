class ColorModeStore {
	current = $state<'dark' | 'light'>('dark');

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portfolio_color_mode');
			if (saved === 'light' || saved === 'dark') {
				this.current = saved;
			} else {
				this.current = 'dark'; 
			}
			this.apply();
		}
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		if (typeof window !== 'undefined') {
			localStorage.setItem('portfolio_color_mode', this.current);
		}
		this.apply();
	}

	setMode(mode: 'dark' | 'light') {
		this.current = mode;
		if (typeof window !== 'undefined') {
			localStorage.setItem('portfolio_color_mode', mode);
		}
		this.apply();
	}

	apply() {
		if (typeof document !== 'undefined') {
			const root = document.documentElement;
			if (this.current === 'light') {
				root.classList.add('light');
				root.classList.remove('dark');
				root.setAttribute('data-color-mode', 'light');
				root.style.colorScheme = 'light';
			} else {
				root.classList.add('dark');
				root.classList.remove('light');
				root.setAttribute('data-color-mode', 'dark');
				root.style.colorScheme = 'dark';
			}
		}
	}
}

export const colorModeStore = new ColorModeStore();
