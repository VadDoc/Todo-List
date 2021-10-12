import {FilterValuesType} from "../App";

const SET_FILTER = 'SET_FILTER'
const initialState: FilterValuesType = "all"

export const filterReducer = (state: FilterValuesType = initialState, action: ActionsType): FilterValuesType => {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state
  }
}

export type ActionsType = setFilterACType
export type setFilterACType = ReturnType<typeof setFilterAC>

export const setFilterAC = (value: FilterValuesType) => {
  return {
    type: SET_FILTER,
    value
  } as const
}