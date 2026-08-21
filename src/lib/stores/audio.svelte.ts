export type SoundType =
	| 'click'
	| 'hover'
	| 'warp'
	| 'keystroke'
	| 'coin'
	| 'powerup'
	| 'error'
	| 'notification'
	| 'toggle'
	| 'window_open'
	| 'window_close'
	| 'tile_swap'
	| 'glass_chime';

class AudioManager {
	isMuted = $state(true);
	private audioContext: AudioContext | null = null;

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portfolio_muted');
			if (saved !== null) {
				this.isMuted = saved === 'true';
			}
		}
	}

	private getContext(): AudioContext | null {
		if (typeof window === 'undefined') return null;
		if (!this.audioContext) {
			const AudioContextClass =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
			if (AudioContextClass) {
				this.audioContext = new AudioContextClass();
			}
		}
		if (this.audioContext && this.audioContext.state === 'suspended') {
			this.audioContext.resume();
		}
		return this.audioContext;
	}

	toggleMute() {
		this.isMuted = !this.isMuted;
		if (typeof window !== 'undefined') {
			localStorage.setItem('portfolio_muted', String(this.isMuted));
		}
		if (!this.isMuted) {
			this.play('toggle');
		}
	}

	setMuted(muted: boolean) {
		this.isMuted = muted;
		if (typeof window !== 'undefined') {
			localStorage.setItem('portfolio_muted', String(muted));
		}
	}

	play(type: SoundType) {
		if (this.isMuted) return;
		try {
			const ctx = this.getContext();
			if (!ctx) return;

			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.connect(gain);
			gain.connect(ctx.destination);

			switch (type) {
				case 'click':
					osc.type = 'sine';
					osc.frequency.setValueAtTime(800, now);
					osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
					gain.gain.setValueAtTime(0.12, now);
					gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
					osc.start(now);
					osc.stop(now + 0.05);
					break;

				case 'hover':
					osc.type = 'sine';
					osc.frequency.setValueAtTime(520, now);
					gain.gain.setValueAtTime(0.04, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
					osc.start(now);
					osc.stop(now + 0.03);
					break;

				case 'toggle':
					osc.type = 'triangle';
					osc.frequency.setValueAtTime(440, now);
					osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
					gain.gain.setValueAtTime(0.1, now);
					gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
					osc.start(now);
					osc.stop(now + 0.08);
					break;

				case 'keystroke':
					osc.type = 'triangle';
					osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
					gain.gain.setValueAtTime(0.06, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
					osc.start(now);
					osc.stop(now + 0.025);
					break;

				case 'coin':
					osc.type = 'square';
					osc.frequency.setValueAtTime(987.77, now);
					osc.frequency.setValueAtTime(1318.51, now + 0.08);
					gain.gain.setValueAtTime(0.12, now);
					gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
					osc.start(now);
					osc.stop(now + 0.3);
					break;

				case 'powerup':
					osc.type = 'sawtooth';
					osc.frequency.setValueAtTime(330, now);
					osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
					gain.gain.setValueAtTime(0.1, now);
					gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
					osc.start(now);
					osc.stop(now + 0.25);
					break;

				case 'warp':
					osc.type = 'sine';
					osc.frequency.setValueAtTime(150, now);
					osc.frequency.exponentialRampToValueAtTime(900, now + 0.4);
					gain.gain.setValueAtTime(0.15, now);
					gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
					osc.start(now);
					osc.stop(now + 0.4);
					break;

				case 'notification':
					osc.type = 'sine';
					osc.frequency.setValueAtTime(587.33, now);
					osc.frequency.setValueAtTime(880, now + 0.1);
					gain.gain.setValueAtTime(0.1, now);
					gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
					osc.start(now);
					osc.stop(now + 0.25);
					break;

				case 'error':
					osc.type = 'sawtooth';
					osc.frequency.setValueAtTime(220, now);
					osc.frequency.setValueAtTime(180, now + 0.08);
					gain.gain.setValueAtTime(0.12, now);
					gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
					osc.start(now);
					osc.stop(now + 0.2);
					break;

				case 'window_open':
					osc.type = 'sine';
					osc.frequency.setValueAtTime(300, now);
					osc.frequency.exponentialRampToValueAtTime(700, now + 0.12);
					gain.gain.setValueAtTime(0.08, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
					osc.start(now);
					osc.stop(now + 0.12);
					break;

				case 'window_close':
					osc.type = 'sine';
					osc.frequency.setValueAtTime(700, now);
					osc.frequency.exponentialRampToValueAtTime(250, now + 0.1);
					gain.gain.setValueAtTime(0.08, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
					osc.start(now);
					osc.stop(now + 0.1);
					break;

				case 'tile_swap':
					osc.type = 'triangle';
					osc.frequency.setValueAtTime(480, now);
					osc.frequency.exponentialRampToValueAtTime(620, now + 0.06);
					gain.gain.setValueAtTime(0.09, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
					osc.start(now);
					osc.stop(now + 0.06);
					break;

				case 'glass_chime':
					osc.type = 'sine';
					osc.frequency.setValueAtTime(1046.5, now);
					osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.15);
					gain.gain.setValueAtTime(0.07, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
					osc.start(now);
					osc.stop(now + 0.35);
					break;
			}
		} catch {
			return;
		}
	}
}

export const audioManager = new AudioManager();
