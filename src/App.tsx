import { FC } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { clsx } from "snowye-tools"
import { Listenr, Theme, ToolBar, useWindowSize } from "./components"
import { AddGroup } from "./components/AddGroup"
import { useGroup, usePeople } from "./hooks"

const Header: FC = () => {
    return (
        <header className="relative flex h-[60px] items-center justify-center">
            <ToolBar />
            <Theme />
        </header>
    )
}

const App = () => {
    const { width, height } = useWindowSize()

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

    const sourceItemWidth = leftWidth - 32

    const groupLength = Object.keys(group ?? {}).length - 1

    const targetItemWidth = group ? (leftWidth * 5 - 16 - groupLength * 8) / groupLength - 32 : 99999999999

    const blockWidth = Math.min(sourceItemWidth, targetItemWidth)

    const contanierHeight = height - 60 - 80

    return (
        <>
            <Listenr></Listenr>
            <Header></Header>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-10 px-10 py-10" style={{ height: height - 60 }}>
                    <Droppable droppableId="source">
                        {(provided, dragInfo) => {
                            return (
                                <div {...provided.droppableProps} style={{ width: leftWidth }} ref={provided.innerRef} className={clsx("col-span-1 flex flex-col justify-between gap-2 overflow-y-scroll rounded-md bg-violet-200 px-4 py-4", dragInfo.isDraggingOver && "bg-amber-100")}>
                                    {(group ? group["source"] : people)?.map((it, idx) => (
                                        <Draggable key={it.id} draggableId={it.id} index={idx}>
                                            {provided => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div style={{ width: blockWidth }} className={clsx("flex h-12 flex-none items-center justify-center rounded-md bg-violet-600 text-white")}>
                                                        {it.name}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>

                    <div className="flex h-full gap-2 rounded-md border-[3px] border-dashed border-secondary" style={{ width: leftWidth * 5 }}>
                        {!group ? (
                            <AddGroup />
                        ) : (
                            <div className="flex h-full w-full flex-col gap-4 py-2">
                                <div className="mx-auto flex h-[60px] w-[280px] flex-none items-center justify-center rounded-lg bg-amber-200 text-2xl">讲台</div>
                                <div className="flex h-full gap-2 px-2">
                                    {Object.entries(group)
                                        .filter(([key]) => key !== "source")
                                        .map(([key, students], idx) => {
                                            return (
                                                <div key={key} className="flex h-full flex-1 flex-col gap-2">
                                                    <div className="rounded-md bg-amber-100 py-2 text-center text-2xl tracking-widest">第{idx + 1}列</div>
                                                    <Droppable droppableId={key}>
                                                        {(provided, dragInfo) => {
                                                            return (
                                                                <div {...provided.droppableProps} ref={provided.innerRef} className={clsx("flex flex-col gap-2 rounded-md bg-secondary p-4", dragInfo.isDraggingOver && "bg-amber-100")} style={{ height: contanierHeight - 16 - 60 - 16 - 8 - 48 }}>
                                                                    {students.map((it, idx) => (
                                                                        <Draggable key={it.id} draggableId={it.id} index={idx}>
                                                                            {provided => (
                                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                                    <div className={clsx("flex h-12 flex-none items-center justify-center rounded-md bg-violet-600 text-white")} style={{ width: blockWidth }}>
                                                                                        {it.name}
                                                                                    </div>
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
