<div align="center">

# 🌌 Multi-Dimensional Developer Portfolio

<p align="center">
  <strong>An immersive, multi-thematic portfolio crafted with Svelte 5, Svelte Runes, and Tailwind CSS v4.</strong>
</p>

<p align="center">
  <a href="https://satyamjha.is-a.dev"><img src="https://img.shields.io/badge/Live_Demo-satyamjha.is--a.dev-89b4fa?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/dev-satyamjha/Portfolio"><img src="https://img.shields.io/badge/GitHub-dev--satyamjha-cba6f7?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <img src="https://img.shields.io/badge/SvelteKit-5.0_(Runes)-ff3e00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Runtime-Bun-fbf0df?style=for-the-badge&logo=bun&logoColor=black" alt="Bun" />
</p>

</div>

---

## 🌟 The 5 Dimensions

This portfolio is architected as an interactive gateway to **5 distinct spatial experiences**, each reflecting a different aspect of systems engineering, design philosophy, and gaming:

| Dimension                    | Route     | Experience Highlights                                                                                                                               |
| ---------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🌌 Gateway Portal**        | `/`       | Dimension selection gateway with sound synthesis, smooth routing, and responsive previews.                                                          |
| **✨ Clean Modern**          | `/clean`  | Minimalist editorial layout, full blog reader (`/clean/blog`), project showcases, and contact inquiry form.                                         |
| **🐧 Arch Linux + Hyprland** | `/linux`  | Simulated Wayland compositor featuring floating/tiling windows, Rofi app launcher, Waybar telemetry, and an interactive Zsh shell (`TerminalCore`). |
| **🍎 macOS Sonoma**          | `/macos`  | Desktop environment complete with Apple Menubar, dynamic magnification Dock, Finder file explorer, Control Center, and Spotlight Search (`Cmd+K`).  |
| **🚀 Cosmic Space Station**  | `/space`  | Deep space observatory with interactive canvas starfield, holographic Bridge dossier, Hangar starship fleet, Reactor, and Vault telemetry.          |
| **🕹️ Retro Arcade Realm**    | `/gaming` | Interactive 8-bit arcade hub featuring playable games: Pacman, Platformer, Trivia Quiz, and RPG Stats quest log.                                    |

---

## 🚀 Key Architectural Features

- **⚡ Svelte 5 Runes**: Built entirely with modern Svelte 5 state management primitives (`$state`, `$derived`, `$props`, `$effect`).
- **🎨 Tailwind CSS v4**: Utilizes the next-generation `@theme` CSS configuration and modern design tokens.
- **🎵 Web Audio Synthesizer**: Custom zero-dependency oscillator-based sound engine (`AudioManager`) generating real-time UI audio feedback without external audio files.
- **📄 In-App Document Viewer**: View resume and project dossiers directly within native desktop windows and in-page modals across all themes — no third-party tab redirects.
- **🛡️ Secure Contact Forms**: Unified Svelte 5 `ContactFormManager` composable supporting Web3Forms API, automated spam botcheck traps, and cooldown timers with memory leak prevention.
- **🔤 Curated Typography**: Paired fonts featuring **Space Grotesk** (UI/body), **Clash Display** (display/headings), and **Geist Mono** (code/terminal).
- **♿ First-Class Accessibility & SEO**: Semantic HTML5 hierarchy, comprehensive ARIA attributes, structured JSON-LD metadata, and static prerendering via `@sveltejs/adapter-static`.

---

## 📂 Project Structure

```text
src/
├── app.css
├── app.html
├── content/blog/
├── lib/
│   ├── components
│   │   ├── clean/
│   │   ├── gaming/
│   │   ├── linux/
│   │   ├── macos/
│   │   ├── portal/
│   │   ├── shared/
│   │   └── space/
│   ├── data/
│   ├── stores/
│   ├── themes/
│   ├── types/
│   └── utils/
└── routes/
```

---

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js `>= 20`

### Installation

```bash
# Clone the repository
git clone https://github.com/dev-satyamjha/Portfolio.git
cd Portfolio

# Install dependencies
bun install
```

### Environment Configuration

Copy the example environment template:

```bash
cp .env.example .env
```

Open `.env` and configure your optional Web3Forms access key:

```env
PUBLIC_WEB3FORMS_KEY=your_web3forms_key_here
```

> [!NOTE]
> You can generate a free access key at [web3forms.com](https://web3forms.com). The application builds and runs smoothly even if left blank.

### Development Server

```bash
bun run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Code Quality & Build Scripts

```bash
# Format codebase with Prettier
bun run format

# Run ESLint validation
bun run lint

# Run SvelteKit TypeScript checks
bun run check

# Build production static bundle (outputs to /build)
bun run build

# Preview static production build locally
bun run preview
```

---

## 🚢 Deployment (GitHub Pages)

The project includes an automated GitHub Actions deployment workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

To deploy to GitHub Pages:

1. Fork or push to your `main` branch.
2. In GitHub repository **Settings** → **Pages**, set Source to **GitHub Actions**.
3. (Optional) In **Settings** → **Secrets and variables** → **Actions**, add `PUBLIC_WEB3FORMS_KEY` as a repository secret.

---

## 📄 License

Distributed under the [MIT License](LICENSE). Built with ❤️ by [Satyam Kumar](https://satyamjha.is-a.dev).
