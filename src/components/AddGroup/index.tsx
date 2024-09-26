import { BellOutlined, BulbFilled, BulbOutlined, FileAddOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import { FC, useState } from "react"
import { Student, useGroup, usePeople } from "../../hooks"
import { clsx } from "snowye-tools"
import { useTheme } from "../Theme"
import logoDark from "@png/logo-dark.png"
import logoLight from "@png/logo-light.png"

export const AddGroup: FC = () => {
    const [theme] = useTheme()

    const [groupNumber, setGroupNumber] = useState(6)

    const [people, setPeople] = usePeople()

    const [group, setGroup] = useGroup()

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
                <img src={theme === "light" ? logoLight : logoDark} alt="" />
                <div className={clsx("flex gap-2 text-4xl", theme === "light" ? "text-primary" : "text-secondary")}>Seating Chart</div>
            </div>
            <div className="text-xl text-gray-400">
                <div>所有数据将存储在浏览器本地</div>
            </div>
            <div className="flex gap-2">
                <InputNumber min={1} max={20} value={groupNumber} onChange={e => setGroupNumber(e!)} />
                <Button
                    type="primary"
                    onClick={() => {
                        const result = { source: people } as Record<string, Student[]>
                        for (let i = 1; i <= groupNumber; i++) {
                            result[`group${i}`] = []
                        }
                        setGroup(result)
                    }}
                >
                    添加组
                </Button>
            </div>
        </div>
    )
}
