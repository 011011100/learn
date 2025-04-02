// import request from "@/util/request.ts";
// import type {PropType} from "vue";
//
// const versionGroupTwoDimensionalArray = defineComponent({
//     name: "versionGroupTwoDimensionalArray",
//     props: {
//         versionGroupUrlList: {
//             type: Array as PropType<string[]>,
//             required: true
//         },
//     },
//     setup(props) {
//         type versionGroup = {
//             name: string
//             url: string
//             versions: Array<{ name: string, zhName?: string }>
//         }
//
//         const columns = ref<Array<versionGroup>>([])
//
//         onMounted(async () => {
//             await Promise.all(
//                 props.versionGroupUrlList.map(async (url: string) => {
//
//                     const res = await request.get(url)
//                     const data = {
//                         name: res.data.name,
//                         url,
//                         versions: Array<{ name: string, zhName?: string }>()
//                     }
//
//                     await Promise.all(
//                         res.data.versions.map(async (version: any) => {
//                             const res = await request.get(version.url);
//                             data.versions.push({
//                                 name: res.data.name as string,
//                                 zhName: res.data.names.find((name: any) => name.language.name === "zh-Hans")?.name as string
//                             })
//                         })
//                     );
//
//                     columns.value.push(data)
//                 })
//             )
//         })
//
//         return {
//             columns
//         }
//     }
// })
//
// export default versionGroupTwoDimensionalArray
