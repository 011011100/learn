<script lang="ts" setup>

const route = useRoute();

const title = computed(() => route.query.title);
const content = computed(() => route.query.content);

const show97new = ref(false);

let msg = ref<string>('这是数据！')

onMounted(() => {
  msg = ref('这是数据！')
})

</script>

<template>
  <h1>98新</h1>
  <n-space>
    <n-card :title=title>
      {{ content }}
    </n-card>
  </n-space>
  <n-button type="info" @click="() => {show97new = !show97new}">
    -> 97新
  </n-button>
  <nine_seven_new v-if="show97new" :msg="msg"/>
</template>

<style scoped>

</style>

