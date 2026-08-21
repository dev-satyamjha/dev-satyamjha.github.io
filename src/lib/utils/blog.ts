import type { BlogPost } from '$lib/types/blog';

interface MarkdownModule {
	metadata: {
		title: string;
		date: string;
		description: string;
		tags: string[];
		readingTime: string;
		author: string;
	};
	default: unknown;
}

export function getAllPosts(): BlogPost[] {
	const files = import.meta.glob<MarkdownModule>('/src/content/blog/*.md', { eager: true });
	const posts: BlogPost[] = [];

	for (const path in files) {
		const file = files[path];
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (file && file.metadata && slug) {
			posts.push({
				slug,
				title: file.metadata.title,
				date: file.metadata.date,
				description: file.metadata.description,
				tags: file.metadata.tags ?? [],
				readingTime: file.metadata.readingTime ?? '5 min',
				author: file.metadata.author ?? 'Satyam Kumar'
			});
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
	const posts = getAllPosts();
	const tagSet = new Set<string>();
	posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
	return Array.from(tagSet);
}
