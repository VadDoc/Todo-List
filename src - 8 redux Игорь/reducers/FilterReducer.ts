import {FilterValuesType} from "../App";

let initialState:FilterValuesType="all"

export const filterReducer = (state=initialState, action: tsarAction) => {
    switch (action.type) {
        case 'SET-FILTER': {
            return action.value;
        }
        default:
            return state
    }
}

export type tsarAction = setFilterACType

export type setFilterACType = ReturnType<typeof setFilterAC>

export const setFilterAC = (value: FilterValuesType) => {
    return {
        type: 'SET-FILTER',
        value
    } as const
}