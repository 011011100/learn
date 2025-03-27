<script lang="ts" setup>

const theme = ref(null); // 你可以设置为 `null` 来使用默认主题
</script>

<template>
  <main>
    <n-config-provider :theme="theme">
      <router-view/>
    </n-config-provider>
  </main>
</template>

<style scoped>

</style>
