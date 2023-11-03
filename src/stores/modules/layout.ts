import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
	id: 'layout',
	state: () => ({
		siderCollapsed: false,
		tabbarItems: [],
	}),
	persist: {
		paths: ['siderCollapsed', 'tabbarItems'],
	},
});
