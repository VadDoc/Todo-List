import {combineReducers, createStore} from "redux";
import {TaskReducer} from "../reducers/TaskReducer";
import {FilterReducer} from "../reducers/FilterReducer";

const rootReducer = combineReducers({
  tasks: TaskReducer,
  filter: FilterReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)