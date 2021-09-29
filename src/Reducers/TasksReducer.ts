import {TasksType, TodolistsType} from "../App";
import {v1} from "uuid";

export const TasksReducer = (state: TasksType, action: CommonACType) => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskId)
      }
    }
    case 'ADD_TASK': {
      return {
        ...state,
        [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
      }
    }
    case 'CHANGE_STATUS': {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID]
          .map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)
      }
    }
    case 'CHANGE_TASK_TITLE': {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(m => m.id===action.taskId ? {...m, title: action.title} : m)
      }
    }
    case 'ADD_TODO_LIST': {
      return {
        ...state, [action.todolist.id]: []

      }
    }
    default:
      return state
  }
}

type CommonACType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTaskTitleACType | AddTodoListForTasksReducerACType

type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export const RemoveTaskAC = (todolistID: string, taskId: string) => {
  return {
    type: 'REMOVE_TASK',
    todolistID,
    taskId
  } as const
}

type AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (todolistID: string, title: string) => {
  return {
    type: 'ADD_TASK', todolistID, title
  } as const
}

type ChangeStatusACType = ReturnType<typeof ChangeStatusAC>
export const ChangeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
  return {
    type: 'CHANGE_STATUS',
    todolistID, taskId, isDone
  } as const
}

type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export const ChangeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE_TASK_TITLE', todolistID, taskId, title
  } as const
}

type AddTodoListForTasksReducerACType = ReturnType<typeof AddTodoListForTasksReducerAC>
export const AddTodoListForTasksReducerAC = (todolist: TodolistsType) => {
  return {
    type: 'ADD_TODO_LIST', todolist
  } as const
}