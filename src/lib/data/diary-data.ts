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
		id: 'index',
		type: 'index',
		title: 'Table of Contents',
		subtitle: 'Navigate through the chapters',
		content: [
			'Prologue — The Rollercoaster Begins',
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
		id: 'intro-1',
		type: 'intro',
		title: 'The Rollercoaster Begins',
		subtitle: 'Prologue — Part 1: Four Years in a Flash',
		content: [
			'Dear Diary — Where It All Began,',
			'Four years of pure joy, intense pressure, silly fights, endless debugging, day-and-night Linux ricing, and brutal sleepless exam nights. Throw in some unexpected friendships and a roommate who was somehow way more invested in my career than his own — and you get one hell of an emotional rollercoaster ride!',
			'There were days when others doubted me and humiliated me, and honestly, plenty of days where I was my own biggest skeptic. But now, standing here as this chapter comes to an end, all those struggles and gritty determination have finally paid off. This is the story of Satyam Jha (legally Satyam Kumar) — a guy who never in a million years imagined stepping into Computer Science, but is now having the time of his life enjoying every single shade of it.'
		]
	},
	{
		id: 'intro-2',
		type: 'intro',
		title: 'August 17, 2023',
		subtitle: 'Prologue — Part 2: Shaking Legs at 5 AM',
		content: [
			'So, let’s take it back to where it all kicked off: August 17, 2023.',
			'I arrived at the admission office with trembling legs at 5:00 AM sharp — even though the gates didn’t even open until 9:00 AM! While waiting anxiously in the seminar hall for my turn, I ended up meeting the guy who was destined to become my best friend and roommate throughout this entire college ride.',
			'He was literally seconds away from submitting his admission form before me, but a small mistake from his side, and I slipped in first. They say destiny always has quirky plans for you — never ignore the hints!'
		]
	},
	{
		id: 'intro-3',
		type: 'intro',
		title: 'Destiny in Motion',
		subtitle: 'Prologue — Part 3: The Kickoff',
		content: [
			'If he had submitted first, our entire hostel allocation and this four-year adventure wouldn’t be anything like what it became (more on that in the upcoming bonus track!).',
			'After checking out our new hostel rooms with wide eyes, we parted ways to head back home. Then came August 31st — the day the real college journey was officially about to begin.',
			'Turn the page to see what happened next ➔',
			'— Satyam Jha'
		]
	},
	{
		id: 'semester-1-p1',
		type: 'semester',
		title: 'The Genesis: 2 AM Secrets',
		subtitle: 'Chapter I — Part 1: Unpacking, Achu & 3 AM Blessings',
		semesterNumber: 1,
		content: [
			'August 31, 2023. I arrived at the hostel in the afternoon, claimed my bed, and unpacked in the quiet room — the very first occupant of our new den.',
			'Later that evening, my roommate arrived: Achu Agarwal. A name I’d never heard in my life! We bonded instantly, spilling secrets and laughing till 2:00 AM. After barely an hour of sleep, I woke at 3:00 AM to visit Baba Baidyanath Mandir with my parents to seek blessings for this new chapter.'
		]
	},
	{
		id: 'semester-1-p2',
		type: 'semester',
		title: 'Goodbyes & The New World',
		subtitle: 'Chapter I — Part 2: Teary Goodbyes & Roommate X',
		semesterNumber: 1,
		content: [
			'By 8:00 AM, the hardest moment arrived — teary goodbyes with my parents after 18 years together. But college waited for no one: by afternoon, Achu and I were in the Student Induction Programme (SIP), touring campus, making friends, and playing weekend cricket.',
			'By Sunday night, our third roommate hadn’t shown up. Just as I declared we had a luxury double, in walked roommate number three — let’s just call him "X". Better left unsaid, as there are zero fond memories to recount there!'
		]
	},
	{
		id: 'semester-1-p3',
		type: 'semester',
		title: 'Stage Lights & Stardom',
		subtitle: 'Chapter I — Part 3: Singing Stardom & The Omegle Era',
		semesterNumber: 1,
		content: [
			'Then came an iconic core memory: a campus singing competition. My friends literally dragged me onto the stage. I had never sung in public in my life, but I took the mic, sang my heart out, and the crowd went wild cheering!',
			'My friend circle exploded overnight. Our hostel nights were filled with endless banter, late-night snacks, and chaotic Omegle sessions. Life felt like a dream — until reality came knocking.'
		]
	},
	{
		id: 'semester-1-p4',
		type: 'semester',
		title: 'The Great Fracturing',
		subtitle: 'Chapter I — Part 4: Quiz 1 Panic & The Politics Era',
		semesterNumber: 1,
		content: [
			'Three weeks in, Quiz 1 arrived. In a panic to study, I distanced myself from friends, which backfired: homesickness hit hard, and the friend circle shattered into rival factions with petty politics.',
			'Ironically, while I found a new core gang that felt like genuine family, the time I used to waste with the old group was now being wasted with the new one! Not a single page was being studied.'
		]
	},
	{
		id: 'semester-1-p5',
		type: 'semester',
		title: 'The Fresher Canon Event',
		subtitle: 'Chapter I — Part 5: Nightmare Subjects & The Survival Pass',
		semesterNumber: 1,
		content: [
			'Academics was a complete disaster. Special shoutout to the two greatest headaches of freshman year: Basics of Machine Learning and Basics of Electronic Communication. CSE freshers: pay attention from day one!',
			'Against all odds, I passed every subject through last-minute cramming. But I carried deep guilt for wasting time while my parents had sent me here with high hopes. Yet, I refused to stay down and gathered crucial lessons. Did I actually learn? Let’s find out in Chapter II ➔',
			'— Satyam Jha'
		]
	},
	{
		id: 'semester-1-bonus',
		type: 'semester',
		title: 'The Destiny Twist',
		subtitle: 'Chapter I — Bonus Track: The Room Next Door',
		semesterNumber: 1,
		content: [
			'Bonus Track: Remember the guy at the admission counter on August 17 who missed submitting the form right before me by a single second? That was [Harsh Narayan Jha](http://harshnj.is-a.dev/). Because of that tiny delay, he was allocated the room right next door to mine.',
			'Now here is the destiny twist: the rival groups that caused so much hostel drama ended up living in his room! Because of constant noise there, Harsh practically lived in mine — mentoring me in programming, computers, and college subjects.',
			'If he had been in my room and I in his, the future waiting for me would have turned out completely different. I will spill the full tea on why in the upcoming chapters. Stay tuned! ➔',
			'— Satyam Jha'
		]
	},
	{
		id: 'semester-2',
		type: 'semester',
		title: 'Chapter II',
		subtitle: 'Finding My Footing',
		semesterNumber: 2,
		content: ['Updating soon...']
	},
	{
		id: 'semester-3',
		type: 'semester',
		title: 'Chapter III',
		subtitle: 'The Deep Dive',
		semesterNumber: 3,
		content: ['Updating soon...']
	},
	{
		id: 'semester-4',
		type: 'semester',
		title: 'Chapter IV',
		subtitle: 'Building Momentum',
		semesterNumber: 4,
		content: ['Updating soon...']
	},
	{
		id: 'semester-5',
		type: 'semester',
		title: 'Chapter V',
		subtitle: 'The Turning Point',
		semesterNumber: 5,
		content: ['Updating soon...']
	},
	{
		id: 'semester-6',
		type: 'semester',
		title: 'Chapter VI',
		subtitle: 'Into the Real World',
		semesterNumber: 6,
		content: ['Updating soon...']
	},
	{
		id: 'semester-7',
		type: 'semester',
		title: 'Chapter VII',
		subtitle: 'The Final Stretch',
		semesterNumber: 7,
		content: ['Updating soon...']
	}
];
