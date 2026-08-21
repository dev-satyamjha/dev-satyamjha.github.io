import { getAllPosts } from '$lib/utils/blog';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	const posts = getAllPosts();
	return posts.map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
	try {
		const post = await import(`../../../../content/blog/${params.slug}.md`);
		return {
			content: post.default,
			metadata: post.metadata,
			slug: params.slug
		};
	} catch {
		error(404, `Could not find article: ${params.slug}`);
	}
}
