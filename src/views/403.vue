<template>
  <div class="w-full pt-22 flex flex-col items-center">
    <div class="mt-8 w-[500px] h-[300px]">
      <LottieAnimation :animationData="forbidden" />
    </div>
    <section class="text-slate-900 font-semibold text-lg">您暂无权限访问资源~</section>
    <a-button class="mt-4" @click="goHome">返回</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LottieAnimation from '@/components/LottieAnimation.vue';
import forbidden from '@/assets/lottie/forbidden.json';

const router = useRouter();

const goHome = () => {
  router.push({ path: '/' });
};
</script>
