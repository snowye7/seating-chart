import { FC, useEffect } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { clsx } from "snowye-tools"
import { AddGroup, Listenr, Theme, ToolBar, useTheme, useWindowSize } from "./components"
import { useGroup, usePeople } from "./hooks"
import { App as AntdApp } from "antd"

const Header: FC = () => {
    return (
        <header className="relative flex h-[100px] items-center justify-center">
            <ToolBar />
            <Theme />
        </header>
    )
}

type BlockPorps = {
    name: string
    width: number
}

const Block: FC<BlockPorps> = props => {
    const { name, width } = props

    return (
        <div style={{ width }} className={clsx("flex h-12 flex-none items-center justify-center rounded-md bg-violet-600 text-white transition-all hover:bg-violet-800")}>
            {name}
        </div>
    )
}

const App = () => {
    const { width, height } = useWindowSize()

    const { message } = AntdApp.useApp()

    window.message = message

    const [theme] = useTheme()

    const [people] = usePeople()

    const [group, setGroup] = useGroup()

    const onDragEnd = (result: DropResult) => {
        if (!group) return
        const { source, destination } = result

        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return
        }

        const sourceList = [...group[source.droppableId]]

        const destList = source.droppableId === destination.droppableId ? sourceList : [...group[destination.droppableId]]

        const [removed] = sourceList.splice(source.index, 1)

        destList.splice(destination.index, 0, removed)

        setGroup({
            ...group,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destList
        })
    }

    const leftWidth = (width - 80 - 40) / 6

    const sourceItemWidth = Math.floor(leftWidth - 32)

    const groupLength = Object.keys(group ?? {}).length - 1

    const targetItemWidth = group ? Math.floor((leftWidth * 5 - 16 - groupLength * 8) / groupLength - 32) : 99999999999

    const blockWidth = Math.min(sourceItemWidth, targetItemWidth)

    const contanierHeight = height - 60 - 80

    return (
        <>
            <Listenr></Listenr>
            <Header></Header>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-10 px-10 pb-10" style={{ height: height - 100 }}>
                    <Droppable droppableId="source">
                        {(provided, dragInfo) => {
                            return (
                                <div {...provided.droppableProps} style={{ width: leftWidth }} ref={provided.innerRef} className={clsx("flex flex-col items-center overflow-y-auto rounded-md", theme === "light" ? "bg-secondary" : "bg-darkBg", dragInfo.isDraggingOver && (theme === "light" ? "bg-amber-100" : "bg-amber-200"))}>
                                    {(group ? group["source"] : people)?.map((it, idx) => (
                                        <Draggable key={it.id} draggableId={it.id} index={idx}>
                                            {provided => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="h-14 py-1">
                                                    <Block name={it.name} width={blockWidth}></Block>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>

                    <div className={"flex h-full gap-2 rounded-md border-[3px] border-dashed border-secondary"} style={{ width: leftWidth * 5 }}>
                        {!group ? (
                            <AddGroup />
                        ) : (
                            <div className="flex h-full w-full flex-col gap-4 py-2">
                                <div className={clsx("mx-auto flex h-[60px] w-[280px] flex-none items-center justify-center rounded-lg text-2xl", theme === "light" ? "bg-secondary" : "bg-[#403e6a]")}>讲台</div>
                                <div className="flex h-full gap-2 px-2">
                                    {Object.entries(group)
                                        .filter(([key]) => key !== "source")
                                        .map(([key, students], idx) => {
                                            return (
                                                <div key={key} className="flex h-full flex-1 flex-col gap-2">
                                                    <div className={clsx("rounded-md py-2 text-center text-2xl tracking-widest", theme === "light" ? "bg-secondary" : "bg-[#403e6a]")}>第{idx + 1}列</div>
                                                    <Droppable droppableId={key}>
                                                        {(provided, dragInfo) => {
                                                            return (
                                                                <div {...provided.droppableProps} ref={provided.innerRef} className={clsx("flex flex-col items-center overflow-y-auto rounded-md py-4", theme === "light" ? "bg-secondary" : "bg-darkBg", dragInfo.isDraggingOver && (theme === "light" ? "bg-amber-100" : "bg-amber-200"))} style={{ height: contanierHeight - 16 - 60 - 16 - 8 - 48 }}>
                                                                    {students.map((it, idx) => (
                                                                        <Draggable key={it.id} draggableId={it.id} index={idx}>
                                                                            {provided => (
                                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="h-14 py-1">
                                                                                    <Block name={it.name} width={blockWidth}></Block>
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )
                                                        }}
                                                    </Droppable>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DragDropContext>
        </>
    )
}

export default App
