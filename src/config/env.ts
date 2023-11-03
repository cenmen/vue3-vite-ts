interface envConfig {
	AUTH_API?: string;
	[propName: string]: unknown;
}

declare global {
	interface Window {
		ENV_CONFIG: envConfig & { ENV: 'dev' | 'tst' | 'prod' };
	}
}

// 代理转发请求
let exports: envConfig = {
	AUTH_API: '/authApi',
};

try {
	// 因为 vite.config.js 引用此文件且运行处于 node 没有 window 会报错
	if (window && window.ENV_CONFIG) exports = { ...exports, ...window.ENV_CONFIG };
} catch (error) {
	// console.log('🚀 ~ error', error);
}

export const { ENV, AUTH_API } = exports;
// eslint-disable-next-line
console.log('🚀 ~ exports', exports);
