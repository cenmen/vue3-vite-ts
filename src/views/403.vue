<template>
  <div class="w-full pt-22 flex flex-col items-center">
    <img class="mt-8 w-[380px]" :src="forbidden" />
    <section class="text-slate-900 font-semibold text-lg">您暂无访问该资源的权限。</section>
    <a-button class="mt-4" @click="goHome">返回首页</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import forbidden from '@/assets/images/403.svg';

const router = useRouter();

const goHome = () => {
  router.push({ path: '/' });
};
</script>

<style lang="scss"></style>
