<template>
  <div class="card-container w-full pt-22 flex flex-col items-center">
    <img class="mt-8 w-[380px]" :src="error" />
    <section class="text-slate-900 font-semibold text-lg">页面遇到意外错误！</section>
    <a-button class="mt-4" @click="goHome">返回首页</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import error from '@/assets/images/error.svg';

const router = useRouter();

const goHome = () => {
  router.push({ path: '/' });
};
</script>

<style lang="scss"></style>
