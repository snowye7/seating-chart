import { Segmented } from "antd"
import { FC } from "react"
import { DesktopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons"
import { useLocalStorageState } from "ahooks"
import { STUDENTS_THEME_KEY } from "../../constant"

export type ThemeEnum = "light" | "dark" | "system"
export function useTheme() {
    return useLocalStorageState<ThemeEnum>(STUDENTS_THEME_KEY, {
        defaultValue: "system",
        listenStorageChange: true
    })
}

export const Theme: FC = () => {
    const [state, setState] = useTheme()

    return (
        <Segmented
            size="large"
            className="absolute right-10 top-1/2 -translate-y-1/2"
            value={state}
            onChange={setState}
            options={[
                { label: "浅色", icon: <SunOutlined />, value: "light" },
                { label: "深色", icon: <MoonOutlined />, value: "dark" },
                { label: "系统", icon: <DesktopOutlined />, value: "system" }
            ]}
        />
    )
}
