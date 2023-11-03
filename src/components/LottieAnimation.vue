<template>
  <div ref="animationContainerRef" class="lottie-container"></div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, toRefs } from 'vue';
import lottie from 'lottie-web';

interface Props {
  animationData: Object;
  options?: Object;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({})
});

const { animationData, options } = toRefs(props);

const animationContainerRef = ref(null);
let lottieInstance = null;

watch([animationData, animationContainerRef], ([newAnimationData]) => {
  if (!animationContainerRef.value) return;
  if (lottieInstance) {
    lottieInstance.destroy();
  }
  nextTick(() => {
    lottieInstance = lottie.loadAnimation({
      container: animationContainerRef.value,
      renderer: 'svg',
      loop: options.value?.loop || true,
      autoplay: options.value?.autoplay || true,
      animationData: newAnimationData,
      ...options.value
    });
  });
});
</script>

<style scoped>
.lottie-container {
  width: 100%;
  height: 100%;
}
</style>
