import { useRequest } from "ahooks"
import { FC, useEffect } from "react"

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
        window.addEventListener("resize", refresh)
        return () => window.removeEventListener("resize", refresh)
    }, [])

    return null
}
