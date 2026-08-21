export interface Profile {
	name: string;
	title: string;
	summary: string;
	email: string;
	phone: string;
	location: string;
	avatar: string;
	resumeUrl: string;
	bio: string[];
}

export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
	username: string;
}

export interface Experience {
	company: string;
	role: string;
	duration: string;
	mode: string;
	highlights: string[];
	technologies: string[];
}

export interface Project {
	id: string;
	name: string;
	tagline: string;
	description: string;
	technologies: string[];
	links: { label: string; url: string }[];
	featured: boolean;
	category: 'web' | 'desktop' | 'game' | 'cli' | 'ai';
	gameStats?: {
		difficulty: number;
		xp: number;
		questType: 'main' | 'side' | 'epic' | 'boss' | 'legendary';
	};
}

export interface Education {
	institution: string;
	degree: string;
	duration: string;
	location: string;
	grade: string;
	coursework?: string[];
}

export interface Skill {
	name: string;
	category: 'language' | 'framework' | 'devops' | 'database';
	proficiency: number;
	icon: string;
}

export interface Achievement {
	title: string;
	issuer: string;
	type: 'competition' | 'certification';
}

export interface PortfolioData {
	profile: Profile;
	socials: SocialLink[];
	experience: Experience[];
	projects: Project[];
	education: Education[];
	skills: Skill[];
	achievements: Achievement[];
}
