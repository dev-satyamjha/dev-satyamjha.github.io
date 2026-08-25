import { audioManager } from '$lib/stores/audio.svelte';

export interface NotificationItem {
	id: string;
	title: string;
	message: string;
	type: 'info' | 'success' | 'warning' | 'error';
	icon?: string;
	timestamp: string;
}

class NotificationManager {
	items = $state<NotificationItem[]>([]);

	notify(
		title: string,
		message: string,
		type: 'info' | 'success' | 'warning' | 'error' = 'info',
		icon?: string
	) {
		const id =
			typeof crypto !== 'undefined' && crypto.randomUUID
				? crypto.randomUUID()
				: `${Date.now()}-${Math.random().toString(36).slice(2)}`;
		const defaultIcon =
			type === 'success'
				? '\uf00c'
				: type === 'warning'
					? '\uf071'
					: type === 'error'
						? '\uf06a'
						: '\uf05a';

		const item: NotificationItem = {
			id,
			title,
			message,
			type,
			icon: icon || defaultIcon,
			timestamp: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			})
		};

		this.items = [...this.items, item];
		audioManager.play('notification');

		setTimeout(() => {
			this.dismiss(id);
		}, 4000);
	}

	dismiss(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
	}

	clear() {
		this.items = [];
	}
}

export const notifications = new NotificationManager();
