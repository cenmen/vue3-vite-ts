<template>
  <div class="mt-[6px]">
    <a-breadcrumb>
      <a-breadcrumb-item
        class="cursor-pointer"
        v-for="(item, index) in items"
        :key="index"
        @click="handleTapOption(item)"
      >
        <a-space size="small">
          <span>{{ item.title }}</span>
        </a-space>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

interface Item {
  path: string;
  title: string;
  [key: string]: any;
}

const router = useRouter();
const currentRoute = useRoute();
const items = ref<Item[]>([]);

const updateBreadcrumbItems = () => {
  items.value = currentRoute.matched?.map((val) => ({
    path: val.path,
    title: val.meta.title as string
  }));
};

const handleTapOption = ({ path }: Item) => {
  router.push({ path });
};

watch(() => currentRoute.fullPath, updateBreadcrumbItems);

onMounted(() => {
  updateBreadcrumbItems();
});
</script>
