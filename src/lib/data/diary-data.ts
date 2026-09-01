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
			'Four years of pure joy, intense pressure, silly fights, endless debugging, day-and-night Linux ricing, and brutal sleepless exam nights. Throw in some totally unexpected friendships along the way and a roommate who was somehow way more invested in my career than his own — and you get one hell of an emotional rollercoaster ride!',
			'There were days when others doubted me and humiliated me, and honestly, plenty of days where I was my own biggest skeptic. But now, standing here as this chapter comes to an end, all those struggles and gritty determination have finally paid off. This is the story of Satyam Jha (legally Satyam Kumar) — a guy who never in a million years imagined stepping into Computer Science, but is now having the time of his life enjoying every single shade of it.'
		]
	},
	{
		id: 'intro-2',
		type: 'intro',
		title: 'August 17, 2023',
		subtitle: 'Prologue — Part 2: Shaking Legs & Destiny',
		content: [
			'So, let’s take it back to where it all kicked off: August 17, 2023.',
			'I arrived at the admission office with trembling legs at 5:00 AM sharp — even though the gates didn’t even open until 9:00 AM! While waiting anxiously in the seminar hall for my turn, I ended up meeting the guy who was destined to become my best friend and roommate throughout this entire college ride.',
			'He was literally seconds away from submitting his admission form before me, but a small mistake from his side, and I slipped in first. They say destiny always has quirky plans for you — never ignore the hints! If he had submitted first, our hostel allocation and this entire journey wouldn’t be anything like what it became (I’ll spill the tea on why in the upcoming chapters).',
			'After checking out our new hostel rooms with wide eyes, we parted ways to head back home. Then came August 31st — the day the real college journey was officially about to begin. Turn the page to see what happened next ➔',
			'— Satyam Jha'
		]
	},
	{
		id: 'semester-1',
		type: 'semester',
		title: 'Chapter I',
		subtitle: 'The Genesis',
		semesterNumber: 1,
		content: ['Updating soon...']
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
