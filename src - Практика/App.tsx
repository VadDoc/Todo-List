import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'complete'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const changeStatus = (taskId: string, isDone:boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: isDone} : task))
    }


    let tasksAfterFilter = tasks

    if (filter === 'active') {
        tasksAfterFilter = tasksAfterFilter.filter(task => !task.isDone)
    }

    if (filter === 'complete') {
        tasksAfterFilter = tasksAfterFilter.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist
              tasks={tasksAfterFilter}
              addTask={addTask}
              removeTask={removeTask}
              setFilter={setFilter}
              changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
