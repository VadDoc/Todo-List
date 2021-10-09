import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType |
  ChangeTodolistFilterActionType
type RemoveTodolistActionType = {
  type: 'REMOVE_TODOLIST'
  id: string
}
type AddTodolistActionType = {
  type: 'ADD_TODOLIST'
  title: string
}
type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE'
  id: string
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER'
  id: string
  filter: FilterValuesType
}

export const todoListsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter(todolist => todolist.id !== action.id)
    case 'ADD_TODOLIST':
      return [...state, {id: v1(), title: action.title, filter: 'all'}]
    case 'CHANGE_TODOLIST_TITLE':
      return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
    case 'CHANGE_TODOLIST_FILTER':
      return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
    default:
      return state
  }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
  return {type: "REMOVE_TODOLIST", id: todolistID}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {type: "ADD_TODOLIST", title: title}
}
export const ChangeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionType => {
  return {type: "CHANGE_TODOLIST_TITLE", id: todolistID, title: title}
}
export const ChangeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter: filter}
}