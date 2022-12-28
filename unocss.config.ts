import { defineConfig, presetUno, transformerVariantGroup } from "unocss"
import { presetHeadlessUi } from "unocss-preset-primitives"
import { presetScrollbar } from "unocss-preset-scrollbar"

export default defineConfig({
    presets: [presetUno(), presetHeadlessUi(), presetScrollbar()],
    transformers: [transformerVariantGroup()],
    shortcuts: {
        center: "flex justify-center items-center min-h-screen",
        "btn-icon": "font-600 h-[3.5rem] rounded-3 flex justify-center items-center gap-3",
        "menu-item":
            "flex w-full items-center gap-2 rounded-lg p-3 text-sm text-gray-700 hover:bg-slate-100 font-500",
    },
    preflights: [
        {
            getCSS: () => `
            html,
            body {
                font-family: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
                    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
                    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                font-weight: 400;
            }
            `,
        },
    ],
})
