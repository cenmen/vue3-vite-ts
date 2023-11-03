<template>
  <div class="w-full pt-22 flex flex-col items-center">
    <div class="mt-8 w-[800px] h-[500px]">
      <LottieAnimation :animationData="notFound" />
    </div>
    <section class="mt-[-140px] text-slate-900 font-semibold text-lg">访问页面不存在~</section>
    <a-button class="mt-4" @click="goHome">返回</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LottieAnimation from '@/components/LottieAnimation.vue';
import notFound from '@/assets/lottie/notFound.json';

const router = useRouter();

const goHome = () => {
  router.push({ path: '/' });
};
</script>

<style lang="scss"></style>
