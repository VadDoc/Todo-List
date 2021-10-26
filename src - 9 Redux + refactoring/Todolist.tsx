import React, {ChangeEvent} from 'react';
import {Button} from "./components/Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./Reducers/TasksReducer";
import {
  changeFilterAC, changeTodolistTitleAC, FilterValuesType,
  removeTodolistAC, TodolistsType
} from "./Reducers/TodoListsReducer";
import {RootReducerType} from "./Store/Store";

type PropsType = { todolist: TodolistsType }

export function Todolist({todolist}: PropsType) {
  const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[todolist.id])
  const dispatch = useDispatch()

  const removeTodolist = () => {
    dispatch(removeTodolistAC(todolist.id))
  }
  const addTask = (title: string) => {
    dispatch(addTaskAC(todolist.id, title))
  }
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC(todolist.id, title))
  }
  const changeFilter = (filter: FilterValuesType) => {
    dispatch(changeFilterAC(todolist.id, filter))
  }
  const classNameButton = (filter: FilterValuesType) => {
    if (todolist.filter === filter) {
      return "active-filter"
    } else {
      return ""
    }
  }

  let tasksForTodolist = [...tasks];

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={todolist.title} callBack={changeTodolistTitle}/>
        <Button callBack={removeTodolist}>x</Button>
      </h3>
      <AddItemForm addItem={addTask} buttonName={"Add task"}/>
      <ul>
        {
          tasksForTodolist.map(task => {
            const removeTask = () => {
              dispatch(removeTaskAC(todolist.id, task.id))
            }
            const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeStatusAC(todolist.id, task.id, e.currentTarget.checked))
            }
            const changeTaskTitle = (title: string) => {
              dispatch(changeTaskTitleAC(todolist.id, task.id, title))
            }

            return <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input type="checkbox"
                     onChange={onChangeInputHandler}
                     checked={task.isDone}/>
              <EditableSpan title={task.title} callBack={changeTaskTitle}/>
              <Button callBack={removeTask}>x</Button>
            </li>
          })
        }
      </ul>
      <div>
        <Button
          className={classNameButton('all')}
          callBack={() => changeFilter("all")}
        >All</Button>
        <Button
          className={classNameButton('active')}
          callBack={() => changeFilter("active")}>Active</Button>
        <Button
          className={classNameButton('completed')}
          callBack={() => changeFilter("completed")}
        >Completed</Button>
      </div>
    </div>
  )
}