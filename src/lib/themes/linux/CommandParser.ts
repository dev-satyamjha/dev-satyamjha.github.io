import { PORTFOLIO_DATA } from '$lib/data/portfolio';
import { hyprland } from '$lib/themes/linux/HyprlandConfig.svelte';
import { goto } from '$app/navigation';
import type { WindowId } from '$lib/types/window';

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export interface CommandOutput {
	id: string;
	command: string;
	output: string;
	isHtml?: boolean;
	isError?: boolean;
	timestamp: string;
}

export const AUTOCOMPLETE_COMMANDS = [
	'help',
	'neofetch',
	'fastfetch',
	'ls',
	'cat',
	'cd',
	'pwd',
	'clear',
	'whoami',
	'projects',
	'skills',
	'experience',
	'education',
	'contact',
	'open',
	'theme',
	'matrix',
	'cowsay',
	'fortune',
	'sl',
	'sudo',
	'history',
	'exit'
];

export const VIRTUAL_FILES = [
	'about.txt',
	'projects.txt',
	'skills.json',
	'experience.txt',
	'education.txt',
	'contact.sh',
	'resume.pdf',
	'hyprland.conf'
];

const FORTUNES = [
	'"There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton',
	'"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
	'"First, solve the problem. Then, write the code." — John Johnson',
	'"Make it work, make it right, make it fast." — Kent Beck',
	'"Talk is cheap. Show me the code." — Linus Torvalds',
	'"Unix is simple. It just takes a genius to understand its simplicity." — Dennis Ritchie'
];

export function executeCommand(
	rawInput: string,
	currentDir: string,
	setCurrentDir: (dir: string) => void
): { output: string; isHtml?: boolean; isError?: boolean; clearScreen?: boolean } {
	const trimmed = rawInput.trim();
	if (!trimmed) return { output: '' };

	const parts = trimmed.split(' ');
	const cmd = parts[0].toLowerCase();
	const args = parts.slice(1);

	if (cmd === 'clear' || cmd === 'cls') {
		return { output: '', clearScreen: true };
	}

	if (cmd === 'help') {
		return {
			isHtml: true,
			output: `
<div class="space-y-3 font-mono text-xs">
  <div class="text-[#cba6f7] font-bold">Hyprland Terminal Shell — Available Commands:</div>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
    <div><span class="text-[#89b4fa] font-bold">neofetch / fastfetch</span> - Display Arch Linux system telemetry</div>
    <div><span class="text-[#89b4fa] font-bold">projects</span> - List portfolio projects and repositories</div>
    <div><span class="text-[#89b4fa] font-bold">skills</span> - Inspect technical skill matrix & proficiency</div>
    <div><span class="text-[#89b4fa] font-bold">experience</span> - View internship experience and history</div>
    <div><span class="text-[#89b4fa] font-bold">education</span> - Display academic background and honors</div>
    <div><span class="text-[#89b4fa] font-bold">contact</span> - Show direct contact information & links</div>
    <div><span class="text-[#89b4fa] font-bold">open &lt;app&gt;</span> - Launch GUI window (terminal, projects, mutt, nvim)</div>
    <div><span class="text-[#89b4fa] font-bold">theme &lt;name&gt;</span> - Switch dimension (clean, gaming, space, macos)</div>
    <div><span class="text-[#89b4fa] font-bold">ls / dir</span> - List files in current virtual directory</div>
    <div><span class="text-[#89b4fa] font-bold">cat &lt;file&gt;</span> - Read content of virtual file</div>
    <div><span class="text-[#89b4fa] font-bold">cd &lt;dir&gt;</span> - Change virtual working directory</div>
    <div><span class="text-[#89b4fa] font-bold">whoami</span> - Display current user session info</div>
    <div><span class="text-[#89b4fa] font-bold">pwd</span> - Print working directory path</div>
    <div><span class="text-[#89b4fa] font-bold">matrix</span> - Launch digital Matrix rain effect</div>
    <div><span class="text-[#89b4fa] font-bold">cowsay &lt;msg&gt;</span> - Let the ASCII cow speak</div>
    <div><span class="text-[#89b4fa] font-bold">fortune</span> - Print a random engineering quote</div>
    <div><span class="text-[#89b4fa] font-bold">sl</span> - Run the steam locomotive</div>
    <div><span class="text-[#89b4fa] font-bold">exit</span> - Return to dimension portal gateway</div>
  </div>
</div>`
		};
	}

	if (cmd === 'whoami') {
		return {
			output: `${PORTFOLIO_DATA.profile.name} (${PORTFOLIO_DATA.profile.title})\nLocation: ${PORTFOLIO_DATA.profile.location}\nEmail: ${PORTFOLIO_DATA.profile.email}`
		};
	}

	if (cmd === 'pwd') {
		return {
			output: currentDir === '~' ? '/home/satyam' : `/home/satyam/${currentDir.replace('~/', '')}`
		};
	}

	if (cmd === 'cd') {
		const target = args[0] || '~';
		if (target === '~' || target === '/' || target === '/home/satyam') {
			setCurrentDir('~');
			return { output: '' };
		}
		if (target === 'projects' || target === '~/projects') {
			setCurrentDir('~/projects');
			return { output: '' };
		}
		if (target === 'blog' || target === '~/blog') {
			setCurrentDir('~/blog');
			return { output: '' };
		}
		if (target === '..') {
			setCurrentDir('~');
			return { output: '' };
		}
		return { output: `cd: no such file or directory: ${target}`, isError: true };
	}

	if (cmd === 'ls' || cmd === 'dir') {
		if (currentDir === '~/projects') {
			const projectList = PORTFOLIO_DATA.projects
				.map((p) => `<span class="text-[#89b4fa]">${p.id}/</span>`)
				.join('  ');
			return { isHtml: true, output: projectList };
		}
		if (currentDir === '~/blog') {
			return {
				isHtml: true,
				output: `<span class="text-[#a6e3a1]">building-this-multi-theme-portfolio.md</span>  <span class="text-[#a6e3a1]">arch-linux-hyprland-development-setup.md</span>  <span class="text-[#a6e3a1]">cross-platform-desktop-apps-dotnet-wpf.md</span>`
			};
		}
		return {
			isHtml: true,
			output: `<span class="text-[#89b4fa] font-bold">projects/</span>  <span class="text-[#89b4fa] font-bold">blog/</span>  <span class="text-[#a6e3a1]">about.txt</span>  <span class="text-[#a6e3a1]">skills.json</span>  <span class="text-[#a6e3a1]">experience.txt</span>  <span class="text-[#a6e3a1]">education.txt</span>  <span class="text-[#f9e2af]">contact.sh</span>  <span class="text-[#f38ba8]">resume.pdf</span>  <span class="text-[#cba6f7]">hyprland.conf</span>`
		};
	}

	if (cmd === 'cat') {
		const target = (args[0] || '').toLowerCase();
		if (!target) return { output: 'cat: missing operand. Usage: cat <filename>', isError: true };

		if (target === 'about.txt') {
			return {
				output: `${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.title}\n\n${PORTFOLIO_DATA.profile.bio.join('\n\n')}`
			};
		}
		if (target === 'projects.txt' || target === 'projects') {
			const text = PORTFOLIO_DATA.projects
				.map(
					(p) =>
						`* [${p.category.toUpperCase()}] ${p.name} — ${p.tagline}\n  Stack: ${p.technologies.join(', ')}\n  Link: ${p.links[0]?.url || 'N/A'}`
				)
				.join('\n\n');
			return { output: text };
		}
		if (target === 'skills.json' || target === 'skills') {
			return {
				output: JSON.stringify(PORTFOLIO_DATA.skills, null, 2)
			};
		}
		if (target === 'experience.txt' || target === 'experience') {
			const expText = PORTFOLIO_DATA.experience
				.map(
					(e) =>
						`[${e.duration}] ${e.role} @ ${e.company} (${e.mode})\n${e.highlights.map((h) => `  - ${h}`).join('\n')}`
				)
				.join('\n\n');
			return { output: expText };
		}
		if (target === 'education.txt' || target === 'education') {
			const eduText = PORTFOLIO_DATA.education
				.map(
					(ed) =>
						`${ed.institution}\nDegree: ${ed.degree} (${ed.duration})\nGrade: ${ed.grade}\nCoursework: ${ed.coursework?.join(', ') || 'N/A'}`
				)
				.join('\n\n');
			return { output: eduText };
		}
		if (target === 'contact.sh') {
			return {
				output: `#!/bin/bash\n# Direct Transmission\nEMAIL="${PORTFOLIO_DATA.profile.email}"\nLOCATION="${PORTFOLIO_DATA.profile.location}"\ncurl -X POST https://api.web3forms.com/submit`
			};
		}
		if (target === 'resume.pdf') {
			return {
				isHtml: true,
				output: `Resume document located at <a href="${PORTFOLIO_DATA.profile.resumeUrl}" target="_blank" class="text-[#89b4fa] underline">${PORTFOLIO_DATA.profile.resumeUrl}</a>. Type <span class="text-[#a6e3a1]">open resume</span> to view.`
			};
		}
		if (target === 'hyprland.conf') {
			return {
				output: `monitor=,preferred,auto,1\nexec-once = waybar & swww init\ngeneral {\n    gaps_in = 5\n    gaps_out = 10\n    border_size = 2\n    col.active_border = rgba(cba6f7ee)\n    col.inactive_border = rgba(313244aa)\n    layout = dwindle\n}\n\nbind = SUPER, Return, exec, alacritty\nbind = SUPER, D, exec, rofi -show drun\nbind = SUPER, Q, killactive`
			};
		}
		return { output: `cat: ${target}: No such file or directory`, isError: true };
	}

	if (cmd === 'neofetch' || cmd === 'fastfetch') {
		return {
			isHtml: true,
			output: `
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 font-mono text-xs py-2">
  <div class="md:col-span-4 text-[#cba6f7] leading-tight select-none">
<pre class="font-bold text-[11px]">
       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\
</pre>
  </div>
  <div class="md:col-span-8 space-y-1 text-[11px]">
    <div><span class="text-[#cba6f7] font-bold">satyam</span><span class="text-[#a6adc8]">@</span><span class="text-[#cba6f7] font-bold">archlinux</span></div>
    <div class="text-[#313244]">------------------------</div>
    <div><span class="text-[#89b4fa] font-bold">OS:</span> Arch Linux x86_64</div>
    <div><span class="text-[#89b4fa] font-bold">Host:</span> BIT Mesra Workstation</div>
    <div><span class="text-[#89b4fa] font-bold">Kernel:</span> 6.10.4-arch1-1</div>
    <div><span class="text-[#89b4fa] font-bold">Uptime:</span> 4 years, 50+ projects</div>
    <div><span class="text-[#89b4fa] font-bold">Packages:</span> 24 (pacman, cargo, npm, bun)</div>
    <div><span class="text-[#89b4fa] font-bold">Shell:</span> zsh 5.9 (x86_64-arch-linux-gnu)</div>
    <div><span class="text-[#89b4fa] font-bold">WM:</span> Hyprland (Wayland)</div>
    <div><span class="text-[#89b4fa] font-bold">Theme:</span> Catppuccin Mocha [GTK3]</div>
    <div><span class="text-[#89b4fa] font-bold">Terminal:</span> Alacritty</div>
    <div><span class="text-[#89b4fa] font-bold">CPU:</span> Full Stack Engine (8) @ 4.200GHz</div>
    <div><span class="text-[#89b4fa] font-bold">Memory:</span> 400+ Users / 70MB RAM</div>
    <div class="pt-2 flex items-center gap-1.5">
      <span class="w-3 h-3 rounded-full bg-[#f38ba8]"></span>
      <span class="w-3 h-3 rounded-full bg-[#fab387]"></span>
      <span class="w-3 h-3 rounded-full bg-[#f9e2af]"></span>
      <span class="w-3 h-3 rounded-full bg-[#a6e3a1]"></span>
      <span class="w-3 h-3 rounded-full bg-[#74c7ec]"></span>
      <span class="w-3 h-3 rounded-full bg-[#89b4fa]"></span>
      <span class="w-3 h-3 rounded-full bg-[#cba6f7]"></span>
    </div>
  </div>
</div>`
		};
	}

	if (cmd === 'projects') {
		const html = `
<div class="space-y-3 font-mono text-xs">
  <div class="text-[#cba6f7] font-bold">Featured Engineering Projects:</div>
  ${PORTFOLIO_DATA.projects
		.map(
			(p) => `
    <div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244] space-y-1">
      <div class="flex items-center justify-between text-xs">
        <span class="text-white font-bold">${p.name}</span>
        <span class="text-[#89b4fa] uppercase text-[10px]">[${p.category}]</span>
      </div>
      <div class="text-[#a6adc8] text-[11px]">${p.tagline}</div>
      <div class="text-[10px] text-[#cba6f7]">Stack: ${p.technologies.join(', ')}</div>
      <div class="text-[10px]">
        ${p.links.map((l) => `<a href="${l.url}" target="_blank" class="text-[#89b4fa] underline mr-2">${l.label}</a>`).join('')}
      </div>
    </div>`
		)
		.join('')}
</div>`;
		return { isHtml: true, output: html };
	}

	if (cmd === 'skills') {
		const html = `
<div class="space-y-3 font-mono text-xs">
  <div class="text-[#cba6f7] font-bold">Technical Arsenal (24 Skills):</div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
    ${PORTFOLIO_DATA.skills
			.map(
				(s) => `
      <div class="p-2 rounded-lg bg-[#11111b] border border-[#313244] flex items-center justify-between">
        <span class="text-white">${s.name}</span>
        <span class="text-[#a6e3a1] font-bold">${s.proficiency}%</span>
      </div>`
			)
			.join('')}
  </div>
</div>`;
		return { isHtml: true, output: html };
	}

	if (cmd === 'experience') {
		const html = `
<div class="space-y-3 font-mono text-xs">
  <div class="text-[#cba6f7] font-bold">Work Experience & Internships:</div>
  ${PORTFOLIO_DATA.experience
		.map(
			(e) => `
    <div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244] space-y-1">
      <div class="flex items-center justify-between">
        <span class="text-white font-bold">${e.role}</span>
        <span class="text-[#89b4fa] text-[10px]">${e.duration}</span>
      </div>
      <div class="text-[#cba6f7] text-[11px]">${e.company} (${e.mode})</div>
      <ul class="text-[#a6adc8] text-[10px] list-disc list-inside space-y-0.5 pt-1">
        ${e.highlights.map((h) => `<li>${h}</li>`).join('')}
      </ul>
    </div>`
		)
		.join('')}
</div>`;
		return { isHtml: true, output: html };
	}

	if (cmd === 'education') {
		const html = `
<div class="space-y-3 font-mono text-xs">
  <div class="text-[#cba6f7] font-bold">Academic Background:</div>
  ${PORTFOLIO_DATA.education
		.map(
			(ed) => `
    <div class="p-2.5 rounded-xl bg-[#11111b] border border-[#313244] space-y-1">
      <div class="flex items-center justify-between">
        <span class="text-white font-bold">${ed.institution}</span>
        <span class="text-[#89b4fa] text-[10px]">${ed.duration}</span>
      </div>
      <div class="text-[#cba6f7] text-[11px]">${ed.degree}</div>
      <div class="text-[#a6e3a1] text-[10px] font-bold">Grade: ${ed.grade}</div>
    </div>`
		)
		.join('')}
</div>`;
		return { isHtml: true, output: html };
	}

	if (cmd === 'contact') {
		return {
			isHtml: true,
			output: `
<div class="space-y-2 font-mono text-xs">
  <div class="text-[#cba6f7] font-bold">Direct Transmission Coordinates:</div>
  <div><span class="text-[#89b4fa]">Email:</span> <a href="mailto:${escapeHtml(PORTFOLIO_DATA.profile.email)}" class="text-white underline">${escapeHtml(PORTFOLIO_DATA.profile.email)}</a></div>
  <div><span class="text-[#89b4fa]">Location:</span> ${escapeHtml(PORTFOLIO_DATA.profile.location)}</div>
  <div class="pt-1 text-[#a6adc8]">Type <span class="text-[#a6e3a1]">open contact</span> to launch GUI compose transmission window.</div>
</div>`
		};
	}

	if (cmd === 'open') {
		const rawTarget = (args[0] || '').toLowerCase();
		if (!rawTarget)
			return {
				output:
					'open: missing target. Usage: open <app|terminal|projects|experience|skills|contact|blog>',
				isError: true
			};

		if (rawTarget === 'resume' || rawTarget === 'resume.pdf') {
			if (typeof window !== 'undefined') window.open(PORTFOLIO_DATA.profile.resumeUrl, '_blank');
			return { output: 'Opening resume in external viewer...' };
		}

		const target = rawTarget as WindowId;
		if (hyprland.windows[target]) {
			hyprland.openWindow(target);
			return { output: `Launched window: ${target}` };
		}
		return { output: `open: unknown application: ${rawTarget}`, isError: true };
	}

	if (cmd === 'theme') {
		const target = (args[0] || '').toLowerCase();
		if (!target)
			return {
				output: 'theme: missing parameter. Usage: theme <clean|gaming|space|macos|portal>',
				isError: true
			};

		if (target === 'clean') {
			goto('/clean');
			return { output: 'Switching dimension to Clean Modern...' };
		}
		if (target === 'gaming') {
			goto('/gaming');
			return { output: 'Switching dimension to Arcade Realm...' };
		}
		if (target === 'space') {
			goto('/space');
			return { output: 'Switching dimension to Cosmic Voyage...' };
		}
		if (target === 'macos') {
			goto('/macos');
			return { output: 'Switching dimension to macOS Desktop...' };
		}
		if (target === 'portal') {
			goto('/');
			return { output: 'Returning to Gateway Portal...' };
		}
		return {
			output: `theme: unknown theme "${target}". Options: clean, gaming, space, macos, portal`,
			isError: true
		};
	}

	if (cmd === 'fortune') {
		const random = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
		return { output: random };
	}

	if (cmd === 'cowsay') {
		const msg = escapeHtml(args.join(' ') || 'Arch Linux + Hyprland is peak developer experience!');
		const line = '-'.repeat(msg.length + 2);
		return {
			output: ` ${line}
< ${msg} >
 ${line}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
		};
	}

	if (cmd === 'sl') {
		return {
			output: `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ _____ |   | | |   ____   |
   /     |  |   H  |  |     |   | |   | | |  |    |  |
  |      |  |   H  |__--------------------|  |____|  |
  | ________|___H__/__|_____/[][]~\\_______|___________|
  |/ |   |_____ _____ _____|___/   \\__|_____ _____ _____|
 ( )---( )---( )---( )---( )---( )---( )---( )---( )`
		};
	}

	if (cmd === 'sudo') {
		return {
			output: `satyam is not in the sudoers file. This incident will be reported to root.`,
			isError: true
		};
	}

	if (cmd === 'matrix') {
		return {
			isHtml: true,
			output: `<div class="text-[#a6e3a1] animate-pulse">01001000 01100101 01101100 01110000 00100000 01010111 01101111 01110010 01101100 01100100<br/>Wake up, Neo... The Matrix has you.<br/>Follow the white rabbit.</div>`
		};
	}

	if (cmd === 'exit') {
		goto('/');
		return { output: 'Session terminated. Returning to portal...' };
	}

	return {
		output: `zsh: command not found: ${cmd}. Type "help" for a list of commands.`,
		isError: true
	};
}
