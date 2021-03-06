import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addTodolistAC, TodolistsType,} from "./Reducers/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Store/Store";

function App() {
  const todolists = useSelector<RootReducerType, Array<TodolistsType>>(state => state.todolists)
  const dispatch = useDispatch()
  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }, [dispatch])

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} buttonName={'Add todolist'}/>
      <div className={"todos-wrapper"}>
        {todolists.map(todolist => <Todolist key={todolist.id} todolist={todolist}/>)}
      </div>
    </div>
  );
}

export default App;
