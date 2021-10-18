import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {addEmptyArrayInsteadTaskAC, TasksType} from "./Reducers/TasksReducer";
import {addTodoListAC, TodolistsType} from "./Reducers/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Store/Store";

export const App = () => {
  const todolists = useSelector<RootReducerType, Array<TodolistsType>>(state => state.todolists)
  const tasks = useSelector<RootReducerType, TasksType>(state => state.tasks)

  const dispatch = useDispatch()
  const addTodoList = (title: string) => {
    const newTodolistID = v1()
    dispatch(addTodoListAC(newTodolistID, title))
    dispatch(addEmptyArrayInsteadTaskAC(newTodolistID))
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} buttonName={'Add todolist'}/>
      <div className={"todos-wrapper"}>
        {todolists.map(todolist => {
          let tasksForTodolist = tasks[todolist.id];

          if (todolist.filter === "active") {
            tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
          }
          if (todolist.filter === "completed") {
            tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
          }

          return (
            <Todolist key={todolist.id} todolist={todolist} tasks={tasksForTodolist}/>
          )
        })}
      </div>
    </div>
  );
}
