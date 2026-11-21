export interface CheatsheetMeta {
	slug: string;
	title: string;
	date?: string;
	category: string;
	tags: string[];
	intro: string;
	icon: string;
	background?: string;
	color: string;
	cardCount: number;
}

export interface CheatsheetCard {
	id: string;
	title: string;
	colSpan: number;
	rowSpan: number;
	theme?: 'default' | 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'success';
	html: string;
	codeSnippets: string[];
}

export interface CheatsheetSection {
	id: string;
	title: string;
	cols?: number;
	cards: CheatsheetCard[];
}

export interface CheatsheetDetail extends CheatsheetMeta {
	sections: CheatsheetSection[];
}

export const RECOMMENDED_SLUGS = [
	'chatgpt',
	'bash',
	'python',
	'javascript',
	'go',
	'vim',
	'regex',
	'awk',
	'docker',
	'git',
	'linux',
	'typescript'
];

export const HOMEPAGE_CATEGORIES = [
	'AI',
	'Programming',
	'Toolkit',
	'Operating System',
	'Linux Command',
	'Python',
	'Database',
	'Keyboard Shortcuts',
	'Game',
	'Other'
];
