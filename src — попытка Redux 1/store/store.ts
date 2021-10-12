import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../Reducers/TasksReducer";
import {TodoListsReducer} from "../Reducers/TodoListsReducer";
import {FilterReducer} from "../Reducers/FilterReducer";


const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolists: TodoListsReducer,
  filter: FilterReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)