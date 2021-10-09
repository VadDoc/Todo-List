import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {setFilterAC} from "./reducers/FilterReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    // tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    // changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    // filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let dispatch=useDispatch();
    let tasks=useSelector<rootReducerType,TaskType[]>(state => state.tasks)
    let filter=useSelector<rootReducerType,FilterValuesType>(state => state.filter)
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        dispatch(setFilterAC(value))
        // dispatchFilter(setFilterAC(value))
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
