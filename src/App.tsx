import { useLocalStorageState } from "ahooks"
import { FC } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { clsx } from "snowye-tools"
import { Listenr, Theme, ToolBar, useWindowSize } from "./components"
import { STUDENTS_LOCAL_KEY } from "./constant"

export type Student = {
    name: string
    id: string
}

const Seat: FC = () => {
    return (
        <div className="col-span-4 rounded-md border-[3px] border-dashed border-secondary">
            <DragDropContext onDragEnd={e => console.log(e)}>
                <Droppable droppableId="list">
                    {(provided, dragInfo) => {
                        return <div {...provided.droppableProps} ref={provided.innerRef} className={clsx("h-full w-[200px] bg-yellow-50")}></div>
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

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

    const [people, setPeople] = useLocalStorageState<Student[]>(STUDENTS_LOCAL_KEY, {
        defaultValue: [],
        listenStorageChange: true
    })

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        console.log(result)
    }

    return (
        <>
            <Listenr></Listenr>
            <Header></Header>
            <DragDropContext onDragEnd={e => console.log(e)}>
                <div className="grid grid-cols-5 gap-10 px-10 py-10" style={{ height: height - 60, width }}>
                    <Droppable droppableId="list">
                        {(provided, dragInfo) => {
                            return (
                                <div {...provided.droppableProps} ref={provided.innerRef} className={clsx("flex flex-wrap justify-between overflow-y-scroll rounded-md bg-violet-200 px-4 py-4 [&>*:last-child]:mr-auto")}>
                                    {people?.map((it, idx) => (
                                        <Draggable key={it.id} draggableId={it.id} index={idx}>
                                            {provided => (
                                                <div className="flex h-8 w-24 items-center justify-center rounded-md bg-violet-600 text-white" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    {it.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>

                    <div className="col-span-4 rounded-md border-[3px] border-dashed border-secondary">
                        <Droppable droppableId="list2">
                            {(provided, dragInfo) => {
                                return <div {...provided.droppableProps} ref={provided.innerRef} className={clsx("h-full w-[200px] bg-yellow-50")}></div>
                            }}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </>
    )
}

export default App
