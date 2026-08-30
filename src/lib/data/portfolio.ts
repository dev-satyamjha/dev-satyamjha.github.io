import type {
	Profile,
	Experience,
	Project,
	Education,
	Skill,
	Achievement,
	PortfolioData
} from '$lib/types/portfolio';
import { SITE_CONFIG } from './site-config';
import { SOCIAL_LINKS } from './social-links';

export const PROFILE: Profile = {
	name: SITE_CONFIG.name,
	title: 'Software Engineer & Open Source Advocate',
	summary:
		'Software Engineer and Full Stack Developer building cross-platform applications across Web, Desktop, Linux, and Mobile. Passionate about open source software, data privacy advocacy, and cybersecurity. Proficient in React, SvelteKit, Python, Go, and C#.NET with expertise in UI/UX design, CI/CD pipelines, and system automation. An Arch Linux power user who loves ricing Hyprland more than anything else.',
	email: SITE_CONFIG.email,
	location: SITE_CONFIG.location,
	avatar: '/images/profile_picture.jpeg',
	resumeUrl: 'https://drive.google.com/file/d/1igqMMGKn7GXNGfDmDonmNQNoBZMoFEKI',
	bio: [
		'4th-year Computer Science and Engineering undergraduate at Birla Institute of Technology, Mesra (2023-2027), building software across Linux, Windows, Web, and Mobile platforms.',
		'Arch Linux power user passionate about ricing Hyprland and crafting bespoke desktop environments, systems architecture, and workflow automation.',
		'Open source contributor and privacy advocate committed to building tools that solve real-world problems — for myself and for others.',
		'Endlessly curious — always learning new technologies, never backing down from a challenge, and constantly sharpening skills across cybersecurity, UI/UX, and full-stack engineering.',
		'Beyond code: socio-political commentary, cinema aficionado, spirited debater, and storyteller at heart.'
	]
};

export const EXPERIENCE: Experience[] = [
	{
		company: 'InPracSys',
		role: 'Full Stack Intern',
		duration: 'Jul 2026 – Present',
		mode: 'Remote',
		highlights: [
			'Designed interactive dashboards and enhanced legacy IT tools via structured debugging and cross-sync with senior engineers.',
			'Developed custom automation scripts and optimized Azure DevOps CI/CD pipelines, boosting deployment speed by 20%.'
		],
		technologies: ['Azure DevOps', 'CI/CD', 'Dashboards', 'Automation', 'TypeScript']
	},
	{
		company: 'GEMA Education Technology',
		role: 'Marketing Automation Intern',
		duration: 'Mar 2025 – May 2025',
		mode: 'Remote',
		highlights: [
			'Executed targeted campaigns reaching 25,000+ users using SendGrid and MailMeteor data pipelines.',
			'Automated A/B testing workflows for subject lines and content delivery, increasing user engagement by 5%.'
		],
		technologies: ['SendGrid', 'MailMeteor', 'A/B Testing', 'Email Automation', 'Analytics']
	}
];

export const PROJECTS: Project[] = [
	{
		id: 'ism-plus',
		name: 'ISM+',
		tagline: 'Native Windows network monitor with 400+ active users',
		description:
			'Published a native Windows monitor serving 400+ active users, monetizing features via a freemium Microsoft Store model. Designed lightweight floating widgets and taskbar indicators optimized for a <70MB memory footprint.',
		technologies: ['C#', '.NET', 'WPF', 'Windows API'],
		links: [
			{ label: 'MS Store', url: 'https://apps.microsoft.com/detail/9ncl3jrpkhtw' },
			{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }
		],
		featured: true,
		category: 'desktop',
		gameStats: { difficulty: 4, xp: 850, questType: 'epic' }
	},
	{
		id: 'cave-of-maya',
		name: 'The Cave of Maya',
		tagline: 'Cross-platform visual novel game with 7-level narrative',
		description:
			'Developed and released a cross-platform visual novel game compatible with Web, Windows, Linux, and Android. Crafted a 7-level narrative architecture managing 100+ interactive dialogues and logical puzzle mechanics inspired by Hindu philosophy.',
		technologies: ['Python', "Ren'Py", 'Game Logic'],
		links: [
			{ label: 'Play Game', url: 'https://dev-satyamjha.itch.io/the-cave-of-maya' },
			{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }
		],
		featured: true,
		category: 'game',
		gameStats: { difficulty: 3, xp: 700, questType: 'legendary' }
	},
	{
		id: 'auratrack',
		name: 'AuraTrack',
		tagline: 'YOLOv8 and 2D Homography visitor dwell-time tracker',
		description:
			'Deployed a YOLOv8 and 2D Homography pipeline to map visitor dwell times, delivering real-time tracking at 30+ FPS. Implemented a Dockerized FastAPI backend with idempotent ingestion, linking queue events to POS data at 0ms latency.',
		technologies: ['Python', 'FastAPI', 'OpenCV', 'YOLOv8', 'Docker'],
		links: [{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }],
		featured: true,
		category: 'ai',
		gameStats: { difficulty: 5, xp: 950, questType: 'boss' }
	},
	{
		id: 'job-focus-portal',
		name: 'Job Focus Portal',
		tagline: 'Job and exam update portal with 6-parameter filtering',
		description:
			'Launched a job and exam update blog portal featuring a 6-parameter Eloquent ORM filtering system. Created a moderation dashboard featuring relational MySQL grouping, accelerating content approval by 50%.',
		technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
		links: [
			{ label: 'Website', url: 'https://users.lovestoblog.com/' },
			{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }
		],
		featured: false,
		category: 'web',
		gameStats: { difficulty: 3, xp: 600, questType: 'main' }
	},
	{
		id: 'devreadme',
		name: 'DevReadME',
		tagline: 'Real-time Markdown editor for 100+ active developers',
		description:
			'Built a real-time Markdown editor with live preview and custom badge generation for 100+ active developers. Integrated serverless custom SVG rendering and GitHub API badges, reducing profile setup time by 60%.',
		technologies: ['React', 'Vite', 'Netlify', 'SVG'],
		links: [{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }],
		featured: false,
		category: 'web',
		gameStats: { difficulty: 2, xp: 500, questType: 'side' }
	},
	{
		id: 'ragified',
		name: 'RAGified',
		tagline: 'Client-side RAG engine with Gemini API and IndexedDB',
		description:
			'Architected a client-side RAG engine with Gemini API and vector embeddings for multi-modal retrieval. Devised IndexedDB storage and PDF/YouTube parsing pipelines, ensuring query latencies under <2s.',
		technologies: ['JavaScript', 'Gemini API', 'IndexedDB', 'Vector Embeddings'],
		links: [{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }],
		featured: true,
		category: 'ai',
		gameStats: { difficulty: 5, xp: 900, questType: 'epic' }
	},
	{
		id: 'nptel-quiz',
		name: 'NPTEL Quiz App',
		tagline: 'Mock exam simulator with analytics for NPTEL courses',
		description:
			'Frontend-only platform delivering week-wise practice sets for NPTEL courses. Real-time mock exam simulator with countdown timers and instant analytics.',
		technologies: ['JavaScript', 'HTML/CSS', 'LocalStorage'],
		links: [
			{ label: 'Website', url: 'https://nptel-quiz-app.netlify.app/' },
			{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }
		],
		featured: false,
		category: 'web',
		gameStats: { difficulty: 2, xp: 400, questType: 'side' }
	},
	{
		id: 'sysglance',
		name: 'SysGlance',
		tagline: 'PowerShell CLI alternative to systeminfo',
		description:
			'CLI alternative to Windows systeminfo aggregating 15+ system metrics. Reduced retrieval time by 30%.',
		technologies: ['PowerShell', 'Windows CLI'],
		links: [{ label: 'GitHub', url: 'https://github.com/dev-satyamjha' }],
		featured: false,
		category: 'cli',
		gameStats: { difficulty: 2, xp: 350, questType: 'side' }
	}
];

export const EDUCATION: Education[] = [
	{
		institution: 'Birla Institute of Technology, Mesra',
		degree: 'B.Tech in Computer Science and Engineering',
		duration: 'Aug 2023 – May 2027',
		location: 'Ranchi, India',
		grade: 'CGPA: 8.1 (Top 10%)',
		coursework: [
			'C',
			'Python',
			'Data Structures & Algorithms',
			'Operating Systems',
			'DBMS',
			'Data Mining',
			'Compiler Design',
			'Cryptography'
		]
	},
	{
		institution: 'D.A.V Public School, N.I.T Campus',
		degree: 'AISSCE Class XII',
		duration: '2022',
		location: 'Jamshedpur, India',
		grade: '80%',
		coursework: []
	},
	{
		institution: 'D.A.V Public School, N.I.T Campus',
		degree: 'AISSE Class X',
		duration: '2020',
		location: 'Jamshedpur, India',
		grade: '90%',
		coursework: []
	}
];

export const SKILLS: Skill[] = [
	{ name: 'Python', category: 'language', proficiency: 90, icon: 'nf-dev-python' },
	{ name: 'JavaScript', category: 'language', proficiency: 85, icon: 'nf-dev-javascript_badge' },
	{ name: 'C/C++', category: 'language', proficiency: 75, icon: 'nf-custom-cplusplus' },
	{ name: 'C#', category: 'language', proficiency: 70, icon: 'nf-dev-csharp' },
	{ name: 'Go', category: 'language', proficiency: 60, icon: 'nf-dev-go' },
	{ name: 'PHP', category: 'language', proficiency: 65, icon: 'nf-dev-php' },
	{ name: 'SQL', category: 'language', proficiency: 80, icon: 'nf-dev-database' },
	{ name: 'Bash', category: 'language', proficiency: 80, icon: 'nf-dev-terminal' },
	{ name: 'PowerShell', category: 'language', proficiency: 70, icon: 'nf-dev-terminal_badge' },
	{ name: 'Lua', category: 'language', proficiency: 50, icon: 'nf-seti-lua' },
	{ name: '.NET', category: 'framework', proficiency: 70, icon: 'nf-dev-dotnet' },
	{ name: 'SvelteKit', category: 'framework', proficiency: 80, icon: 'nf-dev-svelte' },
	{ name: 'React', category: 'framework', proficiency: 75, icon: 'nf-dev-react' },
	{ name: 'Laravel', category: 'framework', proficiency: 65, icon: 'nf-dev-laravel' },
	{ name: 'FastAPI', category: 'framework', proficiency: 70, icon: 'nf-dev-python' },
	{ name: "Ren'Py", category: 'framework', proficiency: 60, icon: 'nf-fa-gamepad' },
	{ name: 'Docker', category: 'devops', proficiency: 70, icon: 'nf-dev-docker' },
	{ name: 'Azure', category: 'devops', proficiency: 65, icon: 'nf-dev-azure' },
	{ name: 'Git', category: 'devops', proficiency: 90, icon: 'nf-dev-git' },
	{ name: 'Linux', category: 'devops', proficiency: 90, icon: 'nf-linux-archlinux' },
	{ name: 'CI/CD', category: 'devops', proficiency: 70, icon: 'nf-fa-refresh' },
	{ name: 'MySQL', category: 'database', proficiency: 75, icon: 'nf-dev-mysql' },
	{ name: 'Azure SQL', category: 'database', proficiency: 60, icon: 'nf-dev-database' },
	{ name: 'IndexedDB', category: 'database', proficiency: 65, icon: 'nf-fa-hdd_o' }
];

export const ACHIEVEMENTS: Achievement[] = [
	{
		title: 'Winner, College-Level Blind Coding Competition',
		issuer: 'BIT Mesra',
		type: 'competition'
	},
	{
		title: '25-Day Python Challenge Certification',
		issuer: 'Udemy',
		type: 'certification'
	},
	{
		title: 'Yuva AI Certification',
		issuer: 'Nasscom',
		type: 'certification'
	},
	{
		title: 'Artificial Intelligence Fundamentals',
		issuer: 'IBM',
		type: 'certification'
	}
];

export const PORTFOLIO_DATA: PortfolioData = {
	profile: PROFILE,
	socials: SOCIAL_LINKS,
	experience: EXPERIENCE,
	projects: PROJECTS,
	education: EDUCATION,
	skills: SKILLS,
	achievements: ACHIEVEMENTS
};
