<template>
  <div class="card-container p-4 flex flex-col items-center">
    <div class="mt-8 w-[500px] h-[300px]">
      <LottieAnimation :animationData="error" />
    </div>
    <span class="text-lg font-bold mt-1.5">页面遇到错误~</span>
    <a-button class="mt-4" @click="goHome">返回首页</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LottieAnimation from '@/components/LottieAnimation.vue';
import error from '@/assets/lottie/error.json';

const router = useRouter();

const goHome = () => {
  router.push({ path: '/' });
};
</script>
