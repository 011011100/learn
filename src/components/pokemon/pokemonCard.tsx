import request from "@/util/request.ts";
import {NCard} from "naive-ui";
import type {PropType} from "vue";
import createErrorMsg from "@/components/message/errorMessage.ts";

const pokemonCard = defineComponent({
    name: 'pokemonCard',
    props: {
        url: {
            type: String,
            required: false
        },
        pokemonCardData: {
            type: Object as PropType<{
                zhName: string,
                zhGenus: string,
                zhFlavorTextEntries: string
            }>,
            required: false
        }
    },
    emits: ["updatePokemon"],
    setup(props, {emit}) {
        const data = ref<any>()
        const zhName = ref<string>()
        const zhGenus = ref<string>()
        const zhFlavorTextEntries = ref<string>()

        onMounted(async () => {
            if (props.url) {
                await request.get(props.url).then((res: any) => {
                    data.value = res.data
                })
                data.value.names.forEach((name: any) => {
                    if (name.language.name === "zh-Hans") {
                        zhName.value = name.name
                    }
                })
                data.value.genera.forEach((genus: any) => {
                    if (genus.language.name === "zh-Hans") {
                        zhGenus.value = genus.genus
                    }
                })
                data.value.flavor_text_entries.forEach((flavorTextEntries: any) => {
                    if (flavorTextEntries.language.name === "zh-Hans") {
                        zhFlavorTextEntries.value = flavorTextEntries.flavor_text.replace(/\n/g, "<br/>")
                    }
                })
            }else if (props.pokemonCardData) {
                zhName.value = props.pokemonCardData.zhName
                zhGenus.value = props.pokemonCardData.zhGenus
                zhFlavorTextEntries.value = props.pokemonCardData.zhFlavorTextEntries
            }else {
                createErrorMsg("pokemonCard 未传入数据")
            }

            await nextTick();
            emit("updatePokemon", {zhName: zhName.value});
        })

        return {
            data,
            zhName,
            zhGenus,
            zhFlavorTextEntries
        }
    },
    render() {
        return <NCard title={this.zhName} size="small" hoverable embedded bordered={false}>
            <b>{this.zhGenus}</b>
            <div v-html={this.zhFlavorTextEntries}></div>
        </NCard>

    }
})

export default pokemonCard
