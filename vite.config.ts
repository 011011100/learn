import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        AutoImport({
            // 你可以指定要自动导入的库
            imports: [
                'vue',
                'vue-router',
                // ...其他库
            ],
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
            }
        }),
        Components({
            resolvers: [
                NaiveUiResolver(),
            ],
        }),
        vue()
    ],
})
