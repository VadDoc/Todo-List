import {FilterValuesType, TodolistsType} from "../App";

const REMOVE_TODO_LIST = 'REMOVE_TODO_LIST'
const CHANGE_TODO_LIST_TITLE = 'CHANGE_TODO_LIST_TITLE'
const CHANGE_FILTER = 'CHANGE_FILTER'
const ADD_TODO_LIST = 'ADD_TODO_LIST'

export const TodoListsReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {
  switch (action.type) {
    case REMOVE_TODO_LIST:
      return state.filter(f => f.id !== action.todolistID)
    case CHANGE_TODO_LIST_TITLE:
      return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)
    case CHANGE_FILTER:
      return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
    case ADD_TODO_LIST:
      return [{id: action.newTodolistID, title: action.title, filter: 'all'}, ...state]
    default:
      return state
  }
}

type ActionsType =
  RemoveTodolistActionType
  | ChangeTodoListTitleActionType
  | ChangeFilterActionType
  | AddTodoListActionType
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
type AddTodoListActionType = ReturnType<typeof addTodoListAC>

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: REMOVE_TODO_LIST, todolistID
  } as const
}
export const changeTodoListTitleAC = (todolistID: string, title: string) => {
  return {
    type: CHANGE_TODO_LIST_TITLE, todolistID, title
  } as const
}
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
  return {
    type: CHANGE_FILTER, todolistID, value
  } as const
}
export const addTodoListAC = (newTodolistID: string, title: string) => {
  return {
    type: ADD_TODO_LIST, newTodolistID, title
  } as const
}

