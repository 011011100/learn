import request from "@/util/request.ts";
import type {PropType} from "vue";

export type version = {
    name: string,
    url: string
}

const versionInfo = defineComponent({
    name: 'versionInfo',
    props: {
        version: {
            type: Object as PropType<version>,
            required: true,
        }
    },

    setup(props, {expose}) {
        const versionZHName = ref<string>("加载中。。。")

        onMounted(async () => {
            const res = await getVersionInfo(props.version.url);
            if (res && res.names) {
                for (const name of res.names) {
                    if (name.language.name === "zh-Hans") {
                        versionZHName.value = name.name;
                        console.log(versionZHName.value)
                        break;
                    }
                }
            }
        });

        const getVersionInfo = async (url: string) => {
            try {
                const res = await request.get(url);
                return res.data;
            } catch (error) {
                console.error("获取版本信息失败", error);
                return null;
            }
        };

        expose({
            getVersionInfo,
            versionZHName
        });

        return {
            getVersionInfo,
            versionZHName
        };
    },
    render() {
        return <div>{this.versionZHName}</div>;
    }
})

export default versionInfo
