<template>
	<a-layout-header class="flex items-center justify-between" :style="{ height: '48px', padding: '0 16px', background: 'white' }">
		<div>
			<MenuUnfoldOutlined @click="onChangeCollapsed" />
		</div>
		<div>
			<a-popover placement="bottomRight">
				<template #content>
					<div>
						<a-row class="cursor-default" align="middle">
							<LogoutOutlined />
							<span class="ml-1">退出登录</span>
						</a-row>
					</div>
				</template>
				<a-avatar src="https://joeschmoe.io/api/v1/random" @mouseenter="onEnterAvatar" />
			</a-popover>
		</div>
	</a-layout-header>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { useLayoutStore } from '@/stores';

const layoutStore = useLayoutStore();

const onChangeCollapsed = () => {
	layoutStore.$patch({ siderCollapsed: !layoutStore.siderCollapsed });
};

const onEnterAvatar = () => {};
</script>
