export type Locale = 'en' | 'hi';

export interface TranslationDictionary {
	meta: {
		siteTitle: string;
		siteDescription: string;
		authorRole: string;
	};
	common: {
		backToPortal: string;
		viewWork: string;
		downloadResume: string;
		resume: string;
		contactMe: string;
		sendMessage: string;
		readMore: string;
		liveDemo: string;
		sourceCode: string;
		loading: string;
		visitors: string;
		soundOn: string;
		soundOff: string;
		theme: string;
		language: string;
	};
	portal: {
		headline: string;
		subtitle: string;
		chooseDimension: string;
		cleanTitle: string;
		cleanDesc: string;
		linuxTitle: string;
		linuxDesc: string;
		gamingTitle: string;
		gamingDesc: string;
		spaceTitle: string;
		spaceDesc: string;
		macosTitle: string;
		macosDesc: string;
	};
	nav: {
		about: string;
		experience: string;
		projects: string;
		skills: string;
		education: string;
		contact: string;
		blog: string;
	};
	sections: {
		aboutHeading: string;
		experienceHeading: string;
		projectsHeading: string;
		skillsHeading: string;
		educationHeading: string;
		contactHeading: string;
		blogHeading: string;
	};
	contact: {
		nameLabel: string;
		emailLabel: string;
		subjectLabel: string;
		messageLabel: string;
		sendButton: string;
		sending: string;
		successMessage: string;
		errorMessage: string;
	};
}
