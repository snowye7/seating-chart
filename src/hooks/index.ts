import { useLocalStorageState } from "ahooks"
import { STUDENTS_GROUP_KEY, STUDENTS_LOCAL_KEY } from "../constant"

export type Group = Record<string, Student[]>
export function useGroup() {
    return useLocalStorageState<Group | null>(STUDENTS_GROUP_KEY, {
        defaultValue: null,
        listenStorageChange: true
    })
}

export type Student = {
    name: string
    id: string
}

export function usePeople() {
    return useLocalStorageState<Student[]>(STUDENTS_LOCAL_KEY, {
        defaultValue: [],
        listenStorageChange: true
    })
}
