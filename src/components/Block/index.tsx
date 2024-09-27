import { FC } from "react"
import { clsx } from "snowye-tools"

export type BlockPorps = {
    name: string
    width: number
}

export const Block: FC<BlockPorps> = props => {
    const { name, width } = props

    return (
        <div style={{ width }} className={clsx("flex h-12 flex-none items-center justify-center rounded-md bg-violet-600 text-white transition-all hover:bg-violet-800")}>
            {name}
        </div>
    )
}
