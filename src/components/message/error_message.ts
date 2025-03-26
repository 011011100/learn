import type {ConfigProviderProps} from 'naive-ui'
import {createDiscreteApi, lightTheme} from 'naive-ui'
import {computed} from 'vue'

const {message} = createDiscreteApi(
    ['message'],
    {
        configProviderProps: computed<ConfigProviderProps>(() => ({
            theme: lightTheme
        }))
    }
)

export default function createErrorMsg(errorMsg: string) {
    message.error(errorMsg)
}
