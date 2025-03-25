import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        UnoCss(),
        AutoImport({
            // 你可以指定要自动导入的库
            imports: [
                'vue',
                'vue-router',
                'pinia',
                // ...其他库
            ],
        }),
        Components({
            resolvers: [
                NaiveUiResolver(),
            ],
        }),
        vue()
    ],
})
