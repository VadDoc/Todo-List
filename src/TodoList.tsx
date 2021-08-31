import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  changeTodoFilter: (filter: FilterValueType) => void
  addTask: (title: string) => void
}

const Todolist = (props: TodolistPropsType) => {
  const[title, setTitle] = useState<string>("")

  const tasksList = props.tasks.map(t => {
    return (
      <li>
        <input
          type="checkbox"
          checked={t.isDone}
        />
        <span>{t.title}</span>
        <button onClick={() => props.removeTask(t.id)}>x</button>
      </li>
    )
  })

  const addTask = () => {
    props.addTask(title)
    setTitle('')
  }

  const setAllFilter = () => props.changeTodoFilter('all')
  const setActiveFilter = () => props.changeTodoFilter('active')
  const setCompleted = () => props.changeTodoFilter('completed')
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask()
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={changeTitle}
          onKeyPress = {onKeyPress}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={setAllFilter}>All</button>
        <button onClick={setActiveFilter}>Active</button>
        <button onClick={setCompleted}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist
