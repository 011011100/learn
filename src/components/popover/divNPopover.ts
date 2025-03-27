import {NPopover} from "naive-ui";

const divNPopover = defineComponent({
    name: 'divNPopover',
    props: {
        content: String,
        promptContent: String
    },
    render() {
        return h(
            NPopover,
            {trigger: 'hover'},
            {
                trigger: () => h('div', this.$props.content), // 具名插槽 trigger
                default: () => this.$props.promptContent // 默认插槽
            }
        )
    }
})

export default divNPopover
