import {combineReducers, createStore} from "redux";
import {TodoListsReducer} from "../Reducers/TodoListsReducer";
import {TasksReducer} from "../Reducers/TasksReducer";
import {FilterReducer} from "../Reducers/FilterReducer";

const rootReducer = combineReducers({
  todolists: TodoListsReducer,
  tasks: TasksReducer,
  filter: FilterReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)