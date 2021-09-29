import {FilterValuesType} from "../App";

export const FilterReducer = (state: FilterValuesType, action: FilterACType): FilterValuesType  => {
  switch (action.type) {
    case "FILTER_TASKS": {
      return action.value
    }
    default:
      return state
  }
}

export type FilterACType = ReturnType<typeof FilterAC>

export const FilterAC = (value: FilterValuesType) => {
  return {
    type: 'FILTER_TASKS',
    value
  } as const
}
