<script lang="ts" setup>

const route = useRoute();

class nCardValue {
  public static get title() {
    return route.query.title;
  }
}


const title = nCardValue.title;
const content = computed(() => route.query.content);

const show97new = ref(false);

let msg = ref<string>('这是数据！')

onMounted(() => {
  msg = ref('这是数据！')
  const s = "abc"
  console.log(typeof s)
  console.log((s as unknown)  as number)
  console.log(typeof ((s as unknown) as number))
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

