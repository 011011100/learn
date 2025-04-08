<script lang="ts" setup>
import {getGenerationsInfo} from "@/api/pokemon/generationApi.ts";
import PokemonCard from "@/components/pokemon/pokemonCard.tsx";
import request from "@/util/request.ts";
import {Reload} from '@vicons/ionicons5'
import versionGroupTwoDimensionalArray from "@/components/version/versionGroupTwoDimensionalArray.ts";
import gradationText from "@/components/gradationText.vue";

const props = defineProps<{
  index: number
}>()

const data = ref<any>()

const generationZhName = ref<string>()

const pokemonSpecies = ref<Array<any>>([])
const pokemonSpeciesCard = ref<Array<any>>([])


const versionGroup = ref<Array<any>>([])

const showPokemonCardLoading = ref(true)

onMounted(async () => {
  const versionGroupUrl: string[] = []
  await getGenerationsInfo(props.index).then((res: any) => {
    data.value = res.data
    data.value.version_groups.forEach((version_group: any) => {
      versionGroupUrl.push(version_group.url)
    })
    generationZhName.value = res.data.names.find((name: any) => name.language.name === "zh-Hans")?.name
  })

  await Promise.all(
      data.value.pokemon_species.map(async (pokemon: any) => {
        const res = await request.get(pokemon.url);
        pokemonSpecies.value.push(res.data);
      })
  );

  createPokemonCardData()
  await versionGroupTwoDimensionalArray(versionGroupUrl).then((res: any) => {
    versionGroup.value = res
  })

  await nextTick();
  showPokemonCardLoading.value = false
})

function createPokemonCardData() {
  for (const pokemon of pokemonSpecies.value) {
    const cardData = {
      id: pokemon.id as number,
      order: pokemon.order as number,
      zhName: "",
      zhGenus: "",
      zhFlavorTextEntries: ""
    }
    pokemon.names.forEach((name: any) => {
      if (name.language.name === "zh-Hans") {
        cardData.zhName = name.name
      }
    })
    pokemon.genera.forEach((genus: any) => {
      if (genus.language.name === "zh-Hans") {
        cardData.zhGenus = genus.genus
      }
    })
    pokemon.flavor_text_entries.some((flavorTextEntries: any) => {
      if (flavorTextEntries.language.name === "zh-Hans") {
        cardData.zhFlavorTextEntries = flavorTextEntries.flavor_text.replace(/\n/g, "<br/>")
        return true
      }
    })
    pokemonSpeciesCard.value.push(cardData)
  }

  pokemonSpeciesCard.value = pokemonSpeciesCard.value.sort((a, b) => a.order - b.order);
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random();
  return `rgba(${r},${g},${b},${a})`;
}

</script>

<template>
  <n-layout style="min-width: 60vw;width: max-content;max-width: 80vw">
    <n-layout-content>
      <gradation-text :colors="[randomColor(), randomColor(), randomColor()]" font-size="4rem">
        {{ generationZhName }}
      </gradation-text>
      <n-divider title-placement="left">
        <n-gradient-text size="24" style="font-weight: bold" type="info">
          版本组
        </n-gradient-text>
      </n-divider>
      <n-space>
        <template v-for="(item) in versionGroup">
          <n-tag v-for="(version , index) in item.versions" :key="index" size="large" type="info">
            {{ version.zhName ? version.zhName : version.name }}
          </n-tag>
        </template>
      </n-space>
      <n-divider title-placement="left">
        <n-gradient-text size="24" style="font-weight: bold" type="info">
          宝可梦组
        </n-gradient-text>
      </n-divider>
      <n-spin :show="showPokemonCardLoading">
        <template #icon>
          <n-icon>
            <Reload/>
          </n-icon>
        </template>
        <n-space style="min-height: 55px" justify="center">
          <n-space v-for="(space) in [0,1,2,3]" vertical>
            <template v-for="(pokemon, index) in pokemonSpeciesCard" :key="index">
              <pokemon-card
                  v-if="(pokemonSpeciesCard.length/4)*space <= index && index < (pokemonSpeciesCard.length/4)*(space+1)"
                  :pokemon-card-data="pokemon"/>
            </template>
          </n-space>
        </n-space>
      </n-spin>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>

</style>
