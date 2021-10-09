import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
  AddEmptyArrayInsteadTaskAC,
  AddTaskAC,
  ChangeStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  TasksReducer
} from "./Reducers/TasksReducer";
import {
  AddTodoListAC,
  ChangeFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodolistAC,
  TodoListsReducer
} from "./Reducers/TodoListsReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
  id: string, title: string, filter: FilterValuesType
}
export type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {

  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, dispatchTodolists] = useReducer(TodoListsReducer, [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, dispatchTasks] = useReducer(TasksReducer, {
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });

  const addTodoList = (title: string) => {
    const todolist: TodolistsType = {id: v1(), title: title, filter: 'all'}
    dispatchTodolists(AddTodoListAC(todolist))
    dispatchTasks(AddEmptyArrayInsteadTaskAC(todolist))
  }

  const removeTodolist = (todolistID: string) => {
    dispatchTodolists(RemoveTodolistAC(todolistID))
  }

  function changeTodoListTitle(todolistID: string, title: string) {
    dispatchTodolists(ChangeTodoListTitleAC(todolistID, title))
  }

  function removeTask(todolistID: string, id: string) {
    dispatchTasks(RemoveTaskAC(todolistID, id))
  }

  function addTask(todolistID: string, title: string) {
    dispatchTasks(AddTaskAC(todolistID, title))
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    dispatchTasks(ChangeStatusAC(todolistID, taskId, isDone))
  }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    dispatchTodolists(ChangeFilterAC(todolistID, value))
  }

  function changeTaskTitle(todolistID: string, taskId: string, title: string) {
    dispatchTasks(ChangeTaskTitleAC(todolistID, taskId, title))
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} buttonName={'Add todolist'}/>
      <div className={"todos-wrapper"}>
        {todolists.map(m => {
          let tasksForTodolist = tasks[m.id];

          if (m.filter === "active") {
            tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
          }
          if (m.filter === "completed") {
            tasksForTodolist = tasks[m.id].filter(t => t.isDone);
          }

          return (
            <Todolist
              key={m.id}
              todolistID={m.id}
              removeTodolist={removeTodolist}
              title={m.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={m.filter}
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
