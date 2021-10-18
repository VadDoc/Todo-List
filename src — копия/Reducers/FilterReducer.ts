export type FilterValuesType = "all" | "active" | "completed";

const initialState: FilterValuesType = 'all'

export const FilterReducer = (state: FilterValuesType = initialState, action: ActionsType): FilterValuesType => {
    switch (action.type) {
        case 'SET-FILTER': {
            return action.value;
        }
        default:
            return state
    }
}

export type ActionsType = setFilterActionType
export type setFilterActionType = ReturnType<typeof setFilterAC>

export const setFilterAC = (value: FilterValuesType) => {
    return {
        type: 'SET-FILTER',
        value
    } as const
}