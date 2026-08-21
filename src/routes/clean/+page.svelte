<script lang="ts">
	import SEOHead from '$lib/components/shared/SEOHead.svelte';
	import HeroSection from '$lib/components/clean/HeroSection.svelte';
	import AboutSection from '$lib/components/clean/AboutSection.svelte';
	import ProjectsSection from '$lib/components/clean/ProjectsSection.svelte';
	import ExperienceSection from '$lib/components/clean/ExperienceSection.svelte';
	import SkillsSection from '$lib/components/clean/SkillsSection.svelte';
	import EducationSection from '$lib/components/clean/EducationSection.svelte';
	import ContactSection from '$lib/components/clean/ContactSection.svelte';
	import { PORTFOLIO_DATA } from '$lib/data/portfolio';
</script>

<SEOHead
	title={`${PORTFOLIO_DATA.profile.name} | Clean Modern`}
	description={PORTFOLIO_DATA.profile.summary}
	pathname="/clean"
/>

<main id="main-content" class="space-y-4 pb-20">
	<HeroSection />
	<AboutSection />
	<ProjectsSection />
	<ExperienceSection />
	<SkillsSection />
	<EducationSection />
	<ContactSection />
</main>
