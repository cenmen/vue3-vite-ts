import { createRouter, createWebHistory } from 'vue-router';
import { HomeOutlined } from '@ant-design/icons-vue';
import Layout from '@/layout/Layout.vue';
import NotFound from '@/views/404.vue';
import Forbidden from '@/views/403.vue';
import Home from '@/views/Home.vue';
import userRouter from './modules/user';
import orderRouter from './modules/order';

/**
 * @description 路由配置项 meta 参数
 * @param {Boolean} isHide 是否在左侧菜单栏隐藏
 * @param {String} icon 左侧菜单栏首级图标名称（在 Sider.vue 引入同名组件）
 * @param {String} title 左侧菜单栏和 tabbar 名称
 * @param {Boolean} noTabbar 不添加到 tabbar
 * @param {Boolean} root 是否模块根
 */

declare module 'vue-router' {
  interface RouteMeta {
    isHide?: boolean;
    icon?: any;
    title?: string;
    noTabbar?: boolean;
    root?: boolean;
    auth?: string;
  }
}

export const selfRouters = [userRouter, orderRouter];

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页', icon: HomeOutlined, root: true },
    children: [
      {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { title: '首页', isHide: true }
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    component: Forbidden,
    meta: { isHide: true, root: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
    meta: { isHide: true, root: true }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});
