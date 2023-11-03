import { HomeOutlined } from '@ant-design/icons-vue';
import Layout from '@/layout/Layout.vue';

export default {
	path: '/',
	redirect: '/home',
	component: Layout,
	meta: { title: '首页', icon: HomeOutlined, root: true },
	children: [
		{
			name: 'home',
			path: '/home',
			component: () => import('@/views/Home.vue'),
			meta: { title: '首页', isHide: true },
		},
	],
};
