import { defineConfig, presetUno } from 'unocss'
import { gradientKeyframes } from './src/unocss/keyframes'

export default defineConfig({
    presets: [presetUno()],
    preflights: [
        {
            getCSS: () => gradientKeyframes,
        },
    ],
})
