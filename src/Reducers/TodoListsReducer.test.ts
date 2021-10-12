
import {v1} from "uuid";
import {
  addTodoListAC,
  changeFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC,
  TodoListsReducer, TodolistsType
} from "./TodoListsReducer";
import {FilterValuesType} from "./FilterReducer";

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

test('Add new todolist', () => {
  const startState: Array<TodolistsType> = [
    {id: '2', title: 'What to learn', filter: 'all'},
    {id: '3', title: 'What to buy', filter: 'all'},
  ]
  const newTodolistTitle = 'New Todolist Title'
  const newTodolistID = '1'
  const endState = TodoListsReducer(startState, addTodoListAC(newTodolistID, newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe('1')
  expect(endState[0].title).toBe('New Todolist Title')
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