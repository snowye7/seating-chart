import { FileAddOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import { FC, useState } from "react"
import { Student, useGroup, usePeople } from "../../hooks"

export const AddGroup: FC = () => {
    const [groupNumber, setGroupNumber] = useState(6)

    const [people, setPeople] = usePeople()

    const [group, setGroup] = useGroup()

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="flex gap-2 text-4xl text-primary">
                <FileAddOutlined />
                请先添加列数
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
                    添加
                </Button>
            </div>
        </div>
    )
}
