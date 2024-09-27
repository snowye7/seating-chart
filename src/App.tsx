import { App as AntdApp } from "antd"
import { FC } from "react"
import { Listenr, Theme, ToolBar } from "./components"
import { DndContext } from "./components/DndContext"

const Header: FC = () => {
    return (
        <header className="relative flex h-[100px] items-center justify-center">
            <ToolBar />
            <Theme />
        </header>
    )
}

const App = () => {
    const { message } = AntdApp.useApp()

    window.message = message

    return (
        <>
            <Listenr />
            <Header />
            <DndContext />
        </>
    )
}

export default App
