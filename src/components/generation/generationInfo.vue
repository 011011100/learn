<script lang="ts" setup>
import {getGenerationsInfo} from "@/api/pokemon/generationApi.ts";
import PokemonCard from "@/components/pokemon/pokemonCard.tsx";
import request from "@/util/request.ts";
import {Reload} from '@vicons/ionicons5'
import versionGroupTwoDimensionalArray from "@/components/version/versionGroupTwoDimensionalArray.ts";

const props = defineProps<{
  index: number
}>()

const data = ref<any>()
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

</script>

<template>
  <n-layout has-sider>
    <!--    <n-layout-sider content-style="padding-top: 24px;" width="min-content">-->
    <!--      <n-anchor>-->
    <!--        <n-anchor-link v-for="(item , index) in versionGroup" :key="index" :title="item.name">-->
    <!--          <n-anchor-link v-for="(version , index) in item.versions" :key="index" :title="version.zhName"/>-->
    <!--        </n-anchor-link>-->
    <!--      </n-anchor>-->
    <!--    </n-layout-sider>-->
    <n-layout>
      <n-layout-content style="width: max-content;min-width: 100%">
        <n-divider title-placement="left">
          <n-gradient-text size="24" style="font-weight: bold" type="info">
            版本组
          </n-gradient-text>
        </n-divider>
        <n-space>
          <template v-for="(item ) in versionGroup">
            <n-tag v-for="(version , index) in item.versions" :key="index" type="info" size="large">
              {{ version.zhName? version.zhName : version.name }}
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
          <n-space>
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
  </n-layout>
</template>

<style scoped>

</style>
