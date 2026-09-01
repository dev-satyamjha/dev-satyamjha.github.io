export interface DiaryPage {
	id: string;
	type: 'intro' | 'index' | 'semester';
	title: string;
	subtitle?: string;
	semesterNumber?: number;
	content: string[];
}

export const DIARY_PAGES: DiaryPage[] = [
	{
		id: 'introduction',
		type: 'intro',
		title: 'The Rollercoaster Begins',
		subtitle: 'From shaking legs at 5 AM to falling in love with CSE — The Prologue',
		content: [
			'Dear Diary — Where It All Began,',
			'Four years of pure joy, intense pressure, silly fights, endless debugging, day-and-night Linux ricing, and brutal sleepless exam nights. Throw in some totally unexpected friendships along the way and a roommate who was somehow way more invested in my career than his own — and you get one hell of an emotional rollercoaster ride!',
			'There were days when others doubted me and humiliated me, and honestly, plenty of days where I was my own biggest skeptic. But now, standing here as this chapter comes to an end, all those struggles and gritty determination have finally paid off. This is the story of Satyam Jha (legally Satyam Kumar) — a guy who never in a million years imagined stepping into Computer Science, but is now having the time of his life enjoying every single shade of it.',
			'So, let’s take it back to where it all kicked off: August 17, 2023.',
			'I arrived at the admission office with trembling legs at 5:00 AM sharp — even though the gates didn’t even open until 9:00 AM! While waiting anxiously in the seminar hall for my turn, I ended up meeting the guy who was destined to become my best friend and roommate throughout this entire college ride.',
			'He was literally seconds away from submitting his admission form before me, but a small mistake from his side, and I slipped in first. They say destiny always has quirky plans for you — never ignore the hints! If he had submitted first, our hostel allocation and this entire journey wouldn’t be anything like what it became (I’ll spill the tea on why in the upcoming chapters).',
			'After checking out our new hostel rooms with wide eyes, we parted ways to head back home. Then came August 31st — the day the real college journey was officially about to begin. Turn the page to see what happened next ➔',
			'— Satyam Jha'
		]
	},
	{
		id: 'index',
		type: 'index',
		title: 'Table of Contents',
		subtitle: 'Navigate through the semesters',
		content: [
			'Chapter I — Semester 1: The Genesis',
			'Chapter II — Semester 2: Finding My Footing',
			'Chapter III — Semester 3: The Deep Dive',
			'Chapter IV — Semester 4: Building Momentum',
			'Chapter V — Semester 5: The Turning Point',
			'Chapter VI — Semester 6: Into the Real World',
			'Chapter VII — Semester 7: The Final Stretch'
		]
	},
	{
		id: 'semester-1',
		type: 'semester',
		title: 'Chapter I',
		subtitle: 'The Genesis',
		semesterNumber: 1,
		content: [
			'August 2023. The first day at BIT Mesra.',
			'Everything felt overwhelming — the sprawling campus, the unfamiliar faces, the sudden independence. I remember unpacking my bag in the hostel room, setting up my laptop, and immediately installing Arch Linux. Some habits never change.',
			'The first semester was about survival. Data Structures, Mathematics, Physics — the fundamentals that would become the foundation for everything that followed. I spent more time in the computer lab than anywhere else.',
			'I joined the coding club within the first week. That single decision would change the trajectory of my entire college experience. The late-night hackathons, the whiteboard problem-solving sessions, the camaraderie of debugging at 3 AM.',
			'By the end of Semester 1, I had written my first complete project, made lifelong friends, and discovered that college was not just about grades — it was about becoming someone.',
			'The genesis was complete. The real journey was just beginning.'
		]
	},
	{
		id: 'semester-2',
		type: 'semester',
		title: 'Chapter II',
		subtitle: 'Finding My Footing',
		semesterNumber: 2,
		content: [
			'January 2024. Second semester, second wind.',
			'With the initial overwhelm behind me, I started to find my rhythm. Object-Oriented Programming became my playground, and I fell in love with the elegance of clean architecture. I started contributing to open source — nervously submitting my first pull request to a project I admired.',
			'This was the semester I discovered web development. HTML, CSS, JavaScript — the trinity that would become my primary craft. I built my first portfolio (a far cry from this one), and felt the magic of seeing code transform into something visual and interactive.',
			'The Hyprland ricing obsession also began here. I spent entire weekends ricing my desktop, learning about Wayland compositors, and diving deep into the Linux ecosystem. My dotfiles repository became my most carefully maintained project.',
			'I started attending tech meetups online, engaging with developer communities, and slowly building the confidence to call myself a developer.',
			'Finding my footing meant learning that the journey matters more than the destination.'
		]
	},
	{
		id: 'semester-3',
		type: 'semester',
		title: 'Chapter III',
		subtitle: 'The Deep Dive',
		semesterNumber: 3,
		content: [
			'August 2024. Time to go deeper.',
			'Semester 3 was when everything accelerated. Database Management Systems, Computer Networks, Operating Systems — the courses that lifted the veil on how technology actually works under the hood.',
			'I built my first full-stack application from scratch. React on the frontend, Node.js on the backend, PostgreSQL for the database. It was messy, it was beautiful, and it taught me more than any tutorial ever could.',
			'This was also when I started taking cybersecurity seriously. CTF competitions, vulnerability research, and the sobering realization that security is not optional — it is fundamental. I began advocating for data privacy in every project I touched.',
			'The deep dive was exhausting but transformative. I emerged with a clearer vision of who I wanted to be as an engineer and what kind of software I wanted to build.',
			'Some semesters teach you skills. This one taught me purpose.'
		]
	},
	{
		id: 'semester-4',
		type: 'semester',
		title: 'Chapter IV',
		subtitle: 'Building Momentum',
		semesterNumber: 4,
		content: [
			'January 2025. The momentum was undeniable.',
			'By now, I had a growing portfolio, a solid understanding of multiple tech stacks, and the confidence to tackle complex problems. SvelteKit entered my life this semester, and it was love at first compile. The reactivity model, the elegance, the performance — it felt like the framework was built for how I think.',
			'I started building tools that actually helped people. Utilities for students, automation scripts for workflows, and open-source contributions that received genuine appreciation from the community.',
			'CI/CD pipelines became second nature. Docker, GitHub Actions, automated testing — the infrastructure that separates hobby projects from production-ready software.',
			'This semester also brought my first internship opportunity. The interview process was nerve-wracking, but every rejected application and every failed round was a lesson in resilience.',
			'Building momentum is not about moving fast — it is about moving with intention.'
		]
	},
	{
		id: 'semester-5',
		type: 'semester',
		title: 'Chapter V',
		subtitle: 'The Turning Point',
		semesterNumber: 5,
		content: [
			'August 2025. Everything changed.',
			'Semester 5 was the inflection point — the moment where theoretical knowledge met real-world application. Advanced algorithms, machine learning fundamentals, and software engineering practices that bridged the gap between student and professional.',
			'I led my first team project. Managing people, setting deadlines, resolving conflicts — skills that no programming language can teach. The project was ambitious: a cross-platform application that worked on Web, Desktop, and Mobile.',
			'My open-source contributions gained traction. Pull requests to established projects, bug reports that were actually acknowledged, and the incredible feeling of seeing my code used by strangers across the world.',
			'This was also when I started this very portfolio — the multi-dimensional experience you are navigating right now. Every theme, every animation, every interaction was crafted during late nights this semester.',
			'The turning point was not a single moment. It was the accumulation of every late night, every failed build, and every breakthrough that came before.'
		]
	},
	{
		id: 'semester-6',
		type: 'semester',
		title: 'Chapter VI',
		subtitle: 'Into the Real World',
		semesterNumber: 6,
		content: [
			'January 2026. The real world beckoned.',
			'This semester was a bridge — between the safety of academia and the uncertainty of industry. Internships, projects with real stakeholders, and the pressure of delivering software that people actually depend on.',
			'I deepened my expertise in Go and Python for backend services, mastered system design concepts, and started thinking in architectures rather than individual features.',
			'The cybersecurity interest evolved into practical application. Security audits, penetration testing concepts, and the sobering responsibility of protecting user data in every application I build.',
			'Beyond the technical growth, this semester taught me the importance of communication. Writing documentation, presenting ideas, debating architectural decisions — the soft skills that multiply everything else.',
			'Stepping into the real world was not about leaving college behind. It was about carrying forward everything it taught me.'
		]
	},
	{
		id: 'semester-7',
		type: 'semester',
		title: 'Chapter VII',
		subtitle: 'The Final Stretch',
		semesterNumber: 7,
		content: [
			'August 2026. The final chapter begins.',
			'Seven semesters. Thousands of lines of code. Countless debugging sessions. And somehow, it still feels like the beginning.',
			'This semester is about refinement — polishing the skills, completing the portfolio, and preparing for what comes after. The capstone project brings together everything I have learned: full-stack development, system design, security, automation, and user experience.',
			'I look back at the nervous freshman who installed Arch Linux on day one and barely recognize him. But I also see the thread that connects every version of myself — the relentless curiosity, the refusal to settle, and the belief that software can genuinely improve lives.',
			'The final stretch is not about crossing a finish line. It is about standing at the starting line of everything that comes next.',
			'This diary will continue. The story is far from over.',
			'— Satyam Kumar, BIT Mesra, Class of 2027'
		]
	}
];
