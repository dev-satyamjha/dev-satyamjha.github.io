export type ThemeKey = 'portal' | 'clean' | 'linux' | 'gaming' | 'space' | 'macos';

export interface ThemeConfig {
	key: ThemeKey;
	name: string;
	titleKey: string;
	descKey: string;
	icon: string;
	glyph: string;
	route: string;
	accentColor: string;
	previewClass: string;
}
