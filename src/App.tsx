import React, {useState} from 'react';
import './App.css';
import Todolist from "./TodoList";
import {v1} from 'uuid';
import {isBoolean} from "util";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'HTML & CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
  ])

  const [filter, setFilter] = useState<FilterValueType>('all')

  const removeTask = (taskID: string) => {
    setTasks(tasks.filter(t => t.id !== taskID))
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }

    const updateTasks = [newTask, ...tasks]
    setTasks(updateTasks)
  }

  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    let task = tasks.find(t => t.id === taskID)
    if(task) task.isDone = isDone
    // let copy = [...tasks]
    // setTasks(copy)
    setTasks([...tasks])
  }

  // const changeTaskStatus = (taskID: string, isDone: boolean) => {
  //   const updatedTasks: Array<TaskType> = tasks.map(t => t.id === taskID ? {...t, isDone} : t)
  //   setTasks(updatedTasks)
  // }

  // const changeTaskStatus = (taskID: string, isDone: boolean) => {
  //   setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t) )
  // }

  const changeTodoFilter = (filter: FilterValueType) => {
    setFilter(filter)
  }

  let tasksForRender = tasks
  if (filter === 'active') {
    tasksForRender = tasks.filter(t => !t.isDone)
  }
  if (filter === 'completed') {
    tasksForRender = tasks.filter(t => t.isDone)
  }

  return (
    <div className="App">
      <Todolist
        title={'What to learn'}
        tasks={tasksForRender}
        filter={filter}
        removeTask={removeTask}
        changeTodoFilter={changeTodoFilter}
        changeTaskStatus={changeTaskStatus}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
