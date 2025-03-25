<script lang="ts" setup>

const router = useRouter();

function jump98new() {
  console.log('98new');
  router.push({name: '98new', query: {title: '98新', content: '98新!!'}});
}

</script>

<template>
  <h1>99新</h1>
  <n-button type="info" @click="jump98new">
    -> 98新
  </n-button>
</template>

<style scoped>

</style>
