import {combineReducers, createStore} from "redux";
import {TaskReducer} from "../reducers/TaskReducer";
import {filterReducer} from "../reducers/FilterReducer";

let rootReducer=combineReducers({
    tasks:TaskReducer,
    filter:filterReducer
})

export type rootReducerType=ReturnType<typeof rootReducer>
export let store=createStore(rootReducer)