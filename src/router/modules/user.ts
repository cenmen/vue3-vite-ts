import { UserOutlined } from '@ant-design/icons-vue';
import { AUTH_KEYS } from '@/constants';
import Layout from '@/layout/Layout.vue';

export default {
	path: '/user',
	redirect: '/user/list',
	component: Layout,
	meta: { title: '用户管理', icon: UserOutlined, root: true },
	children: [
		{
			path: '/user/list',
			component: () => import('@/views/User/List.vue'),
			meta: { title: '用户列表', auth: AUTH_KEYS.PAGE_USER_LIST },
		},
		{
			path: '/user/detail',
			component: () => import('@/views/User/Detail.vue'),
			meta: { title: '用户详情', auth: AUTH_KEYS.PAGE_USER_DETAIL },
		},
	],
};
