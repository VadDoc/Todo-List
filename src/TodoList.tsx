import React from 'react';
import {FilterValueType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeTodoFilter: (filter: FilterValueType) => void
}

const Todolist = (props: TodolistPropsType) => {
    const tasksList = props.tasks.map(t => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => props.changeTodoFilter('all')}>All</button>
                <button onClick={() => props.changeTodoFilter('active')}>Active</button>
                <button onClick={() => props.changeTodoFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist
