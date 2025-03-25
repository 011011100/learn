<script setup lang="ts">

const props = defineProps({
  msg: String
});
</script>

<template>
  <h1>97新</h1>
  <n-tag type="success">
    {{ props.msg }}
  </n-tag>
</template>

<style scoped>

</style>
