import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  removeTask: (taskID: string) => void
  changeTodoFilter: (filter: FilterValueType) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
  addTask: (title: string) => void
}

const Todolist = (props: TodolistPropsType) => {
  const[title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const tasksList = props.tasks.map(t => {
    const changeStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, event.currentTarget.checked)
    return (
      <li>
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={changeStatus}
        />
        <span className={!t.isDone ? 'notCompleted' : ''}>{t.title}</span>
        <button onClick={() => props.removeTask(t.id)}>x</button>
      </li>
    )
  })

  const addTask = () => {
    const trimmedTitle = title.trim()
      if(trimmedTitle) {
        props.addTask(title)
      } else {
        setError(true)
      }
    setTitle('')
  }

  const setAllFilter = () => props.changeTodoFilter('all')
  const setActiveFilter = () => props.changeTodoFilter('active')
  const setCompleted = () => props.changeTodoFilter('completed')
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if(error) {
      setError(false)
    }
    setTitle(e.currentTarget.value)
  }
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
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div style={{color: 'red'}}>Title is required</div>}
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={setAllFilter}>All</button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={setActiveFilter}
        >Active</button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={setCompleted}
        >Completed</button>
      </div>
    </div>
  )
}

export default Todolist
