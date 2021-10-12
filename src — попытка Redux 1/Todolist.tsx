import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType, TodolistsType} from './App';
import {Button} from "./components/Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useSelector} from "react-redux";
import {rootReducerType} from "./store/store";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type ErrorType = string | null
type PropsType = {
  // todolistID: string
  // title: string
  removeTodolist: (todolistID: string) => void
  // tasks: Array<TaskType>
  removeTask: (todolistID: string, taskId: string) => void
  // changeFilter: (todolistID: string, value: FilterValuesType) => void
  addTask: (todolistID: string, title: string) => void
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
  // filter: FilterValuesType
  changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
  changeTodoListTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {
  const todolists = useSelector<rootReducerType, Array<TodolistsType>>(state => state.todolists)
  const tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)
  const filter = useSelector<rootReducerType, FilterValuesType>(state => state.filter)

  // let tasksForTodolist = tasks;
  //
  // if (filter === "active") {
  //   tasksForTodolist = tasks.filter(t => !t.isDone);
  // }
  // if (filter === "completed") {
  //   tasksForTodolist = tasks.filter(t => t.isDone);
  // }

  const changeFilterForButton = (filter: FilterValuesType) => {
    changeFilter(todolistID, filter)
  }

  const callBackHandlerForTodolistRemove = () => {
    props.removeTodolist(todolistID)
  }

  const classNameButton = (filter: FilterValuesType) => {
    if(filter === filter) {
      return "active-filter"
    } else {
      return ""
    }
  }

  const addTask = (title: string) => {
    props.addTask(todolistID, title)
  }

  const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(todolistID, title)
  }

  return (
    <div>
      <h3>
        {/*{props.title}*/}
        <EditableSpan title={props.title} callBack={changeTodoListTitle}/>
        <Button callBack={callBackHandlerForTodolistRemove}>x</Button>
      </h3>
      <AddItemForm addItem={addTask} buttonName={"Add task"}/>
      <ul>
        {
          tasks.map(t => {
            const callBackHandlerForRemoveTask = () => {
              removeTask(todolistID, t.id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
            }

            const changeTaskTitle = (title: string) => {
              props.changeTaskTitle(todolistID, t.id, title)
            }

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox"
                     onChange={onChangeHandler}
                     checked={t.isDone}/>
              <EditableSpan title={t.title} callBack={changeTaskTitle}/>
              <Button callBack={callBackHandlerForRemoveTask}>x</Button>
            </li>
          })
        }
      </ul>
      <div>
        <Button
          className={classNameButton('all')}
          callBack={() => changeFilterForButton("all")}
        >All</Button>
        <Button
          className={classNameButton('active')}
          callBack={() => changeFilterForButton("active")}>Active</Button>
        <Button
          className={classNameButton('completed')}
          callBack={() => changeFilterForButton("completed")}
        >Completed</Button>
      </div>
    </div>
  )
}