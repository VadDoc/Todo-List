import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
  addEmptyArrayInsteadTaskAC,
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./Reducers/TasksReducer";
import {
  addTodoListAC,
  changeFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC,
} from "./Reducers/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
  id: string, title: string, filter: FilterValuesType
}
export type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {
  const dispatch = useDispatch();
  const todolists = useSelector<rootReducerType, Array<TodolistsType>>(state => state.todolists)
  const tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)
  const filter = useSelector<rootReducerType, FilterValuesType>(state => state.filter)

  const addTodoList = (title: string) => {
    const newTodolistID = v1()
    dispatch(addTodoListAC(newTodolistID, title))
    dispatch(addEmptyArrayInsteadTaskAC(newTodolistID))
  }

  const removeTodolist = (todolistID: string) => {
    dispatch(removeTodolistAC(todolistID))
  }

  function changeTodoListTitle(todolistID: string, title: string) {
    dispatch(changeTodoListTitleAC(todolistID, title))
  }

  function removeTask(todolistID: string, id: string) {
    dispatch(removeTaskAC(todolistID, id))
  }

  function addTask(todolistID: string, title: string) {
    dispatch(addTaskAC(todolistID, title))
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    dispatch(changeStatusAC(todolistID, taskId, isDone))
  }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    dispatch(changeFilterAC(todolistID, value))
  }

  function changeTaskTitle(todolistID: string, taskId: string, title: string) {
    dispatch(changeTaskTitleAC(todolistID, taskId, title))
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} buttonName={'Add todolist'}/>
      <div className={"todos-wrapper"}>
        {todolists.map(m => {
          // let tasksForTodolist = tasks[m.id];
          //
          // if (m.filter === "active") {
          //   tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
          // }
          // if (m.filter === "completed") {
          //   tasksForTodolist = tasks[m.id].filter(t => t.isDone);
          // }


          return (
            <Todolist
              // key={m.id}
              // todolistID={m.id}
              removeTodolist={removeTodolist}
              // title={m.title}
              // tasks={tasksForTodolist}
              removeTask={removeTask}
              // changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              // filter={m.filter}
              changeTaskTitle={changeTaskTitle}
              changeTodoListTitle={changeTodoListTitle}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
