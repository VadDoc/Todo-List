import React, {useState} from 'react';
import {FilterType, TaskType} from "./App";

type PropsType = {
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (taskId: string)  => void
  setFilter: (filter: FilterType) => void
  changeStatus: (taskId: string, isDone:boolean) => void
}

export const Todolist = ({tasks, ...props}: PropsType) => {
  const [title, setTitle] = useState('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addTask = (title: string) => {
    props.addTask(title)
    setTitle('')
  }

  const removeTask = (taskId: string) => {
    props.removeTask(taskId)
  }

  const onChangeCheckbox = () => {

  }

  return (
    <div>
      <h3>What to learn</h3>
      <div>
        <input
          value={title}
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
        />
        <button onClick={()=>addTask(title)}>+</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} onChange={onChangeCheckbox}/>
            <span>{task.title}</span>
            <button onClick={()=>removeTask(task.id)}>x</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={()=>props.setFilter('all')}>All</button>
        <button onClick={()=>props.setFilter('active')}>Active</button>
        <button onClick={()=>props.setFilter('complete')}>Completed</button>
      </div>
    </div>
  )
}