import React, {useCallback} from 'react';
import {Button} from "./Commons/Button";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, TaskType} from "../Reducers/TasksReducer";
import {
  changeFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, TodolistsType
} from "../Reducers/TodoListsReducer";
import {RootReducerType} from "../Store/Store";
import {Task} from "./Task/Task";

type PropsType = { todolist: TodolistsType }

export const Todolist = React.memo(({todolist}: PropsType) => {
  const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[todolist.id])
  const dispatch = useDispatch()

  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistAC(todolist.id))
  }, [dispatch, todolist.id])
  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(todolist.id, title))
  }, [dispatch, todolist.id])
  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTodolistTitleAC(todolist.id, title))
  }, [dispatch, todolist.id])
  const changeFilter = useCallback((filter: FilterValuesType) => {
    dispatch(changeFilterAC(todolist.id, filter))
  }, [dispatch, todolist.id])
  const classNameBtn = useCallback((filter: FilterValuesType) => {
    if (todolist.filter === filter) {
      return "active-filter"
    } else {
      return ""
    }
  }, [todolist.filter])

  const onClickAllBtnHandler = useCallback(() => changeFilter("all"), [changeFilter])
  const onClickActiveBtnHandler = useCallback(() => changeFilter("active"), [changeFilter])
  const onClickCompletedBtnHandler = useCallback(() => changeFilter("completed"), [changeFilter])

  let tasksForTodolist = [...tasks];
  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  const MappedTasks = React.memo(() => {
    return (
      <ul>
        {tasksForTodolist.map(task =>
          <Task key={task.id} todolistId={todolist.id} task={task}/>
        )}
      </ul>
    )
  })

  return (
    <div>
      <h3>
        <EditableSpan title={todolist.title} callBack={changeTodolistTitle}/>
        <Button callBack={removeTodolist}>x</Button>
      </h3>
      <AddItemForm addItem={addTask} buttonName={"Add task"}/>
      <MappedTasks/>
      <div>
        <Button className={classNameBtn('all')} callBack={onClickAllBtnHandler}>All</Button>
        <Button className={classNameBtn('active')} callBack={onClickActiveBtnHandler}>Active</Button>
        <Button className={classNameBtn('completed')} callBack={onClickCompletedBtnHandler}>Completed</Button>
      </div>
    </div>
  )
})


