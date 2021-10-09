import {TaskType} from "../Todolist";
import {v1} from "uuid";

let initialState:TaskType[]=[
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
]

export const TaskReducer = (state=initialState, action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(t => t.id != action.id);
        }
        case 'ADD-TASK': {
            return [{id: v1(), title: action.title, isDone: false}, ...state]
        }
        case "CHANGE-STATUS": {
            return [...state].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
        }
        default:
            return state;
    }
}
export type tsarType = RemoveTaskACType | AddTaskACType | changeStatusACType

export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type changeStatusACType = ReturnType<typeof changeStatusAC>


export const RemoveTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
    } as const
}

export const AddTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        title
    } as const
}

export const changeStatusAC = (taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        taskId,
        isDone,
    } as const
}