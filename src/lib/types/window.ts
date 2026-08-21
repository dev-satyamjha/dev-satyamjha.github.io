export type WindowId = 'terminal' | 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'settings' | 'blog';

export interface Position {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface WindowState {
	id: WindowId;
	title: string;
	icon: string;
	isOpen: boolean;
	isMinimized: boolean;
	isMaximized: boolean;
	zIndex: number;
	position: Position;
	size: Size;
}
