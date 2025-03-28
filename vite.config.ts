import vue from '@vitejs/plugin-vue'
import path from "path"
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
    plugins: [
        UnoCss(),
        vueJsx(),
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
    resolve: {
        alias: {
            // 别名配置
            '@': path.resolve(__dirname, 'src')
        }
    },
})
