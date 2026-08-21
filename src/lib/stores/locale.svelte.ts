import type { Locale, TranslationDictionary } from '$lib/types/i18n';
import { getDictionary } from '$lib/i18n';

class LocaleStore {
	current = $state<Locale>('en');

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portfolio_locale') as Locale | null;
			if (saved === 'en' || saved === 'hi') {
				this.current = saved;
			}
		}
	}

	get dict(): TranslationDictionary {
		return getDictionary(this.current);
	}

	setLocale(locale: Locale) {
		this.current = locale;
		if (typeof window !== 'undefined') {
			localStorage.setItem('portfolio_locale', locale);
			document.documentElement.lang = locale;
		}
	}

	toggleLocale() {
		this.setLocale(this.current === 'en' ? 'hi' : 'en');
	}
}

export const localeStore = new LocaleStore();
