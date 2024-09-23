import { ClearOutlined } from "@ant-design/icons"
import excelDarkPng from "@png/excel-dark.png"
import excelLightPng from "@png/excel-light.png"
import { Tooltip } from "antd"
import { ImportExcel } from "deepsea-components"
import { nanoid } from "nanoid"
import { FC, PropsWithChildren, useRef } from "react"
import { clsx } from "snowye-tools"
import { useGroup, usePeople } from "../../hooks"
import { useTheme } from "../Theme"

type ToolBarItemProps = {
    onClick?: () => void
    title: string
} & PropsWithChildren
const ToolBarItem: FC<ToolBarItemProps> = props => {
    const { onClick, children, title } = props

    const [theme] = useTheme()

    return (
        <Tooltip title={title}>
            <div className={clsx("flex h-9 w-9 cursor-pointer items-center justify-center rounded-md", theme === "light" ? "hover:bg-secondary" : "hover:bg-primary")} onClick={() => onClick?.()}>
                {children}
            </div>
        </Tooltip>
    )
}

export type ToolBarProps = {}

export const ToolBar: FC<ToolBarProps> = props => {
    function importExcel() {
        importExcelRef.current?.click()
    }

    const [theme] = useTheme()

    const [people, setPeople] = usePeople()

    const [group, setGroup] = useGroup()

    const importExcelRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className={clsx("z-20 flex h-12 items-center justify-center gap-2 rounded-lg px-2 shadow-xl", theme === "light" ? "bg-white" : "bg-darkBg")} style={{ boxShadow: theme === "light" ? "0px 0px 1px 0px rgba(0, 0, 0, .17), 0px 0px 3px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05)" : "none" }}>
            <ToolBarItem onClick={importExcel} title="excel导入学生">
                <img src={theme === "light" ? excelLightPng : excelDarkPng} alt="excel导入学生" className="h-5 w-5" />
                <ImportExcel
                    onChange={e => {
                        const names = e.map(it => it["姓名"])
                        if (!names) {
                            message.warning("未获取到学生姓名")
                            return
                        }
                        setPeople(names.map(it => ({ name: it, id: nanoid() })))
                        setGroup(null)
                        message.success(`成功读取${names.length}名学生`)
                    }}
                    className="hidden"
                    ref={importExcelRef}
                ></ImportExcel>
            </ToolBarItem>
            <ToolBarItem title="清除分组" onClick={() => setGroup(null)}>
                <ClearOutlined className={clsx("text-lg", theme === "light" ? "text-black" : "text-white")} />
            </ToolBarItem>
        </div>
    )
}
