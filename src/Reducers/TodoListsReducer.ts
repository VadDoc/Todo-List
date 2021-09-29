import {FilterValuesType, TodolistsType} from "../App";

export const TodoListsReducer = (state: Array<TodolistsType>, action: CommonACType) => {
  switch (action.type) {
    case 'REMOVE_TODO_LIST': {
      return state.filter(f => f.id !== action.todolistID)
    }
    case 'CHANGE_TODO_LIST_TITLE': {
      return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)
    }
    case 'CHANGE_FILTER': {
      return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
    }
    case 'ADD_TODO_LIST': {
      return [action.todolist, ...state]
    }

      default:
        return state
  }
}

type CommonACType = RemoveTodolistACType | ChangeTodoListTitleACType | ChangeFilterACType | AddTodoListForTodoListsReducerACType

type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (todolistID: string) => {
  return {
    type: 'REMOVE_TODO_LIST', todolistID
  } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
export const ChangeTodoListTitleAC = (todolistID: string, title: string) => {
  return {
    type: 'CHANGE_TODO_LIST_TITLE', todolistID, title
  } as const
}

type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
export const ChangeFilterAC = (todolistID: string, value: FilterValuesType) => {
  return {
    type: 'CHANGE_FILTER', todolistID, value
  } as const
}

type AddTodoListForTodoListsReducerACType = ReturnType<typeof AddTodoListForTodoListsReducerAC>
export const AddTodoListForTodoListsReducerAC = (todolist: TodolistsType) => {
  return {
    type: 'ADD_TODO_LIST', todolist
  } as const
}