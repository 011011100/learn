<script setup lang="ts">

const router = useRouter();

function jumpBerry() {
  router.push({name:'berry'})
}

</script>

<template>
  <n-button type="info" @click="jumpBerry">
    jump berry
  </n-button>
</template>

<style scoped>

</style>
