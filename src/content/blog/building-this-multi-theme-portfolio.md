---
title: 'Architecting a Multi-Theme Portfolio with Svelte 5, Runes, and Tailwind v4'
date: '2026-08-16'
description: 'How I designed and engineered a 5-dimension interactive portfolio combining Clean Modern, Linux Hyprland, Arcade Realm, Cosmic Voyage, and macOS Desktop in SvelteKit.'
tags: ['svelte', 'sveltekit', 'tailwindcss', 'typescript', 'architecture']
readingTime: '5 min'
author: 'Satyam Kumar'
---

## The Vision: Beyond Static Portfolios

Most developer portfolios follow a predictable template: a hero banner, an about card, a grid of project screenshots, and a standard contact form. While functional, they rarely convey the developer's personality, deep technical breadth, or mastery over interactive design paradigms.

When embarking on this portfolio redesign, I wanted something radically different. Rather than choosing between a minimal resume layout, a Linux ricing simulation, or a retro gaming arcade, I decided to build all of them into a unified, cohesive application powered by Svelte 5 Runes and SvelteKit.

## Core Architectural Pillars

### 1. Unified Canonical Data Layer

Every theme imports from a single typed source of truth in `src/lib/data/portfolio.ts`. Whether you are browsing the Clean Modern layout, executing `cat projects.txt` inside the Linux terminal, or reviewing quest logs in the Arcade Realm, the underlying data remains identical.

```typescript
export interface Project {
	id: string;
	name: string;
	tagline: string;
	description: string;
	technologies: string[];
	links: { label: string; url: string }[];
	featured: boolean;
	category: 'web' | 'desktop' | 'game' | 'cli' | 'ai';
}
```

### 2. Fine-Grained Reactivity with Svelte 5 Runes

Svelte 5 introduces Runes (`$state`, `$derived`, `$props`, `$effect`), replacing compiler magic with explicit, fine-grained reactivity. This makes global state management—like our audio synthesizer, active theme router, and English/Hindi language store—completely lightweight without needing heavy external state libraries.

```svelte
<script lang="ts">
	let isHovered = $state(false);
	let displayTitle = $derived(project.name.toUpperCase());
</script>
```

### 3. Tailwind CSS v4 CSS-First Styling

With Tailwind CSS v4, we configure all theme color tokens (Catppuccin, Space Void, Retro Arcade) directly within CSS using `@theme` directives. Zero JavaScript configuration files, instant compilation, and maximum browser performance.

## The 5 Unique Dimensions

1. **Clean Modern**: Minimalist typography, dark/light contrast toggles, and responsive accessibility.
2. **Linux Hyprland**: A complete Wayland compositor simulation with floating windows, movable apps, and a functional command line.
3. **Arcade Realm**: Retro arcade cabinet with 4 mini-games (Platformer, Quiz, RPG Stats, Pac-Man) powered by Phaser.js.
4. **Cosmic Voyage**: Parallax space environment with orbit stations and holographic communication logs.
5. **macOS Desktop**: Apple desktop environment featuring a working Dock, Finder windows, and Spotlight search.

## Performance and Static Hosting

By configuring `@sveltejs/adapter-static` with `{ fallback: '404.html' }`, all 27 theme routes and markdown articles are fully pre-rendered at build time. The site deploys instantly to GitHub Pages with the custom domain `satyamjha.is-a.dev` with zero server overhead.
