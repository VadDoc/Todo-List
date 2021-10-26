import {v1} from "uuid";

export type TodolistsType = {
  id: string, title: string, filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

export const REMOVE_TODO_LIST = 'REMOVE_TODO_LIST'
export const ADD_TODO_LIST = 'ADD_TODO_LIST'
const CHANGE_TODO_LIST_TITLE = 'CHANGE_TODO_LIST_TITLE'
const CHANGE_FILTER = 'CHANGE_FILTER'

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState: Array<TodolistsType> = [
  {id: todolistID1, title: 'What to learn', filter: 'all'},
  {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const TodoListsReducer = (state: Array<TodolistsType> = initialState, action: ActionsType): Array<TodolistsType> => {
  switch (action.type) {
    case REMOVE_TODO_LIST:
      return state.filter(f => f.id !== action.todolistID)
    case CHANGE_TODO_LIST_TITLE:
      return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)
    case CHANGE_FILTER:
      return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
    case ADD_TODO_LIST:
      return [{id: action.todolistID, title: action.title, filter: 'all'}, ...state]
    default:
      return state
  }
}

type ActionsType =
  RemoveTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeFilterActionType
  | AddTodolistActionType
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: REMOVE_TODO_LIST, todolistID
  } as const
}
export const changeTodolistTitleAC = (todolistID: string, title: string) => {
  return {
    type: CHANGE_TODO_LIST_TITLE, todolistID, title
  } as const
}
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
  return {
    type: CHANGE_FILTER, todolistID, value
  } as const
}
export const addTodolistAC = (title: string) => {
  return {
    type: ADD_TODO_LIST, title,  todolistID: v1()
  } as const
}

