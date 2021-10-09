import {FilterValuesType} from "../App";

const initialState: FilterValuesType = 'all'

export const FilterReducer = (state = initialState, action: tsarAction) => {
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