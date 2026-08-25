import { PUBLIC_WEB3FORMS_KEY } from '$env/static/public';

export const SITE_CONFIG = {
	name: 'Satyam Kumar',
	handle: 'dev-satyamjha',
	domain: 'satyamjha.is-a.dev',
	siteUrl: 'https://satyamjha.is-a.dev',
	defaultTheme: 'portal' as const,
	defaultLocale: 'en' as const,
	email: 'satyamjha.me@gmail.com',
	location: 'Jamshedpur, India',
	repository: 'https://github.com/dev-satyamjha/Portfolio',
	web3FormsAccessKey: PUBLIC_WEB3FORMS_KEY ?? ''
};
