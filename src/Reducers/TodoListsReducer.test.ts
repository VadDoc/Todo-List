
import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";
import {
  addTodoListAC,
  changeFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC,
  TodoListsReducer
} from "./TodoListsReducer";

test('Remove todolist', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const startState: Array<TodolistsType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]
  const endState = TodoListsReducer(startState, removeTodolistAC(todolistID1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('Add todolist', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const todolistID3 = v1()
  const newTodolistTitle = "New Todolist"
  const newTodolist: TodolistsType  = {id: todolistID1, title: newTodolistTitle, filter: 'all'}
  const startState: Array<TodolistsType> = [
    {id: todolistID2, title: 'What to learn', filter: 'all'},
    {id: todolistID3, title: 'What to buy', filter: 'all'},
  ]
  const endState = TodoListsReducer(startState, addTodoListAC(newTodolist))

  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe(todolistID1)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[0].filter).toBe('all')
})

test('Change todolist title', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const newTodolistTitle = "New Todolist"
  const startState: Array<TodolistsType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]
  const endState = TodoListsReducer(startState, changeTodoListTitleAC(todolistID2, newTodolistTitle))

  expect(endState[1].title).toBe(newTodolistTitle)
})

test('Change filter', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const newFilter: FilterValuesType = "active"
  const startState: Array<TodolistsType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]
  const endState = TodoListsReducer(startState, changeFilterAC(todolistID2, newFilter))

  expect(endState[1].filter).toBe(newFilter)
})