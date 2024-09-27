import { DesktopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons"
import { useLocalStorageState, useMemoizedFn } from "ahooks"
import { Segmented } from "antd"
import { FC, useEffect } from "react"
import { STUDENTS_THEME_KEY, STUDENTS_THEME_SELECT_KEY } from "../../constant"

export type Themes = "light" | "dark"

export enum ThemeEnum {
    "浅色" = "light",
    "深色" = "dark",
    "系统" = "system"
}
export function useTheme() {
    return useLocalStorageState<Themes>(STUDENTS_THEME_KEY, {
        defaultValue: window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light",
        listenStorageChange: true
    })
}

export const Theme: FC = () => {
    const [theme, setTheme] = useTheme()

    const [value, setValue] = useLocalStorageState<ThemeEnum>(STUDENTS_THEME_SELECT_KEY, {
        defaultValue: ThemeEnum.系统,
        listenStorageChange: true
    })

    const handle = useMemoizedFn((e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light")
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme!)
    }, [theme])

    useEffect(() => {
        const mediaQueryList = window.matchMedia("(prefers-color-scheme:dark)")
        if (value !== ThemeEnum.系统) {
            mediaQueryList.removeEventListener("change", handle)
            setTheme(value)
            return
        }
        const theme = mediaQueryList.matches ? "dark" : "light"
        setTheme(theme)
        mediaQueryList.addEventListener("change", handle)
        return () => mediaQueryList.removeEventListener("change", handle)
    }, [value])

    return (
        <Segmented
            size="large"
            className="absolute right-10 top-1/2 -translate-y-1/2"
            value={value}
            onChange={setValue}
            options={[
                { label: "浅色", icon: <SunOutlined />, value: ThemeEnum.浅色 },
                { label: "深色", icon: <MoonOutlined />, value: ThemeEnum.深色 },
                { label: "系统", icon: <DesktopOutlined />, value: ThemeEnum.系统 }
            ]}
        />
    )
}
