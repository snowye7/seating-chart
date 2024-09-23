import ReactDOM from "react-dom/client"
import App from "./App"
import { ConfigProvider, theme as AntdTheme, App as AntdApp } from "antd"
import zhCh from "antd/es/locale/zh_CN"
import "./index.css"
import "./css/theme.css"
import { FC, PropsWithChildren } from "react"
import { useTheme } from "./components"
import { MessageInstance } from "antd/es/message/interface"

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
