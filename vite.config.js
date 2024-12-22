import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: 'src/index.html',
        },
    },
    base: '/idf-job-application/',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    plugins: [
        ViteEjsPlugin(),
        viteStaticCopy({
            targets: [
                { src: 'assets/img/me/*.*', dest: '../dist/assets/img/me/' },
                { src: 'assets/img/other/*.*', dest: '../dist/assets/img/other/' },
                { src: 'assets/plugins/particles/*.*', dest: '../dist/assets/plugins/particles/' }
            ]
        })
    ]
});
