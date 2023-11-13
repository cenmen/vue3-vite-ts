<template>
  <a-layout-header
    class="flex items-center justify-between"
    :style="{ height: '48px', padding: '0 16px', background: 'white' }"
  >
    <a-space size="middle">
      <MenuUnfoldOutlined @click="onChangeCollapsed" />
      <Breadcrumb />
    </a-space>
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
        <a-avatar
          class="w-8 h-8 duration-500 ease-in-out overflow-hidden grayscale-[30%] hover:scale-110 hover:grayscale-0"
          src="https://img01.yzcdn.cn/vant/logo.png"
        />
      </a-popover>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { useLayoutStore } from '@/stores';
import Breadcrumb from './Breadcrumb.vue';

const layoutStore = useLayoutStore();

const onChangeCollapsed = () => {
  layoutStore.$patch({ siderCollapsed: !layoutStore.siderCollapsed });
};
</script>
