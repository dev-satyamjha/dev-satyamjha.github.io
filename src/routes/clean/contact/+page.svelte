<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import ContactSection from '$lib/components/clean/ContactSection.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
	import { localeStore } from '$lib/stores/locale.svelte';
</script>

<SEOHead
	title={`${localeStore.dict.nav.contact} | ${PORTFOLIO_DATA.profile.name}`}
	description={localeStore.dict.meta.siteDescription}
	pathname="/clean/contact"
/>

<main id="main-content" class="py-8 pb-20">
	<ContactSection />
</main>
