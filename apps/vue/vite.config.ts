import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        target: "ESNext",
        cssCodeSplit: true,
        minify: "esbuild",
        cssMinify: "esbuild",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
            },
            output: {
                format: "esm",
                entryFileNames: "js/[name]-[hash].js",
                chunkFileNames: "js/[name]-[hash].js",
                assetFileNames(assetInfo) {
                    const assetName = assetInfo.name!;
                    const extType = assetName.split(".").at(-1);

                    if (/\.(png|jpe?g|gif|svg|webp|webm)$/.test(assetName)) {
                        return `img/[name].${extType}`;
                    } else if (/\.(css)$/.test(assetName)) {
                        return `css/[name]-[hash].${extType}`;
                    }

                    return `[name]-[hash].${extType}`;
                },
            },
        },
    },
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "src"),
            },
        ],
    },
});
