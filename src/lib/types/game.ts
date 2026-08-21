export type GameId = 'platformer' | 'quiz' | 'rpg' | 'pacman';

export interface GameProgress {
	platformer: {
		completed: boolean;
		score: number;
		coinsCollected: string[];
	};
	quiz: {
		completed: boolean;
		score: number;
		rank: string;
		unlockedSections: string[];
	};
	rpg: {
		viewed: boolean;
		expandedSkills: string[];
	};
	pacman: {
		completed: boolean;
		highScore: number;
		level: number;
	};
	masterBadge: boolean;
}

export interface QuizQuestion {
	id: string;
	question: string;
	options: string[];
	correctIndex: number;
	explanation: string;
	unlockedSection: string;
}

export interface RPGAttribute {
	name: string;
	value: number;
	category: string;
}
