type StateType = {
  age: number
  childrenCount: number
  name: string
}

type ActionType = {
  type: ActionTypeType
  [key: string]: any //какая-то доп. инструкция для выполнения действия(id)
}

type ActionTypeType = 'INCREMENT_AGE' | 'INCREMENT_CHILDREN_COUNT' | 'CHANGE_NAME'

const INCREMENT_AGE = 'INCREMENT_AGE'
const INCREMENT_CHILDREN_COUNT = 'INCREMENT_CHILDREN_COUNT'

export const userReducer = (state: StateType, action: ActionType):StateType => {
  switch (action.type) {
    case 'INCREMENT_AGE':
      return {...state, age: state.age + 1}
    case 'INCREMENT_CHILDREN_COUNT':
      return {...state, childrenCount: state.childrenCount + 1}
    case 'CHANGE_NAME':
      return {...state, name: action.newName}

    default:
      return state
  }
}