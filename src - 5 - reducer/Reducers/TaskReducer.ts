import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const TaskReducer = (state: Array<TaskType>, action: TaskACType) : Array<TaskType> => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return [...state.filter(t => t.id !== action.id)]
    }
    case 'ADD_TASK': {
      return [{id: v1(), title: action.title, isDone: false}, ...state]
    }
    case 'CHANGE_STATUS': {
      return [...state.map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)]
    }

    default:
      return state
  }
}

export type TaskACType = RemoveTaskACType | AddTaskACType | ChangeStatusType

export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type ChangeStatusType = ReturnType<typeof ChangeStatusAC>


export const RemoveTaskAC = (id: string) => {
  return {
    type: 'REMOVE_TASK',
    id
  } as const
}

export const AddTaskAC = (title: string) => {
  return {
    type: 'ADD_TASK',
    title
  } as const
}

export const ChangeStatusAC = (taskId: string, isDone: boolean) => {
  return {
    type: 'CHANGE_STATUS',
    taskId,
    isDone
  } as const
}