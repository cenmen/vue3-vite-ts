<template>
	<a-menu :open-keys="openKeys" :selected-keys="state.exactSelectedKeys" theme="dark" mode="inline" @click="onClickMenuItem">
		<template v-for="menuItem in state.menus" :key="menuItem.path">
			<a-menu-item v-if="!menuItem.children" :key="menuItem.path">
				<template #icon>
					<component :is="menuItem.icon" />
				</template>
				<span>{{ menuItem.title }}</span>
			</a-menu-item>
			<a-sub-menu v-else :key="menuItem.path" @click="onClickSubMenu(menuItem)">
				<template #icon>
					<component :is="menuItem.icon" />
				</template>
				<template #title>{{ menuItem.title }}</template>
				<template v-for="subMenuItem in menuItem.children" :key="subMenuItem.path">
					<a-menu-item v-if="!subMenuItem.children" :key="subMenuItem.path">
						<span>{{ subMenuItem.title }}</span>
					</a-menu-item>
					<a-sub-menu v-else :key="subMenuItem.path" @click.stop="onClickSecondSubMenu(subMenuItem)">
						<template #title>{{ subMenuItem.title }}</template>
						<a-menu-item v-for="child in subMenuItem.children" :key="child.path">
							{{ child.title }}
						</a-menu-item>
					</a-sub-menu>
				</template>
			</a-sub-menu>
		</template>
	</a-menu>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted, watch } from 'vue';
// import { HomeOutlined, UserOutlined, BarsOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useLayoutStore } from '@/stores';

const state = reactive({
	menus: [],
	exactOpenKeys: [],
	exactSelectedKeys: ['/'],
});
const router = useRouter();
const currentRoute = useRoute();
const layoutStore = useLayoutStore();
state.exactSelectedKeys = currentRoute.matched.map(val => val.path);
state.exactOpenKeys = state.exactSelectedKeys.slice(0, -1);
const openKeys = computed(() => (layoutStore.siderCollapsed ? [] : state.exactOpenKeys));

// 根据路由转换菜单（二三级）
const updateMenuOnRouter = () => {
	const routers = router.getRoutes().filter(val => val.meta.root);
	state.menus = routers.reduce((total, cur) => {
		const parent = { path: cur.path, ...cur.meta };
		if (parent.isHide) return total;
		const items = cur.children.filter(val => val.meta && !val.meta.isHide);
		const childs = items.map(item => {
			const current = { path: item.path, ...item.meta };
			if (item.children) current.children = item.children.map(val => ({ path: val.path, ...val.meta }));
			return current;
		});
		if (childs.length > 0) {
			parent.children = childs;
		}
		return [...total, parent];
	}, []);
};

const onClickMenuItem = ({ key, keyPath }) => {
	state.exactSelectedKeys = keyPath;
	router.push({ path: key });
};

const onClickSubMenu = ({ path }) => {
	state.exactOpenKeys = [path];
};

const onClickSecondSubMenu = ({ path }) => {
	state.exactOpenKeys.push(path);
};

watch(
	() => currentRoute.fullPath,
	() => {
		state.exactSelectedKeys = currentRoute.matched.map(val => val.path);
		state.exactOpenKeys = state.exactSelectedKeys.slice(0, -1);
	}
);

onMounted(() => {
	updateMenuOnRouter();
});
</script>
