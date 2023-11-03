import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		authInfo: {},
		userInfo: {},
		token: '',
	}),
	persist: {
		paths: ['authInfo', 'userInfo', 'token'],
	},
});
