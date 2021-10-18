import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../Reducers/TasksReducer";
import {TodoListsReducer} from "../Reducers/TodoListsReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todolists: TodoListsReducer,
  tasks: TasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
// window.store = store