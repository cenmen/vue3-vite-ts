import { BarsOutlined } from '@ant-design/icons-vue';
import { AUTH_KEYS } from '@/constants';
import Layout from '@/layout/Layout.vue';

export default {
	path: '/order',
	redirect: '/order/list',
	component: Layout,
	meta: { title: '订单管理', icon: BarsOutlined, root: true },
	children: [
		{
			path: '/order/list',
			component: () => import('@/views/User/Detail.vue'),
			meta: { title: '订单列表', auth: AUTH_KEYS.PAGE_ORDER_LIST },
		},
		{
			path: '/order/category',
			component: () => import('@/views/User/Detail.vue'),
			meta: { title: '订单列表（隐藏）', auth: AUTH_KEYS.PAGE_ORDER_CATEGORY, isHide: true },
		},
		{
			path: '/order/detail',
			redirect: '/order/detail/1',
			meta: { title: '订单详情' },
			children: [
				{
					path: '/order/detail/1',
					component: () => import('@/views/User/Detail.vue'),
					meta: { title: '订单详情 - 1', auth: AUTH_KEYS.PAGE_ORDER_DETAIL_1 },
				},
				{
					path: '/order/detail/2',
					component: () => import('@/views/User/Detail.vue'),
					meta: { title: '订单详情 - 2', auth: AUTH_KEYS.PAGE_ORDER_DETAIL_2, noTabbar: true },
				},
			],
		},
		{
			path: '/order/category1',
			component: () => import('@/views/User/Detail.vue'),
			meta: { title: '测试权限1', isHide: true },
		},
		{
			path: '/order/category2',
			component: () => import('@/views/User/Detail.vue'),
			meta: { title: '测试权限2', auth: '123', isHide: true },
		},
	],
};
