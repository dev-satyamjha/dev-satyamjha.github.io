import type { Locale, TranslationDictionary } from '$lib/types/i18n';
import { en } from './en';
import { hi } from './hi';

export const DICTIONARIES: Record<Locale, TranslationDictionary> = {
	en,
	hi
};

export function getDictionary(locale: Locale): TranslationDictionary {
	return DICTIONARIES[locale] ?? DICTIONARIES.en;
}
