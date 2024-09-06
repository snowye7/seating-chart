import { useRequest } from "ahooks"
import { FC, useCallback, useEffect } from "react"
import { useTheme } from "../Theme"

export function getSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export function useWindowSize() {
    const { data, refresh } = useRequest<ReturnType<typeof getSize>, []>(
        async () => {
            return getSize()
        },
        {
            cacheKey: "useUi",
            staleTime: -1,
            cacheTime: 0
        }
    )

    return {
        ...(data ?? getSize()),
        refresh
    }
}

export const Listenr: FC = props => {
    const { refresh } = useWindowSize()

    useEffect(() => {
        const handler = refresh
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])

    const [theme] = useTheme()

    const handle = useCallback((e: MediaQueryListEvent) => {
        if (e.matches) {
            document.documentElement.setAttribute("data-theme", "dark")
        } else {
            document.documentElement.setAttribute("data-theme", "light")
        }
    }, [])

    useEffect(() => {
        const mediaQueryList = window.matchMedia("(prefers-color-scheme:dark)")

        if (theme !== "system") {
            document.documentElement.setAttribute("data-theme", theme!)
            mediaQueryList.removeEventListener("change", handle)
            return
        }

        document.documentElement.setAttribute("data-theme", mediaQueryList.matches ? "dark" : "light")

        mediaQueryList.addEventListener("change", handle)

        return () => mediaQueryList.removeEventListener("change", handle)
    }, [theme])

    return null
}
