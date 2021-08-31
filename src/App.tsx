import React, {useState} from 'react';
import './App.css';
import Todolist from "./TodoList";
import {v1} from 'uuid';

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
        removeTask={removeTask}
        changeTodoFilter={changeTodoFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
