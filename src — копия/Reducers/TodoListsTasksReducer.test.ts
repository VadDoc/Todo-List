import {addTodoListAC, TodoListsReducer, TodolistsType} from "./TodoListsReducer";
import {addEmptyArrayInsteadTaskAC, TasksReducer} from "./TasksReducer";

test('Add todolist', () => {
  const startState: Array<TodolistsType> = [
    {id: '2', title: 'What to learn', filter: 'all'},
    {id: '3', title: 'What to buy', filter: 'all'},
  ]
  const newTodolistTitle = 'New Todolist Title'
  const newTodolistID = '1'
  const startStateTasks = {}

  const endStateTodoLists = TodoListsReducer(startState, addTodoListAC(newTodolistID, newTodolistTitle))
  const endStateTasks = TasksReducer(startStateTasks, addEmptyArrayInsteadTaskAC(newTodolistID))


  expect(endStateTodoLists.length).toBe(3)
  expect(endStateTodoLists[0].id).toBe('1')
  expect(endStateTodoLists[0].title).toBe('New Todolist Title')
  expect(endStateTodoLists[0].filter).toBe('all')
  expect(endStateTasks['1']).toStrictEqual([])
})