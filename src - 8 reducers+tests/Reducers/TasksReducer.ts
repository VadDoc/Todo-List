import {TasksType, TodolistsType} from "../App";
import {v1} from "uuid";

export const TasksReducer = (state: TasksType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskId)
      }
    case 'ADD_TASK':
      return {
        ...state,
        [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
      }
    case 'CHANGE_STATUS':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID]
          .map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)
      }
    case 'CHANGE_TASK_TITLE':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {...m, title: action.title} : m)
      }
    case 'ADD_EMPTY_ARRAY_INSTEAD_TASK':
      return {
        ...state,
        [action.todolist.id]: []
      }
    default:
      return state
  }
}

type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusActionType
  | ChangeTaskTitleActionType
  | AddEmptyArrayInsteadTaskActionType

type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
type AddTaskActionType = ReturnType<typeof AddTaskAC>
type ChangeStatusActionType = ReturnType<typeof ChangeStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>
type AddEmptyArrayInsteadTaskActionType = ReturnType<typeof AddEmptyArrayInsteadTaskAC>

export const RemoveTaskAC = (todolistID: string, taskId: string) => {
  return {
    type: 'REMOVE_TASK', todolistID, taskId
  } as const
}
export const AddTaskAC = (todolistID: string, title: string) => {
  return {
    type: 'ADD_TASK', todolistID, title
  } as const
}
export const ChangeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
  return {
    type: 'CHANGE_STATUS',
    todolistID, taskId, isDone
  } as const
}
export const ChangeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE_TASK_TITLE', todolistID, taskId, title
  } as const
}
export const AddEmptyArrayInsteadTaskAC = (todolist: TodolistsType) => {
  return {
    type: 'ADD_EMPTY_ARRAY_INSTEAD_TASK', todolist
  } as const
}