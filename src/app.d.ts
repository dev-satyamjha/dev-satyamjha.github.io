declare global {
	namespace App {}
}

declare module '$env/static/public' {
	export const PUBLIC_WEB3FORMS_KEY: string;
}

export {};
