import {changeStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../Reducers/TasksReducer";
import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Commons/Button";

type PropsType = {
  todolistId: string,
  task: TaskType
}

export const Task = React.memo(({todolistId, task}: PropsType) => {
  const dispatch = useDispatch()

  const removeTask = useCallback(() => {
    dispatch(removeTaskAC(todolistId, task.id))
  }, [dispatch, todolistId, task.id])
  const changeTaskTitle = useCallback((title: string) => {
    dispatch(changeTaskTitleAC(todolistId, task.id, title))
  }, [dispatch, todolistId, task.id])
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStatusAC(todolistId, task.id, e.currentTarget.checked))
  }

  return (
    <li key={task.id} className={task.isDone ? "is-done" : ""}>
      <input type="checkbox" onChange={onChangeInputHandler} checked={task.isDone}/>
      <EditableSpan title={task.title} callBack={changeTaskTitle}/>
      <Button callBack={removeTask}>x</Button>
    </li>
  )
})