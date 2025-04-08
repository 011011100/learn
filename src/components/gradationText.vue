<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  colors: string[]
  direction?: 'to right' | 'to left' | 'to top' | 'to bottom'
  fontSize?: string
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'to right',
  fontSize: '2rem',
  animated: true,
})

// 动态生成线性渐变字符串
const backgroundGradient = computed(() => {
  const { direction, colors } = props
  const gradient = `linear-gradient(${direction}, ${colors.join(', ')})`
  return gradient
})
</script>

<template>
  <div
      class="font-bold bg-clip-text text-transparent"
      :style="{
      fontSize: fontSize,
      backgroundImage: backgroundGradient,
      backgroundSize: '200% 200%',
      animation: animated ? 'gradientShift 5s ease infinite' : 'none',
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
