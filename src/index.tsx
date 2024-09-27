import { App as AntdApp, theme as AntdTheme, ConfigProvider } from "antd"
import zhCh from "antd/es/locale/zh_CN"
import { MessageInstance } from "antd/es/message/interface"
import { FC } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { useTheme } from "./components"
import "./css/theme.css"
import "./index.css"

declare global {
    const message: MessageInstance
    interface Window {
        message: MessageInstance
    }
}

const primaryColor = "#5b57d1"

const secondaryColor = "#e0dfff"

const ThemeApp: FC = () => {
    const [theme, setTheme] = useTheme()
    return (
        <ConfigProvider
            locale={zhCh}
            theme={{
                cssVar: true,
                algorithm: theme === "light" ? AntdTheme.defaultAlgorithm : AntdTheme.darkAlgorithm,
                token: {
                    colorPrimary: primaryColor
                },
                components: {
                    Tooltip: {
                        colorBgSpotlight: primaryColor
                    },
                    Segmented: {
                        itemSelectedBg: theme === "light" ? secondaryColor : primaryColor
                    }
                }
            }}
        >
            <AntdApp message={{ maxCount: 1 }}>
                <App></App>
            </AntdApp>
        </ConfigProvider>
    )
}

const rootEl = document.getElementById("root")
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl)
    root.render(<ThemeApp />)
}
