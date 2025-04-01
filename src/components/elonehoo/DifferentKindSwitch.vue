<script setup lang="ts">

const isChecked = ref<boolean>(true)

defineExpose({
  isChecked
})
</script>

<template>
  <div>
    <label class="different-kind-switch">
      <input type="checkbox" class="different-kind-toggle" :checked="isChecked" @click="isChecked = !isChecked"/>
      <span class="different-kind-slider" />
      <span class="card-side" />
    </label>
  </div>
</template>

<style>
.different-kind-switch {
  --input-focus: #ff7e51;
  --bg-color: #fff;
  --bg-color-alt: #737373;
  --main-color: #323232;
  --input-out-of-focus: #5f7dbe;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 70px;
  height: 36px;
  transform: translateX(calc(50% - 10px));

}

.different-kind-toggle {
  opacity: 0;
}

.different-kind-slider {
  box-sizing: border-box;
  border-radius: 100px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--input-out-of-focus);
  transition: 0.3s;
}

.different-kind-slider:before {
  content: '';
  background-image: url('@/assets/WeatherMoon24Filled.svg');
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  position: absolute;
  left: 2px;
  bottom: 1px;
  border: 2px solid var(--main-color);
  border-radius: 100px;
  background-color: var(--bg-color);
  color: var(--main-color);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 25px;
  transition: 0.3s;
}

.different-kind-toggle:checked + .different-kind-slider {
  background-color: var(--input-focus);
  transform: translateX(-32px);
}

.different-kind-toggle:checked + .different-kind-slider:before {
  background-image: url('@/assets/WeatherSunnyLow24Filled.svg');
  transform: translateX(32px);
}
</style>
