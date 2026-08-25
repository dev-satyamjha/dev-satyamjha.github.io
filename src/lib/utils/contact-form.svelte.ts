import { SITE_CONFIG } from '$lib/data/site-config';
import { audioManager } from '$lib/stores/audio.svelte';

export class ContactFormManager {
	name = $state('');
	email = $state('');
	subject = $state('');
	message = $state('');
	botcheck = $state('');

	isSending = $state(false);
	isSent = $state(false);
	errorText = $state('');
	cooldown = $state(0);

	private cooldownTimer: ReturnType<typeof setInterval> | null = null;
	private defaultSubject: string;

	constructor(defaultSubject = 'Portfolio Contact Inquiry') {
		this.defaultSubject = defaultSubject;
	}

	async submit(event: SubmitEvent) {
		event.preventDefault();
		if (this.botcheck) return;

		if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
			this.errorText = 'Please complete all required fields.';
			audioManager.play('error');
			return;
		}

		this.isSending = true;
		this.errorText = '';
		audioManager.play('click');

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					access_key: SITE_CONFIG.web3FormsAccessKey,
					name: this.name,
					email: this.email,
					subject: this.subject || this.defaultSubject,
					message: this.message,
					from_name: this.defaultSubject
				})
			});

			const data = await response.json();

			if (response.ok || data.success) {
				this.isSent = true;
				audioManager.play('notification');
				this.name = '';
				this.email = '';
				this.subject = '';
				this.message = '';
				this.cooldown = 30;

				this.cooldownTimer = setInterval(() => {
					this.cooldown -= 1;
					if (this.cooldown <= 0) {
						this.clearCooldown();
						this.isSent = false;
					}
				}, 1000);
			} else {
				this.errorText = data.message || 'Transmission failed. Please try again.';
				audioManager.play('error');
			}
		} catch {
			this.errorText = 'Transmission failed. Please try again.';
			audioManager.play('error');
		} finally {
			this.isSending = false;
		}
	}

	private clearCooldown() {
		if (this.cooldownTimer !== null) {
			clearInterval(this.cooldownTimer);
			this.cooldownTimer = null;
		}
	}

	destroy() {
		this.clearCooldown();
	}
}
