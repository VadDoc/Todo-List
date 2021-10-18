import React, {ChangeEvent} from 'react';
import {Button} from "./components/Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {FilterValuesType} from "./Reducers/FilterReducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./Reducers/TasksReducer";
import {useDispatch} from "react-redux";
import {changeFilterAC, changeTodoListTitleAC, removeTodolistAC, TodolistsType} from "./Reducers/TodoListsReducer";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type ErrorType = string | null
type PropsType = {
  todolist: TodolistsType
  tasks: Array<TaskType>
}

export function Todolist({todolist, tasks}: PropsType) {
  const dispatch = useDispatch()

  const changeFilterForButton = (filter: FilterValuesType) => {
    dispatch(changeFilterAC(todolist.id, filter))
  }
  const callBackHandlerForTodolistRemove = () => {
    dispatch(removeTodolistAC(todolist.id))
  }
  const addTask = (title: string) => {
    dispatch(addTaskAC(todolist.id, title))
  }
  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodoListTitleAC(todolist.id, title))
  }
  const classNameButton = (filter: FilterValuesType) => {
    if (todolist.filter === filter) {
      return "active-filter"
    } else {
      return ""
    }
  }

  return (
    <div>
      <h3>
        <EditableSpan title={todolist.title} callBack={changeTodoListTitle}/>
        <Button callBack={callBackHandlerForTodolistRemove}>x</Button>
      </h3>
      <AddItemForm addItem={addTask} buttonName={"Add task"}/>
      <ul>
        {
          tasks.map(task => {
            const callBackHandlerForRemoveTask = () => {
              dispatch(removeTaskAC(todolist.id, task.id))
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeStatusAC(todolist.id, task.id, e.currentTarget.checked))
            }
            const changeTaskTitle = (title: string) => {
              dispatch(changeTaskTitleAC(todolist.id, task.id, title))
            }

            return <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
              <EditableSpan title={task.title} callBack={changeTaskTitle}/>
              <Button callBack={callBackHandlerForRemoveTask}>x</Button>
            </li>
          })
        }
      </ul>
      <div>
        <Button
          className={classNameButton('all')}
          callBack={() => changeFilterForButton("all")}>All</Button>
        <Button
          className={classNameButton('active')}
          callBack={() => changeFilterForButton("active")}>Active</Button>
        <Button
          className={classNameButton('completed')}
          callBack={() => changeFilterForButton("completed")}>Completed</Button>
      </div>
    </div>
  )
}