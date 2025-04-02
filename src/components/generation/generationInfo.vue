<script lang="ts" setup>
import {getGenerationsInfo} from "@/api/pokemon/generationApi.ts";
import PokemonCard from "@/components/pokemon/pokemonCard.tsx";
import request from "@/util/request.ts";
import {Reload} from '@vicons/ionicons5'

const props = defineProps<{
  index: number
}>()

const data = ref<any>()
const pokemonSpecies = ref<Array<any>>([])
const pokemonSpeciesCard = ref<Array<any>>([])

const showPokemonCardLoading = ref(true)

onMounted(async () => {
  await getGenerationsInfo(props.index).then((res: any) => {
    data.value = res.data
  })

  await Promise.all(
      data.value.pokemon_species.map(async (pokemon: any) => {
        const res = await request.get(pokemon.url);
        pokemonSpecies.value.push(res.data);
      })
  );

  createPokemonCardData()
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
  <!--    {{ data?.main_region }}-->
  <!--    {{ data?.pokemon_species }}-->
  <n-divider title-placement="left">
    宝可梦组
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

</template>

<style scoped>

</style>
