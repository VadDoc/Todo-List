import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {SingleInput} from "./components/SingleInput";

//1. Если нужно в тупую компоненту передать 2 callBack
//2. Зачем мы в Input в callBack передаем что-то сложное + todoListID,
// она же тупая: передаем callBackInput
//3. Наличие onKeyPressHandler в Input оставляет ее тупой компонентой?

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
  let [title, setTitle] = useState<string>("")
  let [error, setError] = useState<ErrorType>(null)

  const changeFilterForButton = (filter: FilterValuesType) => {
    changeFilter(todolistID, filter)
  }

  const callBackHandlerForTodolistRemove = () => {
    removeTodolist(todolistID)
  }

  const callBackInput = () => {
    if (title.trim() !== "") {
      props.addTask(todolistID, title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const classNameButton = (filter: FilterValuesType) => {
    if(props.filter === filter) {
      return "active-filter"
    } else {
      return ""
    }
  }

  return (
    <div>
      <h3>
        {props.title}
        <Button callBack={callBackHandlerForTodolistRemove}>x</Button>
      </h3>
      <div>
        <SingleInput
          callBack={callBackInput}
          title={title}
          setTitle={setTitle}
          error={error}
          setError={setError}
        />
        <Button callBack={callBackInput}>Add Task</Button>
      </div>
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
              <span>{t.title}</span>
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
