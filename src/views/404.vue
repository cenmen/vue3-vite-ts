<template>
  <div class="w-full pt-22 flex flex-col items-center">
    <img class="mt-8 w-[380px]" :src="notFound" />
    <section class="text-slate-900 font-semibold text-lg">访问页面不存在~</section>
    <a-button class="mt-4" @click="goHome">返回首页</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import notFound from '@/assets/images/404.svg';

const router = useRouter();

const goHome = () => {
  router.push({ path: '/' });
};
</script>

<style lang="scss"></style>
