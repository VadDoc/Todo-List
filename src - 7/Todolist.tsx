import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type ErrorType = string | null
type PropsType = {
  todolistID: string
  title: string
  removeTodolist: (todolistID: string) => void
  tasks: Array<TaskType>
  removeTask: (todolistID: string, taskId: string) => void
  changeFilter: (todolistID: string, value: FilterValuesType) => void
  addTask: (todolistID: string, title: string) => void
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
  changeTodoListTitle: (todolistID: string, title: string) => void
}

export function Todolist({
                           todolistID,
                           tasks,
                           changeFilter,
                           removeTodolist,
                           removeTask,
                           changeTaskStatus,
                           ...props
                         }: PropsType) {
  const changeFilterForButton = (filter: FilterValuesType) => {
    changeFilter(todolistID, filter)
  }

  const callBackHandlerForTodolistRemove = () => {
    removeTodolist(todolistID)
  }

  const classNameButton = (filter: FilterValuesType) => {
    if(props.filter === filter) {
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

  const changeTaskTitle = (id: string, title: string) => {
    props.changeTaskTitle(todolistID, id, title)
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

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox"
                     onChange={onChangeHandler}
                     checked={t.isDone}/>
              <EditableSpan title={t.title} callBack={()=>changeTaskTitle(t.id, t.title)}/>
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

