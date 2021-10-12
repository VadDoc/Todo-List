import {v1} from "uuid";
import {todolistID1, todolistID2} from "./TodoListsReducer";
import {TaskType} from "../Todolist";

export type TasksType = {
  [key: string]: Array<TaskType>
}

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_STATUS = 'CHANGE_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const ADD_EMPTY_ARRAY_INSTEAD_TASK = 'ADD_EMPTY_ARRAY_INSTEAD_TASK'

const initialState: TasksType = {
  [todolistID1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ],
  [todolistID2]: [
    {id: v1(), title: "Meat", isDone: true},
    {id: v1(), title: "Sweets", isDone: true},
    {id: v1(), title: "Sugar", isDone: false},
    {id: v1(), title: "Juice", isDone: false},
    {id: v1(), title: "Fruit", isDone: false},
  ]
}

export const TasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.taskId)
      }
    case ADD_TASK:
      return {
        ...state,
        [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
      }
    case CHANGE_STATUS:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID]
          .map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)
      }
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {...m, title: action.title} : m)
      }
    case ADD_EMPTY_ARRAY_INSTEAD_TASK:
      return {
        ...state,
        [action.newTodolistID]: []
      }
    default:
      return state
  }
}

type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusActionType
  | ChangeTaskTitleActionType
  | AddEmptyArrayInsteadTaskActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeStatusActionType = ReturnType<typeof changeStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type AddEmptyArrayInsteadTaskActionType = ReturnType<typeof addEmptyArrayInsteadTaskAC>

export const removeTaskAC = (todolistID: string, taskId: string) => {
  return {
    type: REMOVE_TASK, todolistID, taskId
  } as const
}
export const addTaskAC = (todolistID: string, title: string) => {
  return {
    type: ADD_TASK, todolistID, title
  } as const
}
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
  return {
    type: CHANGE_STATUS,
    todolistID, taskId, isDone
  } as const
}
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
  return {
    type: CHANGE_TASK_TITLE, todolistID, taskId, title
  } as const
}
export const addEmptyArrayInsteadTaskAC = (newTodolistID: string) => {
  return {
    type: ADD_EMPTY_ARRAY_INSTEAD_TASK, newTodolistID
  } as const
}