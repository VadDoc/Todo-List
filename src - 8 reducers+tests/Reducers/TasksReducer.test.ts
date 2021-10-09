import {v1} from "uuid";
import {
  AddEmptyArrayInsteadTaskAC,
  AddTaskAC,
  ChangeStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  TasksReducer
} from "./TasksReducer";
import {TodolistsType} from "../App";

test('Remove task', () => {
  const todolistID = v1()
  const taskID1 = v1()
  const taskID2 = v1()

  const startState = {
    [todolistID]: [
      {id: taskID1, title: "JS", isDone: true},
      {id: taskID2, title: "ReactJS", isDone: false},
    ]
  }
  const endState = TasksReducer(startState, RemoveTaskAC(todolistID, taskID1))

  expect(endState[todolistID].length).toBe(1)
  expect(endState[todolistID][0].id).toBe(taskID2)
})

test('Add task', () => {
  const todolistID = v1()
  const taskID1 = v1()
  const taskID2 = v1()

  const startState = {
    [todolistID]: [
      {id: taskID1, title: "JS", isDone: true},
      {id: taskID2, title: "ReactJS", isDone: false},
    ]
  }
  const newTaskTitle = 'Angular'
  const endState = TasksReducer(startState, AddTaskAC(todolistID, newTaskTitle))

  expect(endState[todolistID].length).toBe(3)
  expect(endState[todolistID][0].title).toBe(newTaskTitle)
})

test('Change task status', () => {
  const todolistID = v1()
  const taskID1 = v1()
  const taskID2 = v1()
  const isDone = true

  const startState = {
    [todolistID]: [
      {id: taskID1, title: "JS", isDone: false},
      {id: taskID2, title: "ReactJS", isDone: false},
    ]
  }
  const endState = TasksReducer(startState, ChangeStatusAC(todolistID, taskID2, isDone))

  expect(endState[todolistID][0].isDone).toBe(false)
  expect(endState[todolistID][1].isDone).toBe(isDone)
})

test('Change task title', () => {
  const todolistID = v1()
  const taskID1 = v1()
  const taskID2 = v1()
  const newTitle = "Angular"

  const startState = {
    [todolistID]: [
      {id: taskID1, title: "JS", isDone: false},
      {id: taskID2, title: "ReactJS", isDone: false},
    ]
  }
  const endState = TasksReducer(startState, ChangeTaskTitleAC(todolistID, taskID1, newTitle))

  expect(endState[todolistID][0].title).toBe(newTitle)
})

test('Add empty array instead task', () => {
  const todolistID = v1()
  const todolist: TodolistsType = {id: todolistID, title: 'What to learn', filter: 'all'}
  const startState = {}
  const endState = TasksReducer(startState, AddEmptyArrayInsteadTaskAC(todolist))

  expect(endState[todolistID].length).toBe(0)
})
