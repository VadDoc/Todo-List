import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType, TodolistType} from "./App";
import {AddItem} from "./Components/AddItem";
import {EditableSpan} from "./Components/EditableSpan";

type PropsType = {
  tasks: Array<TaskType>
  addTask: (todolistId: string, title: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  todolist: TodolistType
  changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeFilter: (todolistId: string, filter: FilterType) => void
}
export type ErrorType = string | null

export const Todolist = ({tasks, todolist, ...props}: PropsType) => {

const removeTodolist = () => {
  props.removeTodolist(todolist.id)
}

  const addTask = (title: string) => {
    props.addTask(todolist.id, title)
  }

  const changeFilter = (filter: FilterType) => {
    props.changeFilter(todolist.id, filter)
  }

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(todolist.id, title)
  }

  const onAllClickHandler = () => changeFilter('all')
  const onActiveClickHandler = () => changeFilter('active')
  const onCompletedClickHandler = () => changeFilter('completed')






  return (
    <div>
      <button onClick={removeTodolist}>x</button>
      {/*<h3>{todolist.title}</h3>*/}
      <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
      <AddItem addItem={addTask} />
      <ul>
        {tasks.map(task => {
            const removeTask = () => {
              props.removeTask(todolist.id, task.id)
            }
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(todolist.id, task.id, e.currentTarget.checked)
            }

            return (
              <li style={task.isDone ? {opacity: '.5'} : {opacity: '1'}} key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={changeStatus}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
              </li>
            )
          }
        )}
      </ul>
      <div>
        <button style={todolist.filter === 'all' ? {color: 'red'} : {}} onClick={onAllClickHandler}>All</button>
        <button style={todolist.filter === 'active' ? {color: 'red'} : {}}onClick={onActiveClickHandler}>Active</button>
        <button style={todolist.filter === 'completed' ? {color: 'red'} : {}} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}