import {TasksType, TodolistsType} from "../App";
import {v1} from "uuid";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_STATUS = 'CHANGE_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const ADD_EMPTY_ARRAY_INSTEAD_TASK = 'ADD_EMPTY_ARRAY_INSTEAD_TASK'


export const TasksReducer = (state: TasksType, action: ActionsType): TasksType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskId)
      }
    case ADD_TASK:
      return {
        ...state,
        [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
      }
    case CHANGE_STATUS:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID]
          .map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)
      }
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {...m, title: action.title} : m)
      }
    case ADD_EMPTY_ARRAY_INSTEAD_TASK:
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

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeStatusActionType = ReturnType<typeof changeStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type AddEmptyArrayInsteadTaskActionType = ReturnType<typeof addEmptyArrayInsteadTaskAC>

export const removeTaskAC = (todolistID: string, taskId: string) => {
  return {
    type: REMOVE_TASK, todolistID, taskId
  } as const
}
export const addTaskAC = (todolistID: string, title: string) => {
  return {
    type: ADD_TASK, todolistID, title
  } as const
}
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
  return {
    type: CHANGE_STATUS,
    todolistID, taskId, isDone
  } as const
}
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
  return {
    type: CHANGE_TASK_TITLE, todolistID, taskId, title
  } as const
}
export const addEmptyArrayInsteadTaskAC = (todolist: TodolistsType) => {
  return {
    type: ADD_EMPTY_ARRAY_INSTEAD_TASK, todolist
  } as const
}