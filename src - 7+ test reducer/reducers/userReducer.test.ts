import {userReducer} from "./userReducer";


test('increment age', ()=>{
  const startState = {age: 20, childrenCount: 3, name: "John" }
  const endState = userReducer(startState, {type: 'INCREMENT_AGE' })

  expect(endState.age).toBe(21)
  expect(endState.childrenCount).toBe(3)
})

test('increment age', ()=>{
  const startState = {age: 20, childrenCount: 3, name: "John" }
  const endState = userReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT' })

  expect(endState.age).toBe(20)
  expect(endState.childrenCount).toBe(4)
})

test('change name', ()=>{
  const startState = {age: 20, childrenCount: 3, name: "John" }
  const newName = 'Jack'
  const endState = userReducer(startState, {type: 'CHANGE_NAME' , newName: newName})

  expect(endState.name).toBe(newName)
  expect(endState.age).toBe(20)
  expect(endState.childrenCount).toBe(3)
})