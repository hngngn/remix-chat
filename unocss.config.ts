import { defineConfig, presetUno, transformerVariantGroup } from "unocss"

export default defineConfig({
    presets: [presetUno()],
    transformers: [transformerVariantGroup()],
    shortcuts: {
        center: "flex justify-center items-center min-h-screen",
        "btn-icon": "font-600 h-[3.5rem] rounded-3 flex justify-center items-center gap-3",
    },
    preflights: [
        {
            getCSS: () => `
            html,
            body {
                font-family: "Satoshi", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
                    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
                    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                font-weight: 400;
            }
            `,
        },
    ],
})
