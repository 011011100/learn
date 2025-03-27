import {createDiscreteApi} from 'naive-ui'

const {message} = createDiscreteApi(
    ['message']
)

export default function createErrorMsg(errorMsg: string) {
    message.error(errorMsg)
}
