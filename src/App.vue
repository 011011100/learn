<script lang="ts" setup>
import DifferentKindSwitch from "@/components/elonehoo/DifferentKindSwitch.vue";
import type {GlobalTheme} from 'naive-ui';
import {darkTheme} from 'naive-ui';

const theme = ref<GlobalTheme | null>(null); // 你可以设置为 `null` 来使用默认主题

const childRef = ref<InstanceType<typeof DifferentKindSwitch> | null>(null);

onMounted(() => {
  if (childRef.value) {
    console.log('子组件初始 count:', childRef.value.isChecked);
  }
});

watch(
    () => childRef.value?.isChecked,
    (newVal) => {
      if (newVal) {
        theme.value = null;
      } else {
        theme.value = darkTheme;
      }
    }
);

</script>

<template>
  <main>
    <n-config-provider :theme="theme" style="width: max-content;min-width: 100%">
      <n-float-button :bottom="16" :right="72" shape="square" style="box-shadow: none" class="float-button" >
        <different-kind-switch ref="childRef"/>
      </n-float-button>
      <router-view/>
    </n-config-provider>
  </main>
</template>

<style scoped>
.float-button {
  --n-color: rgba(255, 255, 255, 0) !important;  /* 背景色固定 */
}
</style>
