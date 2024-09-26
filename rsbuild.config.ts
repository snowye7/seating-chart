import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"

export default defineConfig({
    plugins: [pluginReact()],
    output: {
        polyfill: "entry"
    },
    html: {
        title: "Seating Chart",
        favicon: "./public/logo.png"
    }
})
