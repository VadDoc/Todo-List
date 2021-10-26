import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {AddItem} from "./Components/AddItem";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'
export type TasksType = {
  [key: string]: Array<TaskType>
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

function App() {
  debugger
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]);
  const [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
  })

  const addTodolist = (title: string) => {
    const todolistId = v1()
    setTodolists([{id: todolistId, title: title, filter: "all"}, ...todolists])
    setTasks({...tasks, [todolistId]: []})
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(t => t.id !== todolistId))
  }


  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: title} : t))
  }

  const addTask = (todolistId: string, title: string) => {
    setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== taskId)})
  }
  const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
  }

  const changeFilter = (todolistId: string, filter: FilterType) => {
    setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: filter} : m))
  }


  return (
    <div className="App">
      <AddItem addItem={addTodolist}/>
      {todolists.map(t => {
        let tasksAfterFilter = tasks[t.id]

        if (t.filter === 'active') {
          tasksAfterFilter = tasksAfterFilter.filter(task => !task.isDone)
        }

        if (t.filter === 'completed') {
          tasksAfterFilter = tasksAfterFilter.filter(task => task.isDone)
        }
        return (
          <Todolist
            key={t.id}
            todolist={t}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
            removeTask={removeTask}
            tasks={tasksAfterFilter}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
          />
        )
      })}

    </div>
  );
}

export default App;
