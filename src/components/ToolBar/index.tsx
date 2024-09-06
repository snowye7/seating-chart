import excelPng from "@png/excel.png"
import { message, Tooltip } from "antd"
import { ImportExcel } from "deepsea-components"
import { FC, PropsWithChildren, useRef, useState } from "react"
import { Student } from "../../App"
import { useLocalStorageState } from "ahooks"
import { STUDENTS_LOCAL_KEY } from "../../constant"
import { nanoid } from "nanoid"

type ToolBarItemProps = {
    onClick: () => void
    title: string
} & PropsWithChildren
const ToolBarItem: FC<ToolBarItemProps> = props => {
    const { onClick, children, title } = props

    return (
        <Tooltip title={title}>
            <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:bg-secondary" onClick={() => onClick()}>
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

    const [people, setPeople] = useLocalStorageState(STUDENTS_LOCAL_KEY, {
        listenStorageChange: true
    })

    const importExcelRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className="z-20 flex h-12 items-center justify-center gap-4 rounded-lg px-2 shadow-xl" style={{ boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, .17), 0px 0px 3px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05)" }}>
            <ToolBarItem onClick={importExcel} title="excel导入学生">
                <img src={excelPng} alt="excel导入学生" className="h-5 w-5" />
                <ImportExcel
                    onChange={e => {
                        const names = e.map(it => it["姓名"])
                        if (!names) {
                            message.warning("未获取到学生姓名")
                            return
                        }
                        setPeople(names.map(it => ({ name: it, id: nanoid() })))
                    }}
                    className="hidden"
                    ref={importExcelRef}
                ></ImportExcel>
            </ToolBarItem>
        </div>
    )
}
