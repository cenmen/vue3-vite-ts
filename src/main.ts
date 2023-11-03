import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import './styles/tailwind.css';
import 'ant-design-vue/dist/reset.css';
import './styles/antd.css';
import { getAuthInfo } from './api';
import App from './App.vue';
import { selfRouters, router } from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
const app = createApp(App);
app.use(pinia);
app.use(Antd);
app.use(router);

let isInitRouter = false;
router.beforeEach(async (to) => {
  if (!isInitRouter) {
    const authInfo = await getAuthInfo();

    const getAuthItem = (routeItem: RouteRecordRaw) => {
      routeItem.children = routeItem.children?.filter((item: RouteRecordRaw) => {
        if (!item.meta?.auth) return true;
        if (item.meta?.auth && authInfo.includes(item.meta.auth)) return true;
        if (item.children && item.children.length > 0) item = getAuthItem(item);
        return false;
      });
      return routeItem;
    };

    selfRouters.forEach((cur) => {
      const authItem = getAuthItem(cur);
      console.log('🚀 ~ authItem', authItem);
      router.addRoute(authItem);
    });
    isInitRouter = true;
    // 等待动态路由加载完成再挂载
    app.mount('#app');
    // 触发重定向
    return to.fullPath;
  }
});
