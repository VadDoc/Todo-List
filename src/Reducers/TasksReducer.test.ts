import {
  addEmptyArrayInsteadTaskAC,
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksReducer
} from "./TasksReducer";
import {TodolistsType} from "../App";

test('Remove task', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: true},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: true},
      {id: '2', title: "CSS", isDone: false},
    ]
  }
  const endState = TasksReducer(startState, removeTaskAC('todolistID1', '1'))

  expect(endState.todolistID1.length).toBe(1)
  expect(endState.todolistID2.length).toBe(2)
  expect(endState.todolistID1.every(t => t.id !== '1')).toBeTruthy()
})

test('Add task', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: true},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: true},
      {id: '2', title: "CSS", isDone: false},
    ]
  }

  const newTaskTitle = 'Angular'
  const endState = TasksReducer(startState, addTaskAC('todolistID1', newTaskTitle))

  expect(endState.todolistID1.length).toBe(3)
  expect(endState.todolistID2.length).toBe(2)
  expect(endState.todolistID1[0].title).toBe(newTaskTitle)
  expect(endState.todolistID1[0].id).toBeDefined()
  expect(endState.todolistID1[0].isDone).toBe(false)
})

test('Change task status', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: false},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: false},
      {id: '2', title: "CSS", isDone: false},
    ]
  }

  const endState = TasksReducer(startState, changeStatusAC('todolistID1', '2', true))

  expect(endState.todolistID1[0].isDone).toBeFalsy()
  expect(endState.todolistID1[1].isDone).toBeTruthy()
  expect(endState.todolistID2[0].isDone).toBeFalsy()
  expect(endState.todolistID2[0].isDone).toBeFalsy()
})

test('Change task title', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: false},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: false},
      {id: '2', title: "CSS", isDone: false},
    ]
  }

  const endState = TasksReducer(startState, changeTaskTitleAC('todolistID1', '1', 'Angular'))

  expect(endState.todolistID1[0].title).toBe('Angular')
  expect(endState.todolistID1[1].title).toBe('ReactJS')
  expect(endState.todolistID2[0].title).toBe("HTML")
  expect(endState.todolistID2[1].title).toBe("CSS")
})

test('Add empty array instead task', () => {
  const todolist: TodolistsType = {id: '1', title: 'What to learn', filter: 'all'}
  const startState = {}
  const endState = TasksReducer(startState, addEmptyArrayInsteadTaskAC(todolist))

  expect(endState['1'].length).toBe(0)
})
