<script lang="ts">
	import { SITE_CONFIG } from '$lib/data/site-config';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article' | 'profile';
		pathname?: string;
		publishedTime?: string;
		tags?: string[];
	}

	let {
		title,
		description,
		image = PORTFOLIO_DATA.profile.avatar,
		type = 'website',
		pathname = '',
		publishedTime,
		tags = []
	}: Props = $props();

	let fullTitle = $derived(
		title
			? `${title} | ${SITE_CONFIG.name}`
			: `${SITE_CONFIG.name} | ${localeStore.dict.meta.authorRole}`
	);

	let metaDescription = $derived(description ?? localeStore.dict.meta.siteDescription);

	let canonicalUrl = $derived(`${SITE_CONFIG.siteUrl}${pathname}`);

	let imageUrl = $derived(
		image.startsWith('http') ? image : `${SITE_CONFIG.siteUrl}${image}`
	);

	let schemaJson = $derived(
		JSON.stringify(
			type === 'article'
				? {
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: title,
						description: metaDescription,
						image: imageUrl,
						datePublished: publishedTime,
						author: {
							'@type': 'Person',
							name: SITE_CONFIG.name,
							url: SITE_CONFIG.siteUrl
						},
						publisher: {
							'@type': 'Person',
							name: SITE_CONFIG.name
						},
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': canonicalUrl
						},
						keywords: tags.join(', ')
					}
				: {
						'@context': 'https://schema.org',
						'@type': 'Person',
						name: SITE_CONFIG.name,
						url: SITE_CONFIG.siteUrl,
						image: imageUrl,
						jobTitle: PORTFOLIO_DATA.profile.title,
						description: metaDescription,
						email: SITE_CONFIG.email,
						telephone: SITE_CONFIG.phone,
						sameAs: PORTFOLIO_DATA.socials.map((s) => s.url)
					}
		)
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={metaDescription} />
	<link rel="canonical" href={canonicalUrl} />
	<meta name="author" content={SITE_CONFIG.name} />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#1e1e2e" />

	<meta property="og:site_name" content={SITE_CONFIG.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={fullTitle} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:creator" content={`@${SITE_CONFIG.handle}`} />

	{@html `<script type="application/ld+json">${schemaJson}</script>`}
</svelte:head>
