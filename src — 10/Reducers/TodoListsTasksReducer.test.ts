import {TasksType, TodolistsType} from "../App";
import {addTodoListAC, TodoListsReducer} from "./TodoListsReducer";
import {TasksReducer} from "./TasksReducer";

test('ids should be equals', () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: Array<TodolistsType> = [];

  const action = addTodoListAC("new todolist");

  const endTasksState = TasksReducer(startTasksState, action)
  const endTodolistsState = TodoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistID);
  expect(idFromTodolists).toBe(action.todolistID);
});
