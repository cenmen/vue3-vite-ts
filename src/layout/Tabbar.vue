<template>
  <a-row
    class="bg-white p-1 border-t border-slate-100 overflow-x-auto scroll-x-bar"
    align="middle"
    :wrap="false"
  >
    <a-popover
      v-for="(item, index) in tabbarItems"
      :key="item.path"
      :overlay-style="{ margin: 0 }"
      :open="item.visible"
      trigger=""
      overlay-class-name="w-24"
      @contextmenu.prevent="onRightClickTagItem(index)"
    >
      <template #content>
        <div v-on-click-outside="onClickTagItemOutside">
          <a-button block type="text" @click="onCloseTagItemOnOther(index)">关闭其他</a-button>
          <a-button block type="text" @click="onCloseTagItemOnRight(index)">关闭右侧</a-button>
        </div>
      </template>
      <a-tag
        class="cursor-default items-center"
        :style="{ display: 'flex' }"
        :color="item.active ? 'processing' : 'default'"
        closable
        @click="onClickTagItem(item)"
        @close="onCloseTagItem(item)"
      >
        {{ item.title }}
      </a-tag>
    </a-popover>
  </a-row>
</template>

<script setup lang="ts">
import { nextTick, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { vOnClickOutside } from '@vueuse/components'
import { useLayoutStore } from '@/stores';

const router = useRouter();
const currentRoute = useRoute();
const layoutStore = useLayoutStore();
const { tabbarItems } = storeToRefs(layoutStore);

const onClickTagItem = ({ path }) => {
  router.push({ path });
};

// 右键打开
const onRightClickTagItem = (index) => {
  let tabs = cloneDeep(layoutStore.tabbarItems);
  tabs[index].visible = true;
  nextTick(() => layoutStore.$patch({ tabbarItems: tabs }));
};

// 关闭其他 tag
const onCloseTagItemOnOther = (index) => {
  let tabs = cloneDeep(layoutStore.tabbarItems);
  const activeItemIndex = tabs[index];
  activeItemIndex.active = true;
  delete activeItemIndex.visible;
  router.push({ path: activeItemIndex.path });
  tabs = [activeItemIndex];
  nextTick(() => layoutStore.$patch({ tabbarItems: tabs }));
};

// 关闭右侧 tag
const onCloseTagItemOnRight = (index) => {
  let tabs = cloneDeep(layoutStore.tabbarItems);
  const activeItemIndex = tabs.findIndex((val) => val.active);
  tabs.splice(index + 1);
  tabs.forEach((val) => delete val.visible);
  // 若关闭右侧包含当前高亮则跳转到第一个 tab
  if (activeItemIndex > index) {
    tabs[0].active = true;
    const shouldPath = tabs[0].path;
    router.push({ path: shouldPath });
  }
  nextTick(() => layoutStore.$patch({ tabbarItems: tabs }));
};

// 关闭目标 tag
const onCloseTagItem = (item) => {
  const tabs = cloneDeep(layoutStore.tabbarItems);
  // 最后一个禁止关闭
  if (tabs.length === 1) return;
  if (item.active) tabs.forEach((tab) => delete tab.active);
  const filters = tabs.filter((val) => val.path !== item.path);
  // 若关闭当前高亮则跳转到第一个 tab
  if (item.active) {
    filters[0].active = true;
    const shouldPath = filters[0].path;
    router.push({ path: shouldPath });
  }
  nextTick(() => layoutStore.$patch({ tabbarItems: filters }));
};

const onClickTagItemOutside = () => {
  let tabs = cloneDeep(layoutStore.tabbarItems);
  tabs.forEach((val) => delete val.visible);
  nextTick(() => layoutStore.$patch({ tabbarItems: tabs }));
};

// 路由变化更新 tabbar
const updateTabbarItems = () => {
  const { meta, fullPath } = currentRoute;
  if (meta.noTabbar) return;
  const tabs = cloneDeep(layoutStore.tabbarItems);
  tabs.forEach((tab) => delete tab.active);
  let currentItem = tabs.find((val) => val.path === fullPath);
  if (!currentItem) {
    currentItem = { path: fullPath, title: meta.title };
    tabs.push(currentItem);
  }
  currentItem.active = true;
  layoutStore.$patch({ tabbarItems: tabs });
};

watch(() => currentRoute.fullPath, updateTabbarItems, { immediate: true });

// updateTabbarItems();
</script>
