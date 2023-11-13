<template>
  <a-layout :style="{ minHeight: '100vh' }">
    <a-layout-sider
      class="shadow-[2px_0_6px_rgba(0,21,41,0.35)]"
      :collapsed="siderCollapsed"
      :trigger="null"
      collapsible
    >
      <div class="flex justify-center items-center p-2.5">
        <img class="w-6" :src="logo" />
        <span v-show="!siderCollapsed" class="text-gray-300 text-base font-medium truncate ml-2"
          >模板管理系统</span
        >
      </div>
      <Sider />
    </a-layout-sider>
    <a-layout>
      <Header />
      <Tabbar />
      <a-layout-content class="overflow-hidden">
        <Error v-if="state.isError" />
        <router-view v-else v-slot="{ Component, route }">
          <transition
            enter-active-class="transition-all duration-1000"
            enter-from-class="opacity-0 -translate-x-16"
          >
            <keep-alive :include="keepAliveIncludeItems">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, onErrorCaptured, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/stores';
import logo from '@/assets/images/logo.svg';
import Header from './Header.vue';
import Sider from './Sider.vue';
import Tabbar from './Tabbar.vue';
import Error from './Error.vue';

const state = reactive({
  isError: false
});
const router = useRouter();
const layoutStore = useLayoutStore();
const keepAliveIncludeItems = computed(() => layoutStore.tabbarItems.map((val) => val.path));
const { siderCollapsed } = storeToRefs(layoutStore);

onMounted(() => {
  window.addEventListener('resize', () => {
    const screenWidth = document.body.clientWidth;
    if (layoutStore.siderCollapsed === false && screenWidth < 1300)
      layoutStore.$patch({ siderCollapsed: true });
  });
});

router.beforeResolve(() => {
  state.isError = false;
});

onErrorCaptured((err) => {
  state.isError = true;
  console.error('--> onErrorCaptured.err', err);
  return false;
});
</script>
